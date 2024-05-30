'use client'
import { useState, useEffect, useMemo } from 'react'
import { Button } from '../Button'
import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { type BoardRecord } from '@/types/BoardRecord'
import { generateBoardGrid } from '@/modules/generateBoard'
import { formatPosition } from '@/modules/formatPosition'
import { Input } from '../Input'
import { Checkbox } from '../Checkbox'
import { mockBoardRecords } from './mockBoardRecords'
import { type WinningLine } from '@/types/WinningLine'
import { produce } from 'immer'
import { getAvailablePositions, getNextAvailablePiece, judgeResult } from '@/modules/boardGrid'
import { type Position } from '@/types/Position'
import { ResultOverlay } from '../ResultOverlay'
import { type BoardResult } from '@/types/BoardResult'
import { type Piece } from '@/types/Piece'
import { Headline } from './Headline'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { random } from 'node-emoji'

export function GomokuBoardSection () {
  const [boardRecords, setBoardRecords] = useState<BoardRecord[]>(mockBoardRecords)
  const [width, setWidth] = useState(500)
  const [highlight, setHighlight] = useState<{ x: number, y: number }>()
  const [isDisabled, setIsDisabled] = useState(false)
  const [isShowLabels, setIsShowLabel] = useState(true)
  const [hovered, setHovered] = useState<object>({})
  const [result, setResult] = useState<BoardResult | null>(null)
  const [myPiece, setMyPiece] = useState<Piece>('black')
  const boardGrid = useMemo(() => generateBoardGrid(boardRecords), [boardRecords])

  useEffect(() => {
    const result = judgeResult(boardGrid)

    if (result?.type === 'draw') return
    setResult(result)
  }, [boardGrid, boardRecords])

  const nextAvailablePiece = getNextAvailablePiece(boardGrid)

  function handlePlace ({ x, y }: Position) {
    if (!nextAvailablePiece) return

    setBoardRecords([
      ...boardRecords,
      { piece: nextAvailablePiece, x, y },
    ])
    setHighlight({ x, y })
  }

  function placeRandomly () {
    const availablePositions = getAvailablePositions(boardGrid)
    const position = availablePositions[Math.floor(Math.random() * availablePositions.length)]
    if (!position) return
    handlePlace(position)
  }

  function clear () {
    setBoardRecords([])
    setHighlight(undefined)
  }

  const [emojiMap, setEmojiMap] = useState({ black: '🎃️', white: '🌏️' })

  return (<>
    <Headline>Gomoku Board</Headline>
    <div className="flex flex-wrap gap-6">
      <div className="relative" style={{ width: `${width}px` }}>
        <GomokuBoard
          boardGrid={generateBoardGrid(boardRecords)}
          disabled={isDisabled}
          emojiMap={emojiMap}
          highlight={highlight}
          showLabels={isShowLabels}
          winningLine={result?.type === 'win' ? result : null}
          onHover={(position) => { setHovered(formatPosition(position)) }}
          onPlace={handlePlace}
        />
        <ResultOverlay
          piece={myPiece}
          result={result}
          onClickNewRound={clear}
        />
      </div>

      <div className="flex w-72 flex-1 flex-col gap-2">
        <div>
          Hovered:
          <code>{JSON.stringify(hovered)}</code>
        </div>
        <div>
          nextAvailablePiece:
          <code>{JSON.stringify(nextAvailablePiece)}</code>
        </div>
        <Input
          label="Width"
          type="number"
          value={width}
          onChange={event => { setWidth(+event.target.value) }}
        />
        <Checkbox
          checked={isShowLabels}
          onChange={event => { setIsShowLabel(event.target.checked) }}
        >
          isShowLabels
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={event => { setIsDisabled(event.target.checked) }}
        >
          isDisabled
        </Checkbox>

        <Button onClick={placeRandomly}>Place Randomly</Button>

        <Button onClick={clear}>Clear</Button>

        <h3 className="text-xl font-bold">Result Overlay & Winning Line</h3>
        <label>
          Direction
          <select
            value={result?.type === 'win' ? result?.direction : ''}
            onChange={event => {
              const direction = event.target.value as WinningLine['direction']
              if (!direction) {
                setResult(null)
                return
              }

              setResult(produce(result, (result) => {
                result ??= {
                  type: 'win',
                  piece: 'black',
                  direction,
                  position: { x: 9, y: 7 },
                }
                if (result.type === 'win') {
                  result.direction = direction
                }
                return result
              }))
            }}
          >
            <option value="">-</option>
            {['vertical', 'horizontal', 'majorDiagonal', 'minorDiagonal']
              .map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
          </select>
        </label>
        <label>
          My Piece
          <select
            value={myPiece}
            onChange={event => {
              const piece = event.target.value as Piece
              setMyPiece(piece)
            }}
          >
            {['black', 'white'].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        {result?.type === 'win' && <div className="grid grid-cols-2 gap-4">
          <Input
            label="X"
            type="number"
            value={result?.position.x ?? 3}
            onChange={event => {
              if (!result) return
              const value = +event.target.value
              setResult(produce(result, (winningLine) => {
                winningLine.position.x = value
              }))
            }}
          />
          <Input
            label="Y"
            type="number"
            value={result?.position.y ?? 3}
            onChange={event => {
              if (!result) return
              const value = +event.target.value
              setResult(produce(result, (winningLine) => {
                winningLine.position.y = value
              }))
            }}
          />
        </div>}

        <h3 className="text-xl font-bold">Piece Emoji</h3>
        <div className="grid grid-cols-2 gap-4">
          {(['black', 'white'] as const).map(piece => (
            <div key={piece} className="flex items-end gap-2">
              <Input
                label={piece}
                value={emojiMap[piece] ?? ''}
                onChange={event => {
                  const value = event.target.value
                  setEmojiMap({ ...emojiMap, [piece]: value || null })
                }}
              />
              <Button
                icon={<FontAwesomeIcon icon={faShuffle} />}
                onClick={() => {
                  const { emoji } = random()
                  setEmojiMap({ ...emojiMap, [piece]: emoji })
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </>)
}

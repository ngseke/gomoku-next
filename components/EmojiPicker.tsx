'use client'

import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import dataByGroup from 'unicode-emoji-json/data-by-group.json'
import { Input } from './Input'
import { random, search } from 'node-emoji'
import { useState } from 'react'
import { Button } from './Button'
import { faMagnifyingGlass, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function List ({ emojis, value, onChange }: {
  emojis: Array<{ name: string, emoji: string }>
  value?: Nullish<string>
  onChange?: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(2rem,1fr))]">
      {emojis
        .map((emoji) => (
          <button
            key={emoji.name}
            className={cn('inline-flex aspect-square items-center justify-center overflow-hidden rounded-[25%] text-3xl', {
              'bg-neutral-300/90 dark:bg-neutral-700/90': value === emoji.emoji,
            })}
            type="button"
            onClick={() => {
              onChange?.(emoji.emoji)
            }}
          >{emoji.emoji}</button>
        ))}
    </div>
  )
}

export function EmojiPicker ({ value, onChange }: {
  value?: Nullish<string>
  onChange?: (value: string) => void
}) {
  const [keyword, setKeyword] = useState('')

  const shouldShowResult = Boolean(keyword.trim())
  const filteredEmojis = keyword ? search(keyword.trim().toLowerCase()) : []

  function setEmojiRandomly () {
    const { emoji } = random()
    onChange?.(emoji)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_auto] items-end gap-2">
        <Input
          label="Emoji"
          leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          placeholder="Search..."
          value={keyword}
          onChange={(event) => { setKeyword(event.target.value) }}
        />
        <Button
          icon={<FontAwesomeIcon icon={faShuffle} />}
          onClick={setEmojiRandomly}
        />
      </div>

      <div className="h-48 max-h-48 overflow-auto scrollbar">
        {shouldShowResult
          ? <List
              emojis={filteredEmojis}
              value={value}
              onChange={onChange}
            />
          : dataByGroup.map((group) => (
            <section key={group.name} className="mb-4">
              <h2 className="mb-1 text-sm font-bold text-neutral-600 dark:text-neutral-400">{group.name}</h2>
              <List
                emojis={group.emojis}
                value={value}
                onChange={onChange}
              />
            </section>
          ))}
      </div>
    </div>
  )
}

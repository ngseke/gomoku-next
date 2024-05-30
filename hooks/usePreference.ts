import { useLocalStorage } from 'usehooks-ts'

const isShowLabelsKey = 'gomoku-next:isShowLabels'
const isShowEmojiPieceKey = 'gomoku-next:isShowEmojiPiece'

export function usePreference () {
  const [isShowLabels, setIsShowLabels] =
    useLocalStorage(isShowLabelsKey, true)
  const [isShowEmojiPiece, setIsShowEmojiPiece] =
    useLocalStorage(isShowEmojiPieceKey, true)

  function toggleIsShowLabels () {
    setIsShowLabels(!isShowLabels)
  }

  function toggleIsShowEmojiPiece () {
    setIsShowEmojiPiece(!isShowEmojiPiece)
  }

  return {
    isShowLabels,
    isShowEmojiPiece,
    toggleIsShowLabels,
    toggleIsShowEmojiPiece,
  }
}

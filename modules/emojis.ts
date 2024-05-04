import dataByGroup from 'unicode-emoji-json/data-by-group.json'
import emojiNameToChineseNameMap from './emojiNameToChineseNameMap.json'

const animalsNatureEmojis =
  dataByGroup.find(({ slug }) => slug === 'animals_nature')?.emojis ?? []

const foodDrinkEmojis =
  dataByGroup.find(({ slug }) => slug === 'food_drink')?.emojis ?? []

type Key = keyof typeof emojiNameToChineseNameMap

export const emojis = [
  ...animalsNatureEmojis,
  ...foodDrinkEmojis,
].map((emoji) => ({
  ...emoji,
  nameZhHant: emojiNameToChineseNameMap[emoji.name as Key] ?? emoji.name,
}))

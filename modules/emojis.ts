import dataByGroup from 'unicode-emoji-json/data-by-group.json'
import emojiNameToZhHantNameMap from './emojiNameToZhHantNameMap.json'
import emojiNameToJaNameMap from './emojiNameToJaNameMap.json'

const animalsNatureEmojis =
  dataByGroup.find(({ slug }) => slug === 'animals_nature')?.emojis ?? []

const foodDrinkEmojis =
  dataByGroup.find(({ slug }) => slug === 'food_drink')?.emojis ?? []

type Key = keyof typeof emojiNameToZhHantNameMap

export const emojis = [
  ...animalsNatureEmojis,
  ...foodDrinkEmojis,
].map((emoji) => ({
  ...emoji,
  nameZhHant: emojiNameToZhHantNameMap[emoji.name as Key] ?? emoji.name,
  nameJa: emojiNameToJaNameMap[emoji.name as Key] ?? emoji.name,
}))

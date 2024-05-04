import dataByGroup from 'unicode-emoji-json/data-by-group.json'

function capitalizeAllWords (string: string) {
  return string.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function getRandomItem<Value> (array: Value[]) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

const animalsNatureEmojis =
  dataByGroup.find(({ slug }) => slug === 'animals_nature')?.emojis ?? []

const foodDrinkEmojis =
  dataByGroup.find(({ slug }) => slug === 'food_drink')?.emojis ?? []

const emojis = [...animalsNatureEmojis, ...foodDrinkEmojis]

export function generateRandomPlayer () {
  const prefix = 'Anonymous'
  const randomEmoji = getRandomItem(emojis)

  const name = `${prefix} ${capitalizeAllWords(randomEmoji.name)}`
  const emoji = randomEmoji.emoji

  return { name, emoji }
}

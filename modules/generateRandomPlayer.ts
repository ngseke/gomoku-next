import { emojis } from './emojis'
import { getTranslations } from 'next-intl/server'
import { type Locale } from '@/types/Locale'

function capitalizeAllWords (string: string) {
  return string.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function getRandomItem<Value> (array: Value[]) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

export async function generateRandomPlayer (locale?: Locale) {
  const t = await getTranslations({ locale })

  const randomEmoji = getRandomItem(emojis)
  const localizedName = ({
    'zh-Hant': randomEmoji.nameZhHant,
    ja: randomEmoji.nameJa,
  } as Record<string, string>)[String(locale)] ?? capitalizeAllWords(randomEmoji.name)

  const name = t('player.anonymousName', { name: localizedName })
  const emoji = randomEmoji.emoji

  return { name, emoji }
}

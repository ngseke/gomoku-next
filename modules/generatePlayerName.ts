import { uniqueNamesGenerator, colors, names } from 'unique-names-generator'

export function generatePlayerName () {
  const name = uniqueNamesGenerator({
    dictionaries: [colors, names],
    separator: ' ',
    style: 'capital',
  })

  return name
}

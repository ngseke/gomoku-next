import { uniqueNamesGenerator, animals } from 'unique-names-generator'

export function generatePlayerName () {
  const name = uniqueNamesGenerator({
    dictionaries: [animals],
    separator: ' ',
    style: 'capital',
  })

  return name
}

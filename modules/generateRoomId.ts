import { customAlphabet } from 'nanoid'
import { alphanumeric } from 'nanoid-dictionary'

const generate = customAlphabet(alphanumeric, 6)

export function generateRoomId () {
  const id = generate()
  return id
}

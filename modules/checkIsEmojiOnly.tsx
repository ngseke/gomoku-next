export function checkIsEmojiOnly (message: string) {
  const pattern = /^[\p{Extended_Pictographic}\uFE0F]+$/u
  return pattern.test(message)
}

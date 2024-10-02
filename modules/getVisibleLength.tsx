export function getVisibleLength (str: string) {
  return [...new Intl.Segmenter().segment(str)].length
}

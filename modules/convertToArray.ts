export function convertToArray<Type> (object: Type) {
  if (!object) return null

  return Object.values(object)
}

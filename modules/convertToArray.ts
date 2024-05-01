export function convertToArray<
  Type extends object
> (object: Record<string, Type>) {
  if (!object) return null

  return Object.entries(object)
    .map<Type & { id: string }>(([id, value]) => ({ id, ...value }))
}

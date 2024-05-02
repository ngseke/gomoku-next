export function unique<Value> (array: Value[]) {
  return [...new Set(array)]
}

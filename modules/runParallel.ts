export async function runParallel<T extends unknown[]> (
  ...asyncFns: { [K in keyof T]: () => Promise<T[K]> }
): Promise<T> {
  const promises = asyncFns.map(async fn => await fn())
  return await (Promise.all(promises) as Promise<T>)
}

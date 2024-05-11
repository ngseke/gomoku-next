import { useState, useEffect } from 'react'

export function useCachedState<Value> (value: Value) {
  const [cachedValue, setCachedValue] = useState(value)

  useEffect(() => {
    if (!value) return

    setCachedValue(value)
  }, [value])

  return cachedValue
}

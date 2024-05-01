import { useRef, useEffect } from 'react'

export function usePrevious<Value> (value: Value) {
  const ref = useRef<Value>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

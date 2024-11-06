import { useCallback, useRef, useState } from 'react'

const useRefState = <T>(initialValue?: T): [T, (value: ((v: T) => T) | T) => void, () => T] => {
  const [, setState] = useState<T | undefined>(initialValue)
  const ref = useRef<T | undefined>(initialValue)

  const updateState = useCallback((value: T | ((v: T) => T)): void => {
    if (typeof value === 'function') {
      ref.current = (value as any)(ref.current)
    } else {
      ref.current = value
    }
    setState(ref.current)
  }, [])
  const getRefValue = useCallback(() => ref.current as T, [])

  return [ref.current as T, updateState, getRefValue]
}

export default useRefState

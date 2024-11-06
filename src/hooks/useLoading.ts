/*
 * @Description: 方法前后执行loading
 */

import { useState } from 'react'

function useLoading<T extends Function>(fn: T): [boolean, T] {
  const [loading, setLoading] = useState(false)

  if (typeof fn !== 'function') {
    throw new Error('需要传入一个函数')
  }

  const call = async function call(...args) {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      await fn(...args)
    } finally {
      setLoading(false)
    }
  }

  return [loading, call as unknown as T]
}

export default useLoading

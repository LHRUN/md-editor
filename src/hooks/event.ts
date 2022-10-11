import { useEffect } from 'react'

/**
 * 监听window resize hook
 * @param cb resize回调
 */
export const useResizeEvent = (cb: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', cb)
    return () => {
      window.removeEventListener('resize', cb)
    }
  }, [])
}

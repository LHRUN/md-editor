import { useEffect } from 'react'

/**
 * Listening to window resizing
 * @param cb resize callback
 */
export const useResizeEvent = (cb: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', cb)
    return () => {
      window.removeEventListener('resize', cb)
    }
  }, [])
}

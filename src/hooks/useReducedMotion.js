import { useEffect, useState } from 'react'

/**
 * Subscribes to the user's `prefers-reduced-motion: reduce` setting and
 * returns true when motion should be reduced. Updates live if the OS
 * setting changes while the app is open.
 *
 * SSR-safe: defaults to `false` (motion allowed) on the server.
 */
function useReducedMotion() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(mq.matches)
    update()
    // Modern + legacy API support.
    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }
    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  return reduce
}

export default useReducedMotion

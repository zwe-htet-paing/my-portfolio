import { useEffect } from 'react'

/**
 * Stitches-style scroll-reveal. Add the class `reveal` to any element you
 * want to fade up when it enters the viewport; this hook wires up the
 * IntersectionObserver and toggles a `is-visible` class on each.
 *
 * Initial state: `opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out`
 * On intersect:  `opacity: 1; transform: translateY(0)`
 */
function useScrollReveal(selector = '.reveal', threshold = 0.1) {
  useEffect(() => {
    const targets = document.querySelectorAll(selector)
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector, threshold])
}

export default useScrollReveal

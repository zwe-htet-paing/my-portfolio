import { useState } from 'react'

/**
 * Heuristic for "this device probably can't smoothly run a 60fps canvas
 * animation". Returns true when ANY of:
 *   - `navigator.hardwareConcurrency` is < 4
 *   - `navigator.deviceMemory` is < 4
 *   - `prefers-reduced-data: reduce` is set
 *
 * SSR-safe: defaults to `false` (treat as capable) on the server, then
 * re-evaluates on first client render via the lazy initializer.
 *
 * The signal is intentionally non-blocking: this is a hint used to
 * reduce particle counts and skip the cursor glow, not a hard guard.
 */
function detectLowPower() {
  if (typeof window === 'undefined') return false
  const cores = navigator.hardwareConcurrency || 8
  const mem = navigator.deviceMemory || 8
  const reducedData =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-data: reduce)').matches
  return cores < 4 || mem < 4 || reducedData
}

function useLowPowerDevice() {
  // Lazy initializer runs once, on first client render. No effect / no
  // setState in render path, no cascading renders.
  const [low] = useState(detectLowPower)
  return low
}

export default useLowPowerDevice

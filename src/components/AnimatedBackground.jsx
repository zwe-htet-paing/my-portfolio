import { useEffect } from 'react'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useLowPowerDevice from '../hooks/useLowPowerDevice.js'

/**
 * AnimatedBackground — a fixed, full-viewport canvas mounted directly on
 * <body> (out of the React render tree) that paints a subtle AI-themed
 * constellation / network behind every page.
 *
 *   Dark mode : ~50 softly glowing nodes drift slowly, faint line segments
 *               connect any pair within 150px, a soft indigo glow follows
 *               the cursor, and 24 small particles drift upward. A motion
 *               trail at rgba(10,10,10,0.15) gives a comet-like persistence.
 *
 *   Light mode: a fine 64px grid is drawn first (indigo at ~6% alpha), then
 *               a sparser node/line graph on top, and 18 dark micro-particles
 *               drift. No cursor glow, no motion trail — crisp each frame.
 *
 *   Both     : the active palette is lerped (≈200ms) toward the target
 *               theme on every frame, so toggling light/dark crossfades
 *               smoothly. Respects prefers-reduced-motion (single static
 *               frame) and prefers-reduced-data / low-core devices
 *               (halved counts, no particles, no cursor glow).
 *
 * The component returns null — the canvas is created with `document.createElement`
 * and appended imperatively to <body>. This keeps it out of the React
 * stacking context and out of any route subtree so it never re-mounts.
 */
function AnimatedBackground() {
  const prefersReduce = useReducedMotion()
  const lowPower = useLowPowerDevice()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    // ---- Canvas setup ------------------------------------------------
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;z-index:0;' +
      'pointer-events:none;'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) {
      // Browser refused 2D context — bail, no background.
      return () => {
        canvas.remove()
      }
    }

    // ---- State --------------------------------------------------------
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let cssWidth = 0
    let cssHeight = 0

    function resize() {
      cssWidth = window.innerWidth
      cssHeight = window.innerHeight
      canvas.width = Math.floor(cssWidth * dpr)
      canvas.height = Math.floor(cssHeight * dpr)
      canvas.style.width = cssWidth + 'px'
      canvas.style.height = cssHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Debounced resize via rAF (cheap, no timers).
    let resizePending = false
    const onResize = () => {
      if (resizePending) return
      resizePending = true
      requestAnimationFrame(() => {
        resize()
        resizePending = false
      })
    }
    window.addEventListener('resize', onResize, { passive: true })

    // ---- Configuration -----------------------------------------------
    const baseNodeCount = lowPower ? 25 : 50
    const baseParticles = lowPower ? 0 : 24
    const baseLightParticles = lowPower ? 0 : 18
    const lineDistance = 150
    const lineDistanceSq = lineDistance * lineDistance
    const nodeRadius = 1.6

    // ---- Nodes --------------------------------------------------------
    function makeNodes(n) {
      const arr = []
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.08 + Math.random() * 0.18
        arr.push({
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: nodeRadius + Math.random() * 1.0,
          phase: Math.random() * Math.PI * 2,
        })
      }
      return arr
    }
    let nodes = makeNodes(baseNodeCount)

    // ---- Particles ----------------------------------------------------
    function makeParticles(n) {
      const arr = []
      for (let i = 0; i < n; i++) {
        arr.push({
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight,
          vy: 0.05 + Math.random() * 0.15,
          r: 0.6 + Math.random() * 1.0,
          phase: Math.random() * Math.PI * 2,
        })
      }
      return arr
    }
    let particles = makeParticles(baseParticles)
    let lightParticles = makeParticles(baseLightParticles)

    // ---- Cursor -------------------------------------------------------
    const cursor = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }
    const onMouseMove = (e) => {
      cursor.tx = e.clientX
      cursor.ty = e.clientY
      cursor.active = true
    }
    const onMouseLeave = () => {
      cursor.active = false
      cursor.tx = -9999
      cursor.ty = -9999
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })
    window.addEventListener('blur', onMouseLeave, { passive: true })

    // ---- Theme palettes ----------------------------------------------
    // Each channel is stored as an array of 4 RGBA numbers so the rAF loop
    // can lerp the current palette toward the target palette smoothly.
    const DARK = {
      node:      [192, 193, 255, 0.85],
      nodeGlow:  [192, 193, 255, 0.25],
      line:      [192, 193, 255, 0.18],
      particle:  [255, 255, 255, 0.30],
      cursor:    [192, 193, 255, 0.10],
      grid:      [99, 102, 241, 0.0],
      trail:     [10, 10, 10, 0.15],
    }
    const LIGHT = {
      node:      [99, 102, 241, 0.55],
      nodeGlow:  [99, 102, 241, 0.0],
      line:      [99, 102, 241, 0.35],
      particle:  [15, 15, 15, 0.25],
      cursor:    [99, 102, 241, 0.08],
      grid:      [99, 102, 241, 0.06],
      trail:     [255, 255, 255, 0.0],
    }
    // Current palette starts in dark (matches the boot default).
    let current = clonePalette(DARK)
    let target = current

    function clonePalette(p) {
      const out = {}
      for (const k in p) out[k] = p[k].slice()
      return out
    }
    function lerpPalette(cur, tgt, t) {
      for (const k in tgt) {
        const a = cur[k]
        const b = tgt[k]
        a[0] += (b[0] - a[0]) * t
        a[1] += (b[1] - a[1]) * t
        a[2] += (b[2] - a[2]) * t
        a[3] += (b[3] - a[3]) * t
      }
    }
    function rgba(c) {
      return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${c[3].toFixed(3)})`
    }

    // ---- Theme detection (called once per frame — cheap) --------------
    function readTargetTheme() {
      const isLight = document.documentElement.classList.contains('light')
      target = isLight ? LIGHT : DARK
    }
    readTargetTheme()

    // ---- Static-frame draw (used in reduced-motion / static mode) -----
    function drawStaticFrame() {
      ctx.clearRect(0, 0, cssWidth, cssHeight)
      // Grid (light only)
      if (target === LIGHT) drawGrid(0)
      // Nodes
      for (let i = 0; i < nodes.length; i++) drawNode(nodes[i])
    }

    // ---- Drawing helpers ---------------------------------------------
    function drawGrid(opacityScale) {
      const step = 64
      const a = current.grid[3] * opacityScale
      if (a < 0.005) return
      ctx.strokeStyle = `rgba(${current.grid[0] | 0},${current.grid[1] | 0},${current.grid[2] | 0},${a.toFixed(3)})`
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x < cssWidth; x += step) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, cssHeight)
      }
      for (let y = 0; y < cssHeight; y += step) {
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(cssWidth, y + 0.5)
      }
      ctx.stroke()
    }

    function drawNode(n) {
      // Outer glow (radial gradient)
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6)
      g.addColorStop(0, rgba(current.nodeGlow))
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2)
      ctx.fill()
      // Core
      ctx.fillStyle = rgba(current.node)
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawLines() {
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > lineDistanceSq) continue
          const dist = Math.sqrt(d2)
          // Opacity falls off with distance: 1.0 at touching → 0 at lineDistance.
          const t = 1 - dist / lineDistance
          const alpha = current.line[3] * t * t // square for softer falloff
          if (alpha < 0.005) continue
          ctx.strokeStyle = `rgba(${current.line[0] | 0},${current.line[1] | 0},${current.line[2] | 0},${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    function drawCursorGlow() {
      if (!cursor.active || current.cursor[3] < 0.01) return
      const radius = 180
      const g = ctx.createRadialGradient(
        cursor.x, cursor.y, 0,
        cursor.x, cursor.y, radius,
      )
      g.addColorStop(0, rgba(current.cursor))
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cursor.x, cursor.y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawParticles(list) {
      for (let i = 0; i < list.length; i++) {
        const p = list[i]
        // Sine bob for a soft vertical motion
        const y = p.y + Math.sin(p.phase) * 8
        ctx.fillStyle = rgba(current.particle)
        ctx.beginPath()
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // ---- Update helpers ----------------------------------------------
    function updateNodes() {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        // Wrap edges
        if (n.x < -10) n.x = cssWidth + 10
        else if (n.x > cssWidth + 10) n.x = -10
        if (n.y < -10) n.y = cssHeight + 10
        else if (n.y > cssHeight + 10) n.y = -10
        // Subtle breathing on the radius
        n.phase += 0.005
      }
    }

    function updateParticles(list) {
      for (let i = 0; i < list.length; i++) {
        const p = list[i]
        p.y -= p.vy
        if (p.y < -10) {
          p.y = cssHeight + 10
          p.x = Math.random() * cssWidth
        }
        p.phase += 0.02
      }
    }

    function updateCursor() {
      // Lerp toward target so the glow trails the cursor softly.
      cursor.x += (cursor.tx - cursor.x) * 0.08
      cursor.y += (cursor.ty - cursor.y) * 0.08
    }

    // ---- Reduced motion: one static draw, no loop --------------------
    let rafId = 0
    if (prefersReduce) {
      drawStaticFrame()
    } else {
      // Paint an initial frame immediately so the user sees something
      // even if the first rAF is delayed (e.g., throttled background tab).
      readTargetTheme()
      ctx.clearRect(0, 0, cssWidth, cssHeight)
      if (target === LIGHT) drawGrid(1)
      updateNodes()
      drawLines()
      for (let i = 0; i < nodes.length; i++) drawNode(nodes[i])
      const tick = () => {
        rafId = requestAnimationFrame(tick)
        readTargetTheme()
        // 200ms crossfade: t = 1 - exp(-dt/200ms); capped by frame delta.
        const dt = 16 // ~60fps target; clamp-aware
        const t = 1 - Math.exp(-dt / 200)
        lerpPalette(current, target, t)

        // Clear — dark uses a slight alpha for trails, light uses full clear.
        if (current.trail[3] > 0.01) {
          ctx.fillStyle = rgba(current.trail)
          ctx.fillRect(0, 0, cssWidth, cssHeight)
        } else {
          ctx.clearRect(0, 0, cssWidth, cssHeight)
        }

        if (target === LIGHT) drawGrid(1)

        updateNodes()
        drawLines()
        for (let i = 0; i < nodes.length; i++) drawNode(nodes[i])

        if (!lowPower) {
          updateCursor()
          drawCursorGlow()
          updateParticles(particles)
          updateParticles(lightParticles)
          drawParticles(particles)
          drawParticles(lightParticles)
        } else {
          updateCursor()
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    // ---- Cleanup ------------------------------------------------------
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('blur', onMouseLeave)
      // Resize the canvas to 0 to release the GPU buffer promptly.
      canvas.width = 0
      canvas.height = 0
      canvas.remove()
    }
  }, [prefersReduce, lowPower])

  return null
}

export default AnimatedBackground

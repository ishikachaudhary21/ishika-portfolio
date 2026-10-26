import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/*
 * FrameScroll — cinematic scroll-scrubbed frame sequence (the "3D anime reel" look).
 * Apple-style technique: a pre-rendered animation (laptop opening) is sliced into
 * JPG frames (public/laptop-frames/frame-001.jpg … frame-240.jpg) and scrubbed on
 * a sticky canvas as the user scrolls, with spring smoothing + subtle 3D tilt.
 * If frame-001.jpg is missing the section renders nothing (safe to ship frameless).
 */
const FrameScroll = ({ frameCount = 240 }) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const images = useRef([])
  const [status, setStatus] = useState('loading') // loading | ready | missing
  const [progressPct, setProgressPct] = useState(0)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const frameIndex = useTransform(smooth, [0, 0.92], [0, frameCount - 1])

  // Subtle anti-gravity 3D drift while scrubbing
  const y = useTransform(smooth, [0, 1], ['0%', '-8%'])
  const rotateX = useTransform(smooth, [0, 0.5, 1], [0, 10, 0])
  const rotateY = useTransform(smooth, [0, 0.3, 0.7, 1], [0, -7, 7, 0])
  const scale = useTransform(smooth, [0, 0.85, 1], [1, 1.04, 1.15])
  const exitOpacity = useTransform(smooth, [0.88, 0.98], [1, 0])
  const exitBlur = useTransform(smooth, [0.88, 0.98], ['blur(0px)', 'blur(18px)'])

  // Overlay text phases
  const phase1 = useTransform(smooth, [0.04, 0.12, 0.3, 0.38], [0, 1, 1, 0])
  const phase2 = useTransform(smooth, [0.42, 0.5, 0.68, 0.76], [0, 1, 1, 0])
  const phase3 = useTransform(smooth, [0.8, 0.86, 0.92, 0.97], [0, 1, 1, 0])

  // Preload the sequence; hide the section entirely if frames aren't there
  useEffect(() => {
    let cancelled = false
    const probe = new Image()
    probe.src = '/laptop-frames/frame-001.jpg'
    probe.onerror = () => !cancelled && setStatus('missing')
    probe.onload = () => {
      if (cancelled) return
      let loaded = 0
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image()
        img.src = `/laptop-frames/frame-${String(i).padStart(3, '0')}.jpg`
        const done = () => {
          loaded++
          if (cancelled) return
          setProgressPct(Math.floor((loaded / frameCount) * 100))
          if (loaded === frameCount) setStatus('ready')
        }
        img.onload = done
        img.onerror = done // tolerate gaps; render falls back to nearest frame
        images.current[i - 1] = img
      }
    }
    return () => { cancelled = true }
  }, [frameCount])

  // Canvas scrubbing
  useEffect(() => {
    if (status !== 'ready') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const pickFrame = (idx) => {
      // nearest loaded frame at or below idx (tolerates missing frames)
      for (let i = idx; i >= 0; i--) {
        const im = images.current[i]
        if (im && im.complete && im.naturalWidth > 0) return im
      }
      return null
    }

    const render = () => {
      const idx = reducedMotion
        ? Math.floor(frameCount / 2)
        : Math.round(frameIndex.get())
      const img = pickFrame(Math.min(Math.max(idx, 0), frameCount - 1))
      if (!img) return
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      // cover-fit
      const cAsp = w / h
      const iAsp = img.width / img.height
      let dw, dh, ox, oy
      if (cAsp > iAsp) { dw = w; dh = w / iAsp; ox = 0; oy = (h - dh) / 2 }
      else { dh = h; dw = h * iAsp; ox = (w - dw) / 2; oy = 0 }
      ctx.drawImage(img, ox, oy, dw, dh)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      render()
    }
    window.addEventListener('resize', resize)
    resize()
    const unsub = frameIndex.on('change', render)
    return () => { window.removeEventListener('resize', resize); unsub() }
  }, [status, frameIndex, frameCount, reducedMotion])

  if (status === 'missing') return null

  const overlayPhases = [
    { o: phase1, title: <>WELCOME TO MY <span className="fs-accent">PORTFOLIO</span></>, sub: 'CORE SYSTEM INTERFACE' },
    { o: phase2, title: <>I BUILD <span className="fs-accent">INTELLIGENT</span> SYSTEMS</>, sub: 'AI · COMPUTER VISION · FULL-STACK' },
    { o: phase3, title: <>INITIALIZING <span className="fs-accent">SHOWCASE</span></>, sub: 'KEEP SCROLLING' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: reducedMotion ? '100vh' : '400vh', background: 'var(--bg)' }}
      aria-label="Cinematic intro sequence"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center" style={{ perspective: '2000px' }}>

        {/* Loading overlay */}
        {status === 'loading' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.5em] mb-4 text-blue-500">
              Syncing Core Frames… {progressPct}%
            </div>
            <div className="w-1/4 h-px overflow-hidden bg-white/10">
              <div className="h-full bg-blue-500 transition-[width] duration-200" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* Scrubbed canvas with 3D drift */}
        <motion.div
          style={reducedMotion
            ? { opacity: 1 }
            : { y, rotateX, rotateY, scale, opacity: exitOpacity, filter: exitBlur, transformStyle: 'preserve-3d' }}
          className="relative w-full h-full overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>

        {/* Cinematic grade: vignette + neon wash + scanlines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(4,4,10,0.85) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20" style={{
          background: 'radial-gradient(60% 45% at 50% 50%, rgba(59,130,246,0.25), transparent 65%)',
        }} />

        {/* Text phases */}
        {overlayPhases.map((p, i) => (
          <motion.div key={i} style={{ opacity: p.o }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-40 px-6">
            <h3 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mb-3 drop-shadow-2xl text-white">
              {p.title}
            </h3>
            <p className="font-mono tracking-[0.6em] uppercase text-[11px] text-blue-400 opacity-75">{p.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FrameScroll

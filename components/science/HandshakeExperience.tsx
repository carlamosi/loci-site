'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HandshakeCanvas from './HandshakeCanvas'
import HandshakeOverlay from './HandshakeOverlay'

export default function HandshakeExperience() {
  const [state, setState] = useState<1 | 2 | 3>(1)
  const [transferComplete, setTransferComplete] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Lerp state (no re-renders)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const cursorX = useRef(0)
  const cursorY = useRef(0)
  const rafCursor = useRef<number>(0)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const advance = useCallback(() => {
    setState(s => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))
  }, [])

  useEffect(() => {
    if (state < 3) setTransferComplete(false)
  }, [state])

  // Space key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); advance() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  // Custom cursor rAF loop
  useEffect(() => {
    if (isTouchDevice) return

    const trackMouse = (e: MouseEvent) => {
      const root = rootRef.current
      if (!root) return
      const rect = root.getBoundingClientRect()
      // Use viewport coords for the fixed cursor
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }
    window.addEventListener('mousemove', trackMouse)

    const tick = () => {
      cursorX.current += (mouseX.current - cursorX.current) * 0.1
      cursorY.current += (mouseY.current - cursorY.current) * 0.1
      const el = cursorRef.current
      if (el) {
        el.style.left = `${cursorX.current}px`
        el.style.top = `${cursorY.current}px`
      }
      rafCursor.current = requestAnimationFrame(tick)
    }
    rafCursor.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', trackMouse)
      cancelAnimationFrame(rafCursor.current)
    }
  }, [isTouchDevice])

  const cursorColor = state === 1 ? '#7B5CFF' : state === 2 ? '#FF4A62' : '#C6FF00'
  const dotColors: Record<number, string> = { 1: '#7B5CFF', 2: '#FF4A62', 3: '#C6FF00' }

  return (
    <>
      {/* Fixed custom cursor — only when inside experience and not touch */}
      {!isTouchDevice && (
        <div
          ref={cursorRef}
          className="fixed rounded-full pointer-events-none z-[9999] transition-[width,height,background-color,border-color] duration-300"
          style={{
            width: isHovered ? 32 : 12,
            height: isHovered ? 32 : 12,
            backgroundColor: isHovered ? 'transparent' : cursorColor,
            border: isHovered ? `1.5px solid ${cursorColor}` : '1.5px solid transparent',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      <div
        ref={rootRef}
        onClick={advance}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full overflow-hidden select-none"
        style={{
          height: 'clamp(600px, 70vh, 900px)',
          cursor: !isTouchDevice && state < 3 ? 'none' : 'default',
          background: '#080A0F',
        }}
      >
        {/* z-0: Canvas */}
        <HandshakeCanvas state={state} onTransferComplete={() => setTransferComplete(true)} />

        {/* z-10: Narrative overlay */}
        <HandshakeOverlay state={state} transferComplete={transferComplete} />

        {/* State indicator dots — absolute bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20 pointer-events-none">
          {([1, 2, 3] as const).map(n => (
            <motion.div
              key={n}
              layout
              animate={
                state === n
                  ? { scale: 1.25, backgroundColor: dotColors[n], borderColor: 'transparent' }
                  : { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.2)' }
              }
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="w-2 h-2 rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>

        {/* Bottom bar — fades out on complete */}
        <AnimatePresence>
          {!(state === 3 && transferComplete) && (
            <motion.div
              key="bottom-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-20 pointer-events-none"
            >
              <span className="font-bold text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
                〰 Loci<span style={{ color: 'rgba(198,255,0,0.4)' }}>.</span>
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.15em]"
                style={{ color: 'rgba(255,255,255,0.15)' }}
              >
                SPACE OR CLICK TO ADVANCE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

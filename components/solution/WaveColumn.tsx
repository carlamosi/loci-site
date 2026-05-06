'use client'
import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SimState, LociBadge } from './SimEngine'

interface Props {
  side: 'left' | 'right'
  simState: SimState
}

export default function WaveColumn({ side, simState }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)

  const health = side === 'left' ? simState.leftWaveHealth : simState.rightWaveHealth

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const healthRef = { current: health }

    const loop = () => {
      const w = canvas.width
      const h = canvas.height
      const t = timeRef.current++
      ctx.clearRect(0, 0, w, h)

      const isRight = side === 'right'
      const currentHealth = healthRef.current

      // ── Slow wave ──────────────────────────────────────────────────
      const slowAmp = isRight
        ? h * 0.32
        : (h * 0.28 + h * 0.08 * Math.sin(t * 0.04)) * currentHealth
      const slowFreq = 2.5

      const getSlowY = (x: number) => {
        const nx = x / w
        let y = h / 2 + slowAmp * Math.sin(nx * Math.PI * 2 * slowFreq + t * 0.025)
        if (!isRight) {
          // slight erratic wobble for left side
          y += h * 0.04 * Math.sin(nx * Math.PI * 7 + t * 0.07) * (1 - currentHealth)
        }
        return y
      }

      // Draw slow wave glow
      ctx.save()
      ctx.shadowBlur = 16
      ctx.shadowColor = '#7B5CFF'
      ctx.strokeStyle = '#7B5CFF'
      ctx.lineWidth = isRight ? 2 : 1.5
      ctx.globalAlpha = isRight ? 0.9 : 0.55 * currentHealth + 0.2
      ctx.beginPath()
      for (let x = 0; x <= w; x += 1) {
        const y = getSlowY(x)
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()

      // ── Spindle ─────────────────────────────────────────────────────
      // Right: fires regularly every 4 ticks, properly nested in UP phase
      // Left: fires erratically (deterministic sin pattern), misaligned
      const spindleAmp = h * 0.14

      if (isRight) {
        // Regular spindle bursts every ~4 frames
        const burstPhase = t % 40
        if (burstPhase < 20) {
          const burstCenter = w * 0.5
          const burstWidth = w * 0.18
          ctx.save()
          ctx.shadowBlur = 12
          ctx.shadowColor = '#FF4A62'
          ctx.strokeStyle = '#FF4A62'
          ctx.lineWidth = 1.2
          ctx.globalAlpha = 0.85
          ctx.beginPath()
          let started = false
          for (let x = burstCenter - burstWidth; x <= burstCenter + burstWidth; x += 1) {
            const nx = (x - (burstCenter - burstWidth)) / (burstWidth * 2)
            const env = Math.max(0, Math.sin(nx * Math.PI)) ** 1.5
            const spindleY = getSlowY(x) + spindleAmp * env * Math.sin(nx * Math.PI * 2 * 14 + t * 0.6)
            if (!started) { ctx.moveTo(x, spindleY); started = true } else ctx.lineTo(x, spindleY)
          }
          ctx.stroke()
          ctx.restore()

          // Nested ripple (right side only — correct phase)
          const rippleAmp = h * 0.06
          ctx.save()
          ctx.strokeStyle = '#00D4FF'
          ctx.lineWidth = 0.7
          ctx.globalAlpha = 0.6 * (burstPhase < 16 ? 1 : (20 - burstPhase) / 4)
          ctx.beginPath()
          started = false
          const rippleCenter = burstCenter
          const rippleWidth = burstWidth * 0.6
          for (let x = rippleCenter - rippleWidth; x <= rippleCenter + rippleWidth; x += 1) {
            const nx = (x - (rippleCenter - rippleWidth)) / (rippleWidth * 2)
            const env = Math.max(0, Math.sin(nx * Math.PI)) ** 2
            const rippleY = getSlowY(x) + rippleAmp * env * Math.sin(nx * Math.PI * 2 * 60 + t * 1.5)
            if (!started) { ctx.moveTo(x, rippleY); started = true } else ctx.lineTo(x, rippleY)
          }
          ctx.stroke()
          ctx.restore()
        }
      } else {
        // Left: sparse, deterministic — fires only when sin pattern allows
        const fireGate = Math.sin(t * 0.13) > 0.6
        if (fireGate) {
          const offset = Math.sin(t * 0.05) * w * 0.2 + w * 0.3
          const burstWidth = w * 0.12
          ctx.save()
          ctx.strokeStyle = '#FF4A62'
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.45
          ctx.beginPath()
          let started = false
          for (let x = offset - burstWidth; x <= offset + burstWidth; x += 1) {
            const nx = (x - (offset - burstWidth)) / (burstWidth * 2)
            const env = Math.max(0, Math.sin(nx * Math.PI))
            // Misaligned: y offset is shifted from slow wave UP phase (+20px)
            const spindleY = getSlowY(x) + 20 + spindleAmp * env * Math.sin(nx * Math.PI * 2 * 14 + t * 0.5)
            if (!started) { ctx.moveTo(x, spindleY); started = true } else ctx.lineTo(x, spindleY)
          }
          ctx.stroke()
          ctx.restore()

          // Ripple: misaligned — not nested
          const rippleAmp = h * 0.04
          ctx.save()
          ctx.strokeStyle = '#00D4FF'
          ctx.lineWidth = 0.6
          ctx.globalAlpha = 0.25
          ctx.beginPath()
          started = false
          for (let x = offset - burstWidth * 0.5; x <= offset + burstWidth * 0.5; x += 1) {
            const nx = (x - (offset - burstWidth * 0.5)) / burstWidth
            const env = Math.max(0, Math.sin(nx * Math.PI))
            // Shifted up by 20px relative to spindle — wrong phase
            const rippleY = getSlowY(x) - 20 + rippleAmp * env * Math.sin(nx * Math.PI * 2 * 55 + t * 1.2)
            if (!started) { ctx.moveTo(x, rippleY); started = true } else ctx.lineTo(x, rippleY)
          }
          ctx.stroke()
          ctx.restore()
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side])

  // Update health ref without restarting the loop
  const healthRef = useRef(health)
  useEffect(() => { healthRef.current = health }, [health])

  const badges: LociBadge[] = side === 'right' ? simState.activeBadges : []

  return (
    <div className="relative w-full">
      <div className="relative w-full h-32 lg:h-40">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />

        {/* Loci badges — right side only */}
        {side === 'right' && (
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-10">
            <AnimatePresence mode="popLayout">
              {badges.map(badge => (
                <motion.span
                  key={badge.id}
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="text-[9px] uppercase tracking-wider rounded-full px-3 py-1"
                  style={{
                    background: '#080A0F',
                    border: `1px solid ${badge.color === 'acid' ? 'rgba(198,255,0,0.3)' : 'rgba(0,212,255,0.3)'}`,
                    color: badge.color === 'acid' ? '#C6FF00' : '#00D4FF',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {badge.text}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

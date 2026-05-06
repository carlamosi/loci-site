'use client'
import { useRef, useEffect, useCallback } from 'react'

interface Props {
  state: 1 | 2 | 3
  onTransferComplete: () => void
}

interface Particle {
  x: number; y: number; vx: number; vy: number
  opacity: number; radius: number; color: string; spiral?: boolean
}
interface TrailPoint { x: number; y: number; opacity: number }
interface AmbientPoint { x: number; y: number; vx: number; vy: number; baseOpacity: number; offset: number }

export default function HandshakeCanvas({ state, onTransferComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const slowPhaseRef = useRef(0)
  const spindlePhaseRef = useRef(0)
  const ripplePhaseRef = useRef(0)
  const slowOpacityRef = useRef(1)
  const spindleOpacityRef = useRef(0)
  const rippleOpacityRef = useRef(0)
  const traceXRef = useRef(80)
  const traceYRef = useRef(0)
  const traceOpacityRef = useRef(1)
  const transferDoneRef = useRef(false)
  const traceDirectionRef = useRef<'forward' | 'shattering'>('forward')
  const particlesRef = useRef<Particle[]>([])
  const trailRef = useRef<TrailPoint[]>([])
  const ambientRef = useRef<AmbientPoint[]>([])
  const timeRef = useRef(0)
  const stateRef = useRef<1 | 2 | 3>(state)
  const onCompleteRef = useRef(onTransferComplete)

  useEffect(() => { stateRef.current = state }, [state])
  useEffect(() => { onCompleteRef.current = onTransferComplete }, [onTransferComplete])

  const addParticles = useCallback((x: number, y: number, color: string, count: number, minSpeed: number, maxSpeed: number, spiral: boolean) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed
      particlesRef.current.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, opacity: 0.9, radius: Math.random() * 3 + 1, color, spiral: spiral && Math.random() > 0.5 })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initAmbient = () => {
      ambientRef.current = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        baseOpacity: 0.08 + Math.random() * 0.10, offset: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => { canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight; initAmbient() }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const getSlowY = (x: number) => {
      const nx = x / canvas.width
      return canvas.height / 2 + canvas.height * 0.22 * Math.sin(nx * Math.PI * 2 * 2.5 + slowPhaseRef.current)
    }

    const drawPath = (x1: number, amplitude: number, frequency: number, phaseRef: { current: number }, envelope?: (nx: number) => number) => {
      ctx.beginPath()
      let started = false
      for (let x = 0; x <= canvas.width; x += 1) {
        const nx = x / canvas.width
        const env = envelope ? envelope(nx) : 1
        const y = canvas.height / 2 + amplitude * env * Math.sin(nx * Math.PI * 2 * frequency + phaseRef.current)
        if (!started) { ctx.moveTo(x, y); started = true } else ctx.lineTo(x, y)
      }
    }

    const drawWave = (amplitude: number, frequency: number, phaseRef: { current: number }, color: string, strokeWidth: number, glowOpacity: number, opacity: number, envelope?: (nx: number) => number) => {
      if (opacity <= 0.001) return
      const draw = () => drawPath(0, amplitude, frequency, phaseRef, envelope)

      ctx.save()
      ctx.shadowBlur = 20; ctx.shadowColor = color
      ctx.globalAlpha = glowOpacity * opacity; ctx.strokeStyle = color; ctx.lineWidth = strokeWidth * 5
      draw(); ctx.stroke()
      ctx.restore()

      ctx.save()
      ctx.globalAlpha = opacity; ctx.strokeStyle = color; ctx.lineWidth = strokeWidth
      draw(); ctx.stroke()
      ctx.restore()
    }

    const spEnv = (nx: number) => Math.max(0, Math.sin(nx * Math.PI * 5)) ** 2

    const loop = () => {
      const s = stateRef.current
      const w = canvas.width; const h = canvas.height; const cx = w / 2
      timeRef.current++
      slowPhaseRef.current += 0.006; spindlePhaseRef.current += 0.035; ripplePhaseRef.current += 0.12

      const sT = s === 1 ? 1 : s === 2 ? 0.35 : 1
      const spT = s === 1 ? 0 : 1; const rT = s === 3 ? 1 : 0
      slowOpacityRef.current += (sT - slowOpacityRef.current) * 0.04
      spindleOpacityRef.current += (spT - spindleOpacityRef.current) * 0.04
      rippleOpacityRef.current += (rT - rippleOpacityRef.current) * 0.04

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#080A0F'; ctx.fillRect(0, 0, w, h)

      // Ambient connections
      const amb = ambientRef.current
      ctx.save(); ctx.strokeStyle = 'rgba(123,92,255,0.04)'; ctx.lineWidth = 0.5; ctx.globalAlpha = 1
      for (let i = 0; i < amb.length; i++) {
        for (let j = i + 1; j < amb.length; j++) {
          const dx = amb[i].x - amb[j].x; const dy = amb[i].y - amb[j].y
          if (dx * dx + dy * dy < 8100) { ctx.beginPath(); ctx.moveTo(amb[i].x, amb[i].y); ctx.lineTo(amb[j].x, amb[j].y); ctx.stroke() }
        }
      }
      ctx.restore()

      // Ambient dots
      for (const p of amb) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        const a = p.baseOpacity + 0.06 * Math.sin(timeRef.current * 0.04 + p.offset)
        ctx.save(); ctx.globalAlpha = Math.max(0, a); ctx.fillStyle = '#7B5CFF'
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      }

      drawWave(h * 0.22, 2.5, slowPhaseRef, '#7B5CFF', 2.5, 0.12, slowOpacityRef.current)
      drawWave(h * 0.10, 20, spindlePhaseRef, '#FF4A62', 1.2, 0.08, spindleOpacityRef.current, spEnv)
      drawWave(h * 0.04, 70, ripplePhaseRef, '#00D4FF', 0.6, 0.06, rippleOpacityRef.current, spEnv)

      const traceY = getSlowY(traceXRef.current)
      traceYRef.current = traceY
      const pulseR = 5 + 4 * Math.sin(timeRef.current * 0.08)

      if (s === 1) {
        traceXRef.current = 80
        traceOpacityRef.current = Math.min(1, traceOpacityRef.current + 0.02)
        ctx.save(); ctx.globalAlpha = traceOpacityRef.current * 0.25; ctx.fillStyle = '#C6FF00'; ctx.shadowBlur = 30; ctx.shadowColor = '#C6FF00'
        ctx.beginPath(); ctx.arc(80, traceY, pulseR * 2.5, 0, Math.PI * 2); ctx.fill(); ctx.restore()
        ctx.save(); ctx.globalAlpha = traceOpacityRef.current; ctx.fillStyle = '#C6FF00'; ctx.shadowBlur = 16; ctx.shadowColor = '#C6FF00'
        ctx.beginPath(); ctx.arc(80, traceY, pulseR, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      } else if (s === 2) {
        if (traceDirectionRef.current === 'forward') {
          traceXRef.current += (cx - traceXRef.current) * 0.01
          traceOpacityRef.current = Math.min(1, traceOpacityRef.current + 0.02)
          if (Math.abs(traceXRef.current - cx) < 6) {
            const yC = getSlowY(cx)
            if (yC > h / 2) {
              // DOWN phase — shatter
              particlesRef.current = particlesRef.current.filter(p => p.color !== '#FF4A62' || true)
              addParticles(cx, traceY, '#FF4A62', 24, 2, 8, false)
              traceOpacityRef.current = 0.3; traceXRef.current = 80; traceDirectionRef.current = 'forward'
            } else { traceXRef.current = 80 }
          }
        }
        ctx.save(); ctx.globalAlpha = traceOpacityRef.current * 0.2; ctx.fillStyle = '#FF4A62'; ctx.shadowBlur = 30; ctx.shadowColor = '#FF4A62'
        ctx.beginPath(); ctx.arc(traceXRef.current, traceY, pulseR * 2.5, 0, Math.PI * 2); ctx.fill(); ctx.restore()
        ctx.save(); ctx.globalAlpha = traceOpacityRef.current; ctx.fillStyle = '#FF4A62'; ctx.shadowBlur = 16; ctx.shadowColor = '#FF4A62'
        ctx.beginPath(); ctx.arc(traceXRef.current, traceY, pulseR, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      } else {
        if (!transferDoneRef.current) {
          traceXRef.current += (w - 80 - traceXRef.current) * 0.008
          traceOpacityRef.current = Math.min(1, traceOpacityRef.current + 0.03)
          if (trailRef.current.length >= 40) trailRef.current.shift()
          trailRef.current.push({ x: traceXRef.current, y: traceY, opacity: 0.7 })
          if (traceXRef.current > w * 0.82) {
            transferDoneRef.current = true
            addParticles(traceXRef.current, traceY, '#C6FF00', 70, 1, 12, true)
            onCompleteRef.current()
          }
        }
        trailRef.current = trailRef.current.filter(pt => { pt.opacity -= 0.018; return pt.opacity > 0 })
        for (const pt of trailRef.current) {
          ctx.save(); ctx.globalAlpha = pt.opacity; ctx.fillStyle = '#C6FF00'
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2); ctx.fill(); ctx.restore()
        }
        ctx.save(); ctx.globalAlpha = traceOpacityRef.current * 0.2; ctx.fillStyle = '#C6FF00'; ctx.shadowBlur = 40; ctx.shadowColor = '#C6FF00'
        ctx.beginPath(); ctx.arc(traceXRef.current, traceY, pulseR * 3, 0, Math.PI * 2); ctx.fill(); ctx.restore()
        ctx.save(); ctx.globalAlpha = traceOpacityRef.current; ctx.fillStyle = '#C6FF00'; ctx.shadowBlur = 20; ctx.shadowColor = '#C6FF00'
        ctx.beginPath(); ctx.arc(traceXRef.current, traceY, pulseR, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      }

      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0)
      for (const p of particlesRef.current) {
        if (p.spiral) { p.vx += Math.sin(timeRef.current * 0.1) * 0.3; p.vy += Math.cos(timeRef.current * 0.1) * 0.3; p.opacity -= 0.012 }
        else { p.opacity -= p.color === '#C6FF00' ? 0.012 : 0.022 }
        p.x += p.vx; p.y += p.vy; p.vy += 0.04
        ctx.save(); ctx.globalAlpha = Math.max(0, p.opacity); ctx.fillStyle = p.color; ctx.shadowBlur = 12; ctx.shadowColor = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [addParticles])

  useEffect(() => {
    traceXRef.current = 80; traceOpacityRef.current = 0.6; traceDirectionRef.current = 'forward'
    if (state !== 3) { transferDoneRef.current = false; trailRef.current = [] }
    particlesRef.current = []
  }, [state])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />
}

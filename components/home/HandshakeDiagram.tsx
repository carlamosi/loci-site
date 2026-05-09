'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'

const arcs = [
  { label: 'Slow Wave · Door opens', color: '#7B5CFF', r: 100, tip: 'Opens the transfer window every 2 seconds during sleep.' },
  { label: 'Spindle · Package sent', color: '#FF4A62', r: 70, tip: 'Carries the memory packet inside the open window.' },
  { label: 'Ripple · Memory carried', color: '#00D4FF', r: 40, tip: 'The actual memory compressed into a 100ms burst.' },
]

export default function HandshakeDiagram() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [complete, setComplete] = useState(false)
  const nearMissRef = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const root = rootRef.current
    const gate = root.querySelector<SVGCircleElement>('[data-el="gate"]')
    const spindle = root.querySelector<SVGCircleElement>('[data-el="spindle"]')
    const ripple = root.querySelector<SVGCircleElement>('[data-el="ripple"]')
    const spark = root.querySelector<SVGCircleElement>('[data-el="spark"]')
    const packet = root.querySelector<SVGGElement>('[data-el="packet"]')
    const missX = root.querySelector<SVGTextElement>('[data-el="miss-x"]')
    if (!gate || !spindle || !ripple || !spark || !packet || !missX) return

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power2.out' },
      onRepeat: () => {
        nearMissRef.current = Math.random() < 0.33
      },
    })

    setComplete(false)

    gsap.set([gate, spindle, ripple], { opacity: 0.18 })
    gsap.set([spark, missX], { opacity: 0 })
    gsap.set(packet, { rotate: 0, transformOrigin: '50% 50%' })

    tl.to(gate, { opacity: 1, duration: 0.35 })
      .to(gate, { opacity: 0.35, duration: 0.35 }, '+=0.35')

    tl.to(spindle, { opacity: 1, duration: 0.25 }, 0.25)
      .to(packet, { rotate: 220, duration: 1.2, ease: 'none' }, 0)

    tl.to(ripple, { opacity: 1, duration: 0.18 }, 0.62)
      .to(spark, { opacity: 1, scale: 1, duration: 0.12 }, 0.74)
      .to(spark, { opacity: 0, scale: 0.92, duration: 0.18, ease: 'power1.out' }, 0.86)

    tl.call(() => setComplete(true), [], 0.92).to({}, { duration: 0.5 }).call(() => setComplete(false))

    tl.call(() => {
      if (!nearMissRef.current) return
      gsap.to(missX, { opacity: 0.7, duration: 0.15 })
      gsap.to(missX, { opacity: 0, duration: 0.25, delay: 0.25 })
    }, [], 0.58)

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={rootRef} className="flex flex-col items-center gap-6 mt-10">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg viewBox="-120 -120 240 240" className="w-full h-full">
          <circle
            data-el="gate"
            cx="0"
            cy="0"
            r={arcs[0].r}
            fill="none"
            stroke={arcs[0].color}
            strokeWidth={2.5}
            strokeDasharray={`${arcs[0].r * Math.PI * 2 * 0.22} ${arcs[0].r * Math.PI * 2 * 0.78}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 10px ${arcs[0].color}66)` }}
          />

          <circle
            data-el="spindle"
            cx="0"
            cy="0"
            r={arcs[1].r}
            fill="none"
            stroke={arcs[1].color}
            strokeWidth={2}
            strokeDasharray={`${arcs[1].r * Math.PI * 2 * 0.45} ${arcs[1].r * Math.PI * 2 * 0.55}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${arcs[1].color}55)` }}
          />

          <g data-el="packet">
            <circle cx="0" cy={-arcs[1].r} r="4" fill="#FF4A62" opacity="0.9" />
            <circle cx="0" cy={-arcs[1].r} r="10" fill="#FF4A62" opacity="0.10" />
          </g>

          <circle
            data-el="ripple"
            cx="0"
            cy="0"
            r={arcs[2].r}
            fill="none"
            stroke={arcs[2].color}
            strokeWidth={1.6}
            strokeDasharray={`${arcs[2].r * Math.PI * 2 * 0.35} ${arcs[2].r * Math.PI * 2 * 0.65}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 7px ${arcs[2].color}55)` }}
          />

          <circle data-el="spark" cx="0" cy="0" r="4" fill="#C6FF00" opacity="0" />
          <text data-el="miss-x" x="0" y="7" textAnchor="middle" fill="#FF4A62" fontSize="16" fontFamily="DM Sans, sans-serif" fontWeight="800" opacity="0">
            ×
          </text>

          {arcs.map((arc, i) => (
            <g key={i}>
              <text
                x="0"
                y={-arc.r - 6}
                textAnchor="middle"
                fill={arc.color}
                fontSize="6"
                fontFamily="DM Sans, sans-serif"
                opacity={0.8}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                {arc.label}
              </text>
            </g>
          ))}
          {complete && (
            <text x="0" y="5" textAnchor="middle" fill="#C6FF00" fontSize="12" fontFamily="DM Sans, sans-serif" fontWeight="700">
              ✓
            </text>
          )}
        </svg>
      </div>

      {hovered !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-white/10 rounded-xl px-4 py-2 text-white/70 text-sm max-w-xs text-center"
        >
          {arcs[hovered].tip}
        </motion.div>
      )}

      {complete && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-acid font-bold text-xl"
        >
          ✓ Transfer Complete
        </motion.p>
      )}
    </div>
  )
}

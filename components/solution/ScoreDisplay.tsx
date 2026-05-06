'use client'
import { useEffect, useRef, useState } from 'react'
import type { SimState } from './SimEngine'

interface Props {
  side: 'left' | 'right'
  simState: SimState
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(target)
  const prev = useRef(target)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = prev.current
    const end = target
    if (start === end) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + (end - start) * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else { setValue(end); prev.current = end }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return value
}

export default function ScoreDisplay({ side, simState }: Props) {
  const isLeft = side === 'left'
  const cp = isLeft ? simState.leftCP : simState.rightCP
  const upPhases = isLeft ? simState.leftUpPhases : simState.rightUpPhases
  const spindleDensity = isLeft ? simState.leftSpindleDensity : simState.rightSpindleDensity
  const coupling = isLeft ? simState.leftCoupling : simState.rightCoupling

  const displayScore = useCountUp(cp)
  const displayUp = useCountUp(upPhases)

  const scoreColor = isLeft ? '#FF4A62' : '#C6FF00'

  const metrics = [
    { name: 'UP phases detected', value: displayUp },
    { name: 'Spindle density', value: spindleDensity },
    { name: 'Ripple coupling', value: coupling },
  ]

  return (
    <div>
      <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">
        Consolidation Power
      </p>
      <span
        className="font-bold leading-none block"
        style={{
          fontSize: 'clamp(3.5rem, 6vw, 4.5rem)',
          color: scoreColor,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {displayScore}
      </span>

      <div className="border-t border-white/5 pt-3 mt-3">
        {metrics.map((m, i) => (
          <div key={i} className="flex justify-between py-1.5">
            <span className="text-white/25 text-xs">{m.name}</span>
            <span
              className="text-xs"
              style={{
                color: isLeft ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.65)',
                fontWeight: isLeft ? 400 : 500,
              }}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import React, { useRef, useState, useEffect } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
}

interface NeuralPulseProps {
  children: React.ReactNode
  className?: string
}

export default function NeuralPulse({ children, className = '' }: NeuralPulseProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [canAnimate, setCanAnimate] = useState(true)
  const lastCallTime = useRef<number>(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (prefersReduced || isTouch) {
      setCanAnimate(false)
    }
  }, [])

  const spawnRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canAnimate || !cardRef.current) return

    const now = performance.now()
    if (now - lastCallTime.current < 16) return // throttle to ~60fps
    lastCallTime.current = now

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const id = Date.now() + Math.random()
    
    setRipples(prev => {
      const updated = [...prev, { id, x, y }]
      if (updated.length > 3) {
        return updated.slice(updated.length - 3)
      }
      return updated
    })

    // Remove the ripple after animation completes (700ms)
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 700)
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={spawnRipple}
      onMouseMove={spawnRipple}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {canAnimate && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="neural-ripple"
          style={{
            left: ripple.x,
            top: ripple.y
          }}
        />
      ))}
    </div>
  )
}

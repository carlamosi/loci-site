'use client'

import React, { useEffect, useState } from 'react'

interface GlassmorphicLiftProps {
  children: React.ReactNode
  className?: string
}

export default function GlassmorphicLift({ children, className = '' }: GlassmorphicLiftProps) {
  const [canAnimate, setCanAnimate] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (prefersReduced || isTouch) {
      setCanAnimate(false)
    }
  }, [])

  return (
    <div className={`relative ${canAnimate ? 'glass-lift-card' : ''} ${className}`}>
      {canAnimate && (
        <>
          <div className="glass-lift-layer" />
          <div className="glass-lift-refraction" />
        </>
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}

'use client'
import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  effect?: 'magnetic' | 'glass' | 'pulse'
  strength?: number
}

export default function InteractiveCard({ 
  children, 
  className = '', 
  effect = 'glass',
  strength = 15 
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for magnetic effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs
  const springConfig = { damping: 20, stiffness: 150 }
  const mouseX = useSpring(x, springConfig)
  const mouseY = useSpring(y, springConfig)

  // Rotate transforms
  const rotateX = useTransform(mouseY, [-strength, strength], [strength / 2, -strength / 2])
  const rotateY = useTransform(mouseX, [-strength, strength], [-strength / 2, strength / 2])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
    
    // Set CSS variables for Neural Pulse gradient
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${px}%`)
    cardRef.current.style.setProperty('--mouse-y', `${py}%`)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const getEffectClasses = () => {
    switch (effect) {
      case 'glass': return 'glass-lift'
      case 'pulse': return 'neural-pulse border border-white/10'
      case 'magnetic': return 'border border-white/10'
      default: return ''
    }
  }

  const isMagnetic = effect === 'magnetic'

  if (isMagnetic) {
    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-3xl overflow-hidden ${getEffectClasses()} ${className}`}
      >
        <div style={{ transform: 'translateZ(20px)', height: '100%' }}>
          {children}
        </div>
      </motion.div>
    )
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden ${getEffectClasses()} ${className}`}
    >
      <div style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

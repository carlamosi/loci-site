'use client'
import React, { HTMLAttributes } from 'react'
import { useMagneticFloat } from '@/hooks/useMagneticFloat'

interface MagneticFloatProps extends HTMLAttributes<HTMLDivElement> {
  strength?: number
}

export default function MagneticFloat({ children, strength = 0.3, className = '', ...props }: MagneticFloatProps) {
  const ref = useMagneticFloat<HTMLDivElement>(strength)

  return (
    <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }} {...props}>
      {children}
    </div>
  )
}

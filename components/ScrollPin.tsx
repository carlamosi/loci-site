'use client'
// ═══ FILE: components/ScrollPin.tsx ═══
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

interface ScrollPinProps {
  children: React.ReactNode
  panelCount: number
  className?: string
}

export default function ScrollPin({ children, panelCount, className = '' }: ScrollPinProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return

    const isMobile = window.innerWidth < 768
    if (isMobile) return // vertical stack on mobile

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${panelCount * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Animate to each panel sequentially
      for (let i = 1; i < panelCount; i++) {
        tl.to(innerRef.current, {
          x: `-${i * 100}vw`,
          ease: 'none',
          duration: 1,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [panelCount])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ height: '100vh' }}
    >
      <div
        ref={innerRef}
        className="flex h-full md:flex-row flex-col"
        style={{ width: `${panelCount * 100}vw` }}
      >
        {children}
      </div>
    </div>
  )
}

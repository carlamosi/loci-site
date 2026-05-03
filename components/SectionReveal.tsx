'use client'
// ═══ FILE: components/SectionReveal.tsx ═══
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
// ScrollTrigger is registered in lib/gsap.ts and used inside gsap.context via scrollTrigger option
import 'gsap/ScrollTrigger'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
}

export default function SectionReveal({ children, className = '', stagger = 0.09 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const childElements = ref.current ? Array.from(ref.current.children) : []
      if (childElements.length === 0) return

      gsap.from(childElements, {
        y: 36,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
        stagger: stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

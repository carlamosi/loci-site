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

    const el = ref.current

    const ctx = gsap.context(() => {
      const childElements = el ? Array.from(el.children) : []
      if (childElements.length === 0) return

      try {
        // Fail-safe: ensure elements never remain stuck invisible
        gsap.set(childElements, { opacity: 1, y: 0 })

        gsap.from(childElements, {
          y: 12,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      } catch {
        // If ScrollTrigger/GSAP fails for any reason, keep content visible.
        gsap.set(childElements, { opacity: 1, y: 0 })
      }
    }, ref)

    return () => ctx.revert()
  }, [stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

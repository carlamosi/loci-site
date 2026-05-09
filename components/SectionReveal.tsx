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

function forceChildrenVisible(childElements: Element[]) {
  if (!childElements.length) return

  try {
    gsap.killTweensOf(childElements)
    gsap.set(childElements, { opacity: 1, y: 0 })
  } catch {
    /**/
  }
  for (const node of childElements) {
    const el = node as HTMLElement | SVGElement
    if (el.style) {
      el.style.opacity = '1'
      el.style.transform = ''
    }
  }
}

export default function SectionReveal({ children, className = '', stagger = 0.09 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const targets = Array.from(el.children)
    if (targets.length === 0) return

    let ctx: gsap.Context | undefined

    try {
      ctx = gsap.context(() => {
        try {
          gsap.set(targets, { opacity: 1, y: 0 })

          gsap.from(targets, {
            y: 12,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger,
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          })
        } catch {
          forceChildrenVisible(targets)
        }
      }, ref)
    } catch {
      forceChildrenVisible(targets)
    }

    /** Second safety net: if tween never settles, ensure visibility after a delay */
    let ioKick: number | undefined
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        ioKick = window.setTimeout(() => forceChildrenVisible(targets), 4200)
      },
      { root: null, rootMargin: '0px', threshold: 0.08 }
    )
    io.observe(el)

    const globalKick = window.setTimeout(() => {
      forceChildrenVisible(targets)
      io.disconnect()
    }, 4000)

    return () => {
      window.clearTimeout(globalKick)
      if (ioKick) window.clearTimeout(ioKick)
      io.disconnect()
      ctx?.revert()
    }
  }, [stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

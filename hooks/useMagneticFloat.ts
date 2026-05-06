import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function useMagneticFloat<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null)
  const [canAnimate, setCanAnimate] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (prefersReduced || isTouch) {
      setCanAnimate(false)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || !canAnimate) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      const rotateX = (deltaY / rect.height) * -20
      const rotateY = (deltaX / rect.width) * 20

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
        willChange: 'transform',
        onComplete: () => {
          gsap.set(el, { willChange: 'auto' })
        }
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0, 
        y: 0,
        rotateX: 0, 
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        willChange: 'transform',
        onComplete: () => {
          gsap.set(el, { willChange: 'auto' })
        }
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(el)
    }
  }, [strength, canAnimate])

  return ref
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function RootClientShell({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const posRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    setIsTouch(touch)
    if (touch) return

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnterInteractive = () => {
      cursorRef.current?.classList.add('expanded')
    }
    const handleMouseLeaveInteractive = () => {
      cursorRef.current?.classList.remove('expanded')
    }

    window.addEventListener('mousemove', handleMouseMove)

    const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive)
      el.addEventListener('mouseleave', handleMouseLeaveInteractive)
    })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const loop = () => {
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.12)
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.12)

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentRef.current.x}px`
        cursorRef.current.style.top = `${currentRef.current.y}px`
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {!isTouch && <div ref={cursorRef} className="cursor-dot" />}
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

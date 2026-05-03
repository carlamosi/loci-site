// ═══ FILE: app/layout.tsx ═══
'use client'
import '../styles/globals.css'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
gsap.registerPlugin(useGSAP)
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const posRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device
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

    // Attach to interactive elements
    const attachInteractivity = () => {
      const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, textarea')
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive)
        el.addEventListener('mouseleave', handleMouseLeaveInteractive)
      })
    }

    attachInteractivity()

    // Lerp animation loop
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
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Loci - Memory Consolidation System</title>
        <meta name="description" content="Loci is a 24-hour memory consolidation system for university students. Not less sleep - denser consolidation. Remember What Matters." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080A0F" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Custom cursor */}
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
      </body>
    </html>
  )
}

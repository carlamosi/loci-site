// ═══ FILE: app/page.tsx ═══
'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import BrainWaves from '@/components/BrainWaves'
import SectionReveal from '@/components/SectionReveal'
import CountUp from '@/components/CountUp'
import InteractiveCard from '@/components/InteractiveCard'
import HandshakeDiagram from '@/components/home/HandshakeDiagram'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false })



export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const glowDriftRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const wavesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let heroScrollTrigger: ScrollTrigger | undefined

    // Hero parallax
    if (heroRef.current && textRef.current) {
      heroScrollTrigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          if (textRef.current) {
            gsap.set(textRef.current, { y: p * window.innerHeight * 0.15 })
          }
          if (wavesRef.current) {
            gsap.set(wavesRef.current, { y: p * window.innerHeight * 0.5 })
          }
          if (glowDriftRef.current) {
            const dx = Math.sin(p * Math.PI * 2) * 14
            const dy = (p - 0.35) * 28
            gsap.set(glowDriftRef.current, { x: dx, y: dy })
          }
        },
      })
    }

    return () => heroScrollTrigger?.kill()
  }, [])

  return (
    <div className="bg-midnight">

      {/* ── SECTION 1: HERO — EDITORIAL SPLIT ──────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
        aria-label="Hero"
      >
        {/* Particle field */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticleCanvas />
        </div>

        {/* Deep violet ambient glow — anchored to headband center */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 58%, rgba(123,92,255,0.13) 0%, transparent 70%)' }}
        />
        <div
          ref={glowDriftRef}
          className="absolute inset-[-15%] z-0 pointer-events-none"
          style={{
            transform: 'translate3d(0,0,0)',
            background: 'radial-gradient(ellipse 50% 44% at 50% 56%, rgba(123,92,255,0.18) 0%, transparent 58%)',
          }}
        />

        {/* ── EDITORIAL GRID ── */}
        <div
          ref={textRef}
          className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-0 px-8 lg:px-16 pt-28 pb-8"
        >

          {/* ── LEFT COLUMN: Headline ── */}
          <div className="flex flex-col justify-center lg:pr-12 text-center lg:text-left order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="text-violet text-[10px] uppercase tracking-[0.25em] font-medium mb-6"
            >
              Memory Consolidation System · 2026
            </motion.p>

            <h1 className="font-bold leading-[0.92] mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
              {['Remember', 'What', 'Matters.'].map((word, i) => (
                <motion.span
                  key={word}
                  className={`${['text-white','text-white','text-acid'][i]} block`}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.75, ease: [0.16,1,0.3,1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="text-white/50 text-base leading-relaxed max-w-sm"
            >
              Sleep disruption erases up to{' '}
              <span className="text-white/80 font-semibold">40% of new memories</span>{' '}
              before they consolidate. Loci detects the exact biological window and intervenes.
            </motion.p>

            {/* Thin horizontal rule — editorial detail */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="hidden lg:block h-px bg-gradient-to-r from-violet/40 to-transparent mt-8 origin-left"
            />
          </div>

          {/* ── CENTER COLUMN: Headband floating in space ── */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 py-8 lg:py-0">

            {/* Outer pulse ring 1 */}
            <div
              className="absolute rounded-full border border-violet/10 pointer-events-none"
              style={{ width: 480, height: 480, animation: 'heroRingPulse 4s ease-in-out infinite' }}
            />
            {/* Outer pulse ring 2 — offset phase */}
            <div
              className="absolute rounded-full border border-violet/8 pointer-events-none"
              style={{ width: 380, height: 380, animation: 'heroRingPulse 4s ease-in-out 1.3s infinite' }}
            />
            {/* Inner ring — acid accent */}
            <div
              className="absolute rounded-full border border-acid/15 pointer-events-none"
              style={{ width: 290, height: 290, animation: 'heroRingPulse 3.5s ease-in-out 0.6s infinite' }}
            />

            {/* Glow bloom beneath device */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 340,
                height: 200,
                background: 'radial-gradient(ellipse at 50% 60%, rgba(123,92,255,0.28) 0%, rgba(198,255,0,0.05) 40%, transparent 70%)',
                filter: 'blur(24px)',
                bottom: '8%',
              }}
            />

            {/* The headband — levitating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.0, ease: [0.16,1,0.3,1] }}
              style={{ animation: 'heroFloat 6s ease-in-out infinite', position: 'relative', zIndex: 10 }}
            >
              {/* Subtle drop shadow beneath device */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '70%',
                  height: 32,
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(123,92,255,0.4) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
              <Image
                src="/headband.png"
                alt="Loci Memory Headband"
                width={380}
                height={220}
                priority
                className="relative z-10 transition-transform duration-700 hover:scale-105"
                style={{ filter: 'drop-shadow(0 0 40px rgba(123,92,255,0.45)) drop-shadow(0 0 80px rgba(123,92,255,0.15))' }}
              />
            </motion.div>

            {/* LOCI logo chip on device — acid accent line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute pointer-events-none"
              style={{ bottom: '16%', right: '10%', zIndex: 20 }}
            >
              <div
                className="text-[9px] font-mono tracking-[0.2em] text-acid/70 uppercase"
                style={{ animation: 'heroBlink 3s ease-in-out 2s infinite' }}
              >
                ● EEG Active
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Stats + CTAs ── */}
          <div className="flex flex-col justify-center lg:pl-12 text-center lg:text-left order-3">

            {/* Stat cards — editorial data blocks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="flex flex-col gap-4 mb-8"
            >
              {[
                { value: '40%', label: 'memory loss from one bad night', color: '#FF4A62' },
                { value: '3', label: 'brain waves. one precise window.', color: '#7B5CFF' },
                { value: '100ms', label: 'timing window for transfer', color: '#C6FF00' },
              ].map(({ value, label, color }, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.6, ease: [0.16,1,0.3,1] }}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-0.5 h-full min-h-[2.5rem] mt-1 flex-shrink-0 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
                  />
                  <div>
                    <span className="font-bold text-3xl leading-none" style={{ color }}>{value}</span>
                    <p className="text-white/40 text-xs leading-snug mt-1 max-w-[180px]">{label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3"
            >
              <Link
                href="/solution#simulation"
                className="group relative inline-flex items-center justify-center gap-2 bg-acid text-midnight font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 ease-out hover:bg-acid-hover hover:-translate-y-[1px] hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid/40"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                  style={{ background: 'radial-gradient(120% 120% at 50% 0%, rgba(198,255,0,0.18) 0%, transparent 60%)' }}
                />
                <span className="relative">Explore Simulation →</span>
              </Link>
              <Link
                href="/science#handshake"
                className="group inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 text-sm font-medium px-6 py-3.5 rounded-xl transition-all duration-200 ease-out hover:border-violet/50 hover:text-white hover:bg-violet/8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet/40"
              >
                <span>See the Science</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </motion.div>

            {/* Thin rule — mirrors left column */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="hidden lg:block h-px bg-gradient-to-l from-violet/40 to-transparent mt-8 origin-right"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="relative z-10 flex flex-col items-center gap-1 pb-6"
        >
          <span className="text-white/25 text-xl" style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>↓</span>
          <span className="text-white/15 text-[10px] tracking-widest font-mono">Scroll to understand</span>
        </motion.div>

        {/* Brain waves at bottom */}
        <div ref={wavesRef} className="relative z-10 w-full">
          <BrainWaves />
        </div>
      </section>

      {/* ── SECTION 2: THE PROBLEM ───────────────────────────── */}
      <section className="bg-midnight py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <SectionReveal>
                <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">THE CHALLENGE</p>
                <h2 className="text-white font-bold text-5xl leading-tight mb-6">
                  Your brain forgets<br />while you sleep.
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-4">
                  Every night, your brain attempts to move what you learned into permanent storage.
                  It does this through a precise biological sequence called the{' '}
                  <span className="text-white/80 font-medium">spindle-ripple handshake</span>.
                </p>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  When that sequence works, you remember. When it fails - which happens every time
                  sleep is disrupted - the memory is gone. Not stored somewhere you can't reach.{' '}
                  <span className="text-white/90 font-medium">Actually gone.</span>
                </p>
                <div className="border-l-4 border-violet bg-surface rounded-r-xl px-6 py-4">
                  <p className="text-white text-base font-medium leading-relaxed">
                    "This is not a productivity problem. It is a learning disability at
                    civilizational scale - and nobody has named it as such."
                  </p>
                </div>
              </SectionReveal>
            </div>

            {/* Right stats */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Card 1 */}
              <SectionReveal>
                <InteractiveCard effect="pulse" className="bg-surface border-t-4 border-t-acid">
                  <div className="p-8">
                    <div className="text-acid font-bold leading-none mb-3" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
                      <CountUp end={158} suffix="M" />
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Roughly 158 million university students experience measurably impaired memory consolidation every night. (60% of 264M students globally; UNESCO 2023 / PSQI data).
                    </p>
                  </div>
                </InteractiveCard>
              </SectionReveal>

              {/* Card 2 */}
              <SectionReveal>
                <InteractiveCard effect="pulse" className="bg-surface border-t-4 border-t-coral">
                  <div className="p-8">
                    <div className="text-coral font-bold leading-none mb-3" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
                      40%
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      reduction in the brain's ability to form new memories after a single night without sleep (Yoo et al., 2007).
                    </p>
                  </div>
                </InteractiveCard>
              </SectionReveal>

              {/* Card 3 */}
              <SectionReveal>
                <InteractiveCard effect="pulse" className="bg-surface border-t-4 border-t-cyan">
                  <div className="p-8">
                    <div className="text-cyan font-bold leading-none mb-3" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
                      0
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      existing systems that control <em>which</em> memories transfer. All of them boost
                      the mechanism. None choose the content. Loci is first.
                    </p>
                  </div>
                </InteractiveCard>
              </SectionReveal>

              {/* Card 4 */}
              <SectionReveal>
                <InteractiveCard effect="pulse" className="bg-surface border-t-4 border-t-violet">
                  <div className="p-8">
                    <div className="text-violet font-bold leading-none mb-3" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
                      <CountUp end={55} suffix="M" />
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      people with dementia today. sleep as a significant modifiable risk factor for dementia. The number doubles every 20 years.
                    </p>
                  </div>
                </InteractiveCard>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE HANDSHAKE ─────────────────────────── */}
      <section className="bg-surface py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">THE MECHANISM</p>
            <div className="mb-2 font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <span className="block text-white">Three signals. One sequence.</span>
            </div>
            <div className="mb-6 font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <span className="block text-violet">Miss the nesting, the memory is gone.</span>
            </div>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto mb-2">
              While you sleep, your brain runs a biological program to permanently store what you
              learned. It requires three signals to arrive in perfect sequence - nested inside each
              other like Russian dolls. In 2023, Staresina et al. provided the first direct human neuronal evidence of the SO→spindle→ripple sequence (Nature Neuroscience, 2023).
            </p>

            <HandshakeDiagram />

            <p className="text-white/50 text-base mt-8 max-w-xl mx-auto">
              Loci engineers this sequence - every night - for the memories that matter most to you.
            </p>

            <Link
              href="/solution"
              className="inline-flex items-center gap-1 text-violet font-medium mt-6 hover:underline transition-all"
            >
              See how →
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── SECTION 5: SCIENCE TICKER ───────────────────────── */}
      <section className="bg-midnight py-6 relative overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 ticker-fade-left z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 ticker-fade-right z-10 pointer-events-none" />

        <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(2)].map((_, rep) => (
            <span key={rep} className="flex items-center">
              {[
                'Ngo et al. 2013', '8dB slow-wave amplitude increase', '+10-20% recall improvement', 'Neuron',
                'Lustenberger 2016 (Current Biology, tACS, motor memory)', 'Ladenbauer 2017 (tDCS, MCI patients, SO-spindle coupling)', 'Loren Frank 2013',
                'awake replay discovery', 'Neuron', 'Nedergaard 2013', 'glymphatic system', 'Science',
                'peer-reviewed neuroscience', 'spindle-ripple coupling', 'hippocampal consolidation',
                'slow oscillation UP phase', 'sharp-wave ripple', 'memory transfer',
              ].map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-white/40 text-sm font-medium px-3">{item}</span>
                  <span className="text-violet text-sm font-bold">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

    </div>
  )
}

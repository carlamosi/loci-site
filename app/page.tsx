// ═══ FILE: app/page.tsx ═══
'use client'
import { useRef } from 'react'
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

const words = ['Remember', 'What', 'Matters.']
const wordColors = ['text-white', 'text-white', 'text-acid']

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

      {/* ── SECTION 1: HERO ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
        aria-label="Hero"
      >
        {/* Particle background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticleCanvas />
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(123,92,255,0.08) 0%, transparent 70%)' }}
        />
        <div
          ref={glowDriftRef}
          className="absolute inset-[-15%] z-0 pointer-events-none"
          style={{
            transform: 'translate3d(0,0,0)',
            background:
              'radial-gradient(ellipse 55% 50% at 46% 36%, rgba(123,92,255,0.14) 0%, transparent 58%)',
          }}
        />

        {/* Hero text */}
        <div
          ref={textRef}
          className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-24 pb-16"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-violet text-xs uppercase tracking-[0.2em] font-medium mb-8"
          >
            MEMORY CONSOLIDATION SYSTEM · 2026
          </motion.p>

          {/* H1 */}
          <h1 className="font-bold leading-none mb-8" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            {words.map((word, i) => (
              <motion.span
                key={word}
                className={`${wordColors[i]} inline-block mr-[0.25em]`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35 + i * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-white/60 max-w-xl text-lg leading-relaxed mb-10"
          >
            A single night without sleep reduces the brain's ability to form new memories by approximately 40% (Yoo et al., Nature Neuroscience, 2007). Not because they don't
            study enough. Because the biology of memory transfer fails while they sleep.{' '}
            <span className="text-white/80 font-medium">Loci fixes the transfer.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Link
              href="/solution#simulation"
              className="group relative inline-flex items-center gap-2 bg-acid text-midnight font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 ease-out hover:bg-acid-hover hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid/40"
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
              className="group inline-flex items-center gap-2 border border-violet text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 ease-out hover:bg-violet/10 hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet/40"
            >
              <span>See the Handshake</span>
              <span className="transition-transform duration-200 ease-out group-hover:translate-y-[1px]">↓</span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-white/30 text-2xl" style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>↓</span>
            <span className="text-white/20 text-xs tracking-widest font-mono">Scroll to understand</span>
          </motion.div>
        </div>

        {/* Brain waves at bottom of hero */}
        <div ref={wavesRef} className="relative z-10 w-full mt-auto">
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
            <h2 className="text-white font-bold leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="block"
              >
                Three signals. One sequence.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-violet"
              >
                Miss the nesting, the memory is gone.
              </motion.span>
            </h2>
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

      {/* ── SECTION 4: SCIENCE TICKER ───────────────────────── */}
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

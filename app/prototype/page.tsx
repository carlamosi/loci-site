// ═══ FILE: app/prototype/page.tsx ═══
'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import SectionReveal from '@/components/SectionReveal'

gsap.registerPlugin(useGSAP)

const buildItems = [
  { status: '✅', label: 'Wedge 3 concept app (web)', note: 'Simulates the encoding tagging experience', color: 'text-[#4ADE80]' },
  { status: '✅', label: 'Encoding strength scoring model', note: 'Engagement detection + priority ranking', color: 'text-[#4ADE80]' },
  { status: '✅', label: 'Brand identity system', note: 'Design language, naming, visual system', color: 'text-[#4ADE80]' },
  { status: '🔄', label: 'EEG signal processing pipeline', note: 'In research partnership discussions', color: 'text-acid' },
  { status: '🔄', label: 'Olfactory anchor pairing', note: 'Scent-memory link protocol', color: 'text-acid' },
  { status: '⬜', label: 'Dual-channel synchronization', note: 'Acoustic + tACS, <100ms timing', color: 'text-white/20' },
  { status: '⬜', label: 'Clinical pilot design', note: 'ICU population, Year 2-3', color: 'text-white/20' },
  { status: '⬜', label: 'Awake-replay classifier', note: 'Requires 2-3yr dataset', color: 'text-white/20' },
]

const confirms = [
  'The three-wedge pipeline is coherent as a user experience',
  'University students identify with the memory loss problem immediately',
  'The science narrative is accessible without oversimplifying',
  'The brand identity signals credibility to both users and researchers',
]

const nextItems = [
  'Wristband hardware prototype',
  'EEG signal processing at consumer grade',
  'Dual-channel synchronization validation',
  'Depth electrode coupling study (the open scientific question)',
  'University pilot - 20 students, 4 weeks',
]

const roadmap = [
  {
    label: 'Year 1–2',
    color: '#C6FF00',
    tag: 'NOW',
    tagStyle: 'bg-acid text-midnight',
    title: 'Ship Wedge 3',
    body: 'Wristband + daytime app. Arousal tagging. Olfactory anchor assignment. AI encoding model v1. University partnership.',
  },
  {
    label: 'Year 2–3',
    color: '#00D4FF',
    tag: 'NEAR TERM',
    tagStyle: 'border border-cyan text-cyan',
    title: 'Add Wedge 1',
    body: 'Dual-channel headband. Clinical pilot - ICU population. First peer-reviewed publication.',
  },
  {
    label: 'Year 3–5',
    color: '#7B5CFF',
    tag: 'LONG TERM',
    tagStyle: 'border border-violet text-violet',
    title: 'Complete the pipeline',
    body: 'Wedge 2 awake-replay classifier. Full 24-hour system. Medical device pathway. Elderly cognitive decline study begins.',
  },
]

function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!lineRef.current || !containerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { if (lineRef.current) lineRef.current.style.height = '100%'; return }

    gsap.fromTo(
      lineRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="relative max-w-2xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10">
        <div
          ref={lineRef}
          className="timeline-line w-full"
          style={{ height: '0%' }}
        />
      </div>

      <div className="flex flex-col gap-16">
        {roadmap.map((item, i) => (
          <SectionReveal key={i}>
            <div className="flex gap-8 items-start pl-0">
              {/* Dot */}
              <div className="relative flex-shrink-0 w-16 flex justify-center">
                <div
                  className="w-4 h-4 rounded-full border-2 mt-1 z-10"
                  style={{ borderColor: item.color, background: `${item.color}30`, boxShadow: `0 0 12px ${item.color}60` }}
                />
              </div>
              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white/40 text-xs font-mono uppercase">{item.label}</span>
                  <span className={`text-xs rounded-full px-3 py-0.5 font-medium ${item.tagStyle}`}>{item.tag}</span>
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}

export default function PrototypePage() {
  return (
    <div className="bg-midnight min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(123,92,255,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p
            className="text-violet text-xs uppercase tracking-[0.2em] font-medium mb-6"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            PROTOTYPE & VALIDATION
          </motion.p>
          <motion.h1
            className="text-white font-bold leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            The concept, made real.
          </motion.h1>
          <motion.p
            className="text-white/60 text-xl max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          >
            This is where we show our work. What we have built, what we have tested, and what we still do not know.
          </motion.p>
        </div>
      </section>

      {/* ── BUILD STATUS + DEMO ──────────────────────────────── */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left - build status */}
          <SectionReveal>
            <div>
              <h2 className="text-white font-bold text-3xl mb-3">V0 - Concept Prototype</h2>
              <span className="inline-block bg-acid/10 border border-acid text-acid text-xs uppercase rounded-full px-4 py-2 mb-8 font-medium">
                IN DEVELOPMENT
              </span>

              <div className="flex flex-col">
                {buildItems.map((item, i) => (
                  <div key={i} className="flex gap-4 justify-between border-b border-white/5 py-4 items-start">
                    <div className="flex gap-3 items-start">
                      <span className={`text-lg flex-shrink-0 mt-0.5 ${item.color}`}>{item.status}</span>
                      <div>
                        <p className="text-white/80 text-sm font-medium">{item.label}</p>
                        <p className="text-white/30 text-xs mt-0.5">{item.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right - Live Demo */}
          <SectionReveal>
            <div>
              <p className="text-violet text-xs uppercase tracking-widest font-medium mb-3">
                LIVE DEMO - WEDGE 3 SIMULATOR
              </p>
              <div className="bg-midnight rounded-2xl p-2 border border-white/10">
                <div className="w-full rounded-xl overflow-hidden border border-white/5 bg-surface" style={{ height: '500px' }}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-acid/10 border border-acid/30 flex items-center justify-center">
                      <span className="text-acid text-2xl">⚡</span>
                    </div>
                    <p className="text-white/60 text-sm font-medium">Wedge 3 Simulator</p>
                    <p className="text-white/30 text-xs max-w-xs leading-relaxed">
                      The live demo will be embedded here once the Wedge 3 app is deployed.
                      Replace the src attribute in the iframe below with your app URL.
                    </p>
                    <div className="bg-midnight rounded-xl px-4 py-2 border border-white/10 text-left w-full max-w-xs">
                      <p className="text-white/20 text-xs font-mono">{'<iframe src="YOUR_APP_URL" />'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/30 text-xs mt-3 leading-relaxed">
                Simulates the encoding tagging experience. Wristband hardware in development.
                This is the digital layer of Wedge 3.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── VALIDATION ───────────────────────────────────────── */}
      <section className="bg-midnight py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">USER VALIDATION</p>
            <h2 className="text-white font-bold text-5xl mb-4">What we have heard.</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We conducted validation conversations with 5 participants: 2 university students, 1 shift worker,
              1 neurologist, 1 caregiver. Their responses shaped the product direction.
            </p>
          </SectionReveal>

          {/* Quote placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[0, 1, 2].map((i) => (
              <SectionReveal key={i}>
                <div className="relative bg-surface rounded-2xl p-8 border-l-4 border-violet opacity-60 overflow-hidden">
                  <span className="text-violet text-6xl leading-none block mb-2">"</span>
                  <p className="text-white/40 text-base italic">[VALIDATION DATA BEING COLLECTED]</p>
                  <p className="text-white/20 text-sm mt-4">- Role · Date</p>
                  <div className="absolute inset-0 bg-midnight/60 flex items-center justify-center rounded-2xl">
                    <p className="text-white/20 text-xs uppercase tracking-widest">QUOTE PENDING</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { val: '5', label: 'participants', suffix: '' },
              { val: '?', label: 'would pay', suffix: '' },
              { val: '?', label: '% called it credible', suffix: '' },
            ].map((m, i) => (
              <SectionReveal key={i}>
                <div className="bg-surface rounded-2xl p-8 border border-white/5 opacity-50 text-center">
                  <div className="text-acid font-bold text-6xl mb-2">{m.val}</div>
                  <p className="text-white/40 text-sm">{m.label}</p>
                  <p className="text-white/20 text-xs mt-2 uppercase tracking-widest">PENDING DATA</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROTOTYPE GAP ────────────────────────────────────── */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">WHAT THE PROTOTYPE PROVES</p>
            <h2 className="text-white font-bold text-5xl leading-tight">
              The concept is sound.<br />The engineering is next.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SectionReveal>
              <div>
                <p className="text-white/60 text-base font-medium mb-6">What this prototype confirms:</p>
                <div className="flex flex-col gap-4">
                  {confirms.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[#4ADE80] text-lg flex-shrink-0">✅</span>
                      <p className="text-white/70 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
            <SectionReveal>
              <div>
                <p className="text-white/60 text-base font-medium mb-6">What the next 24 months build:</p>
                <div className="flex flex-col gap-4">
                  {nextItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-white/20 text-lg flex-shrink-0">⬜</span>
                      <p className="text-white/50 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ──────────────────────────────────────────── */}
      <section className="bg-midnight py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-20">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">5-YEAR ROADMAP</p>
            <h2 className="text-white font-bold text-5xl">Where this goes.</h2>
          </SectionReveal>
          <Timeline />
        </div>
      </section>
    </div>
  )
}

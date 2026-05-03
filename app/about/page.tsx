// ═══ FILE: app/about/page.tsx ═══
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'

const values = [
  {
    title: 'RADICAL HONESTY',
    color: 'border-t-acid',
    body: "We name what we don't know. The spindle-ripple coupling question is still open. We say that — because it is the research that makes this worth building.",
  },
  {
    title: 'SCIENCE FIRST',
    color: 'border-t-cyan',
    body: "Every mechanism has a peer-reviewed basis. If the paper doesn't exist, the feature doesn't ship.",
  },
  {
    title: 'HUMAN MISSION',
    color: 'border-t-violet',
    body: "We are not building a wellness gadget. We are building for the people whose sleep is broken and who nobody else is designing for.",
  },
  {
    title: 'OPEN SCIENCE',
    color: 'border-t-coral',
    body: 'Our research findings will be published. Memory consolidation is too important to sit behind a patent wall.',
  },
]

const sdgs = [
  {
    num: 'SDG 3',
    title: 'Good Health & Wellbeing',
    color: '#4C9F38',
    body: "Loci targets the leading preventable driver of cognitive decline: the nightly failure of spindle-ripple coupling. 55 million people with dementia. The number doubles every 20 years. Disrupted sleep is a primary cause.",
  },
  {
    num: 'SDG 4',
    title: 'Quality Education',
    color: '#C5192D',
    body: "When memory consolidation fails, learning fails. A student can study 8 hours and lose 40% of it overnight — not from lack of effort, but from biology. Loci gives that back.",
  },
  {
    num: 'SDG 10',
    title: 'Reduced Inequalities',
    color: '#DD1367',
    body: "Students with disrupted sleep schedules — working students, commuters, caregivers — are disproportionately lower-income. Loci is designed for them, not for those who already sleep well.",
  },
]

const founders = [
  {
    initials: 'CM',
    name: 'Carla Monté',
    role: 'Co-Founder',
    bio: 'Neuroscience meets design. Building the first system to control which memories consolidate — targeting the gap nobody else is filling.',
    linkedin: 'https://www.linkedin.com/in/carlamontesihuro/',
  },
  {
    initials: 'ÖK',
    name: 'Öykü Kesek',
    role: 'Co-Founder',
    bio: 'Research and product strategy. Translating peer-reviewed neuroscience into something people can actually wear, use, and trust.',
    linkedin: 'https://www.linkedin.com/in/oyku-nur-kesek/',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-midnight min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(123,92,255,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h1
            className="text-white font-bold leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: '1.0' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Built to fix<br />what sleep breaks.
          </motion.h1>
          <motion.p
            className="text-white/60 text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            A moonshot project targeting the spindle-ripple coupling failure that causes 20–40%
            memory loss in 1.5 billion people every single night.
          </motion.p>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────── */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <SectionReveal>
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">OUR MISSION</p>
            <h2 className="text-white font-bold text-4xl leading-tight mb-6">
              Not less sleep.<br />Better consolidation.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              Loci exists because memory loss from disrupted sleep is treated as a personal problem.
              It is not. It is a systemic failure with a biological solution.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              We are building the system that gives students back what sleep takes away — not through
              longer nights, not through drugs, but through precision neuroscience that intervenes
              where the biology breaks.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              The mission population is not the high performer who wants an edge. It is the student
              who studies hard, sleeps badly, and watches what they learned disappear by morning.
            </p>
          </SectionReveal>

          <SectionReveal>
            <div className="bg-midnight rounded-2xl p-8 border-l-4 border-violet">
              <p className="text-white/70 text-lg leading-relaxed">
                Every disrupted night<br />
                <span className="text-violet font-medium">= 20-40% of today's learning lost</span><br />
                = compounding, irreversible<br />
                = a problem nobody is solving
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="bg-midnight py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">WHAT WE BELIEVE</p>
            <h2 className="text-white font-bold text-5xl">Four commitments.</h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <SectionReveal key={i}>
                <div className={`bg-surface rounded-2xl p-8 border border-white/5 border-t-4 ${v.color} card-hover`}>
                  <h3 className="text-white font-bold text-lg mb-3 tracking-wide">{v.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{v.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDGs ─────────────────────────────────────────────── */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">SUSTAINABLE DEVELOPMENT GOALS</p>
            <h2 className="text-white font-bold text-5xl mb-4">The global problems we address.</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Loci directly contributes to three United Nations Sustainable Development Goals
              through its core mechanism.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sdgs.map((sdg, i) => (
              <SectionReveal key={i}>
                <div
                  className="bg-midnight rounded-2xl p-8 border border-white/5 card-hover border-t-4"
                  style={{ borderTopColor: sdg.color }}
                >
                  <div className="font-bold text-5xl mb-2" style={{ color: sdg.color }}>
                    {sdg.num}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-4">{sdg.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{sdg.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="bg-midnight py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">THE TEAM</p>
            <h2 className="text-white font-bold text-5xl">Two founders. One mechanism.</h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {founders.map((f, i) => (
              <SectionReveal key={i}>
                <div className="bg-surface rounded-3xl p-10 border border-white/5 card-hover hover:border-violet/30">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-violet/20 flex items-center justify-center mb-6">
                    <span className="text-white font-bold text-3xl">{f.initials}</span>
                  </div>

                  <h3 className="text-white font-bold text-2xl">{f.name}</h3>
                  <p className="text-violet text-xs uppercase tracking-widest mt-1 mb-3 font-medium">
                    {f.role}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">{f.bio}</p>

                  <Link
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-violet text-sm mt-5 hover:text-white transition-colors duration-200"
                  >
                    → Connect on LinkedIn
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ═══ FILE: app/about/page.tsx ═══
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import GlassmorphicLift from '@/components/effects/GlassmorphicLift'
import MagneticFloat from '@/components/effects/MagneticFloat'

const values = [
  {
    title: 'RADICAL HONESTY',
    color: 'border-t-acid',
    body: "We name what we don't know. The spindle-ripple coupling question is still open. We say that - because it is the research that makes this worth building.",
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
    body: "Loci targets the leading preventable driver of cognitive decline: the nightly failure of spindle-ripple coupling. 55 million people with dementia. The number doubles every 20 years. sleep as a significant modifiable risk factor for dementia.",
  },
  {
    num: 'SDG 4',
    title: 'Quality Education',
    color: '#C5192D',
    body: "When memory consolidation fails, learning fails. A single night without sleep reduces the brain's ability to form new memories by approximately 40% (Yoo et al., Nature Neuroscience, 2007) - not from lack of effort, but from biology. Loci gives that back.",
  },
  {
    num: 'SDG 10',
    title: 'Reduced Inequalities',
    color: '#DD1367',
    body: "Students with disrupted sleep schedules - working students, commuters, caregivers - are disproportionately lower-income. Loci is designed for them, not for those who already sleep well.",
  },
]

const founders = [
  {
    initials: 'CM',
    name: 'Carla Monté',
    role: 'Co-Founder',
    bio: 'Neuroscience meets design. Building the first system to control which memories consolidate - targeting the gap nobody else is filling.',
    linkedin: 'https://www.linkedin.com/in/carlamontesihuro/',
    photo: '/carla.jpg'
  },
  {
    initials: 'ÖK',
    name: 'Öykü Kesek',
    role: 'Co-Founder',
    bio: 'Research and product strategy. Translating peer-reviewed neuroscience into something people can actually wear, use, and trust.',
    linkedin: 'https://www.linkedin.com/in/oyku-nur-kesek/',
    photo: '/oyku.jpg'
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
            A moonshot project targeting the spindle-ripple coupling failure that affects over 300 million with chronic sleep disorders (WHO, 2019) every single night. A single night without sleep reduces the brain's ability to form new memories by approximately 40% (Yoo et al., Nature Neuroscience, 2007).
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
              We are building the system that gives students back what sleep takes away - not through
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
                <span className="text-violet font-medium">= ~40% memory formation reduction (Yoo et al., 2007)</span><br />
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
                <GlassmorphicLift className="h-full rounded-2xl group cursor-default">
                  <div className={`p-8 border-t-4 ${v.color} h-full transition-colors duration-300 group-hover:bg-white/[0.03]`}>
                    <h3 className="text-white font-bold text-lg mb-3 tracking-wide group-hover:text-white transition-colors">{v.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">{v.body}</p>
                  </div>
                </GlassmorphicLift>
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
                <GlassmorphicLift className="h-full rounded-2xl group cursor-default">
                  <div
                    className="p-8 border-t-4 h-full transition-colors duration-300 group-hover:bg-white/[0.03]"
                    style={{ borderTopColor: sdg.color }}
                  >
                    <div className="font-bold text-5xl mb-2 transition-transform duration-300 group-hover:scale-105 origin-left" style={{ color: sdg.color }}>
                      {sdg.num}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-4">{sdg.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{sdg.body}</p>
                  </div>
                </GlassmorphicLift>
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
                <MagneticFloat strength={0.05} className="h-full group">
                  <div className="bg-surface p-10 border border-white/5 rounded-2xl h-full flex flex-col transition-colors duration-500 group-hover:border-white/10 group-hover:bg-white/[0.02]">
                    {/* Avatar */}
                    {f.photo ? (
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <Image src={f.photo} alt={f.name}
                          fill className="object-cover rounded-full ring-2 ring-white/5 group-hover:ring-[#7B5CFF]/30 transition-all duration-300" priority />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-violet/20 flex items-center justify-center mx-auto mb-6 border border-transparent group-hover:border-violet/60 transition-colors shrink-0">
                        <span className="text-white font-bold text-3xl">{f.initials}</span>
                      </div>
                    )}

                    <h3 className="text-white font-bold text-2xl group-hover:text-acid transition-colors duration-300">{f.name}</h3>
                    <p className="text-violet text-xs uppercase tracking-widest mt-1 mb-3 font-medium">
                      {f.role}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed flex-1 group-hover:text-white/80 transition-colors">{f.bio}</p>

                    <Link
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-violet/20 border border-white/10 hover:border-violet/50 text-white/70 hover:text-white transition-all duration-300 mt-5 shrink-0"
                      aria-label={`${f.name} LinkedIn`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Link>
                  </div>
                </MagneticFloat>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 YEAR PLAN & BUSINESS CASE ─────────────────────── */}
      <section className="bg-surface py-24 px-6 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">THE ROADMAP</p>
            <h2 className="text-white font-bold text-5xl mb-6">5-Year Plan & Economic Viability</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From benchtop validation to global clinical application. The sequence that builds the moat.
            </p>
          </SectionReveal>

          <div className="space-y-12">
            {/* Year 1-5 Grid */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { year: 'Year 1', title: 'Validate before spending', goal: 'Proof of concept. Scientific and commercial credibility assembled before capital is deployed.', rev: '€0', color: 'border-t-acid' },
                { year: 'Year 2', title: 'First users. First data.', goal: 'Produce the one asset that changes every conversation — a published peer-reviewed pilot study.', rev: '€35k-50k ARR', color: 'border-t-cyan' },
                { year: 'Year 3', title: 'Hardware launch.', goal: 'Get hardware into student hands. Learn whether the recall loop drives real retention.', rev: '€400k-600k ARR', color: 'border-t-violet' },
                { year: 'Year 4', title: 'Clinical validation.', goal: 'Produce the clinical data that separates Loci from every wellness device.', rev: '€2M-2.8M ARR', color: 'border-t-coral' },
                { year: 'Year 5', title: 'The platform.', goal: 'CE marking received. FDA filing submitted. The aging mission begins.', rev: '€8M-11M ARR', color: 'border-t-acid' }
              ].map((phase, i) => (
                <SectionReveal key={i}>
                  <div className={`bg-midnight rounded-xl p-8 border-l-4 ${phase.color.replace('border-t-', 'border-l-')} hover:bg-white/[0.02] transition-colors duration-300 group`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div>
                        <span className="text-violet font-bold text-xl mr-3 group-hover:text-white transition-colors">{phase.year}</span>
                        <h3 className="text-white font-bold text-2xl inline">{phase.title}</h3>
                      </div>
                      <span className="bg-surface border border-white/10 px-4 py-1.5 rounded-full text-white/70 text-xs font-medium whitespace-nowrap group-hover:border-white/30 transition-colors">Target: {phase.rev}</span>
                    </div>
                    <p className="text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors">{phase.goal}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Business Case Summary */}
            <SectionReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="bg-midnight p-8 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors duration-300 group">
                  <h3 className="text-white font-bold text-xl mb-6 group-hover:text-acid transition-colors">Unit Economics</h3>
                  <ul className="space-y-4 text-white/60 text-sm">
                    <li className="flex justify-between items-center"><span className="text-white/40">Loci One</span> <span className="font-mono text-white/80 bg-surface px-2 py-1 rounded">€149 + €9.99/mo</span></li>
                    <li className="flex justify-between items-center"><span className="text-white/40">Hardware Margin</span> <span className="font-medium text-white/80">25–35%</span></li>
                    <li className="flex justify-between items-center"><span className="text-white/40">Subscription Margin</span> <span className="font-medium text-white/80">~80%</span></li>
                    <li className="flex justify-between items-center"><span className="text-white/40">90-Day Churn Model</span> <span className="font-medium text-white/80">45% (conservative)</span></li>
                    <li className="flex justify-between items-center"><span className="text-white/40">CAC Target (Yr 3)</span> <span className="font-medium text-white/80">&lt;€60</span></li>
                  </ul>
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                      <strong className="text-white/80 font-medium">Why churn survives:</strong> Hardware margin is captured at purchase. Pure software margin from month two onward.
                    </p>
                  </div>
                </div>

                <div className="bg-midnight p-8 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors duration-300 group">
                  <h3 className="text-white font-bold text-xl mb-6 group-hover:text-cyan transition-colors">The Market Context</h3>
                  <ul className="space-y-6 text-white/60 text-sm">
                    <li>
                      <strong className="text-white/90 block mb-1 text-base">264 Million Students</strong>
                      <span className="group-hover:text-white/80 transition-colors">264 million students enrolled in higher education globally (UNESCO, 2023). Across every country studied, approximately 60% of university students are poor sleepers (Pittsburgh Sleep Quality Index data). This means roughly 158 million students experience measurably impaired memory consolidation every night they study.</span>
                    </li>
                    <li>
                      <strong className="text-white/90 block mb-1 text-base">$10.95B Brain Health Market</strong>
                      <span className="group-hover:text-white/80 transition-colors">Students already pay for memory products with no peer-reviewed mechanism.</span>
                    </li>
                    <li>
                      <strong className="text-white/90 block mb-1 text-base">The Moat</strong>
                      <span className="group-hover:text-white/80 transition-colors">Hospital pilot dataset + depth electrode study builds an irreplicable asset.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  )
}


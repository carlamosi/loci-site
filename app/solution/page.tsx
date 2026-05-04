// ═══ FILE: app/solution/page.tsx ═══
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import BrainWaves from '@/components/BrainWaves'
import SectionReveal from '@/components/SectionReveal'
import ScrollPin from '@/components/ScrollPin'
import InteractiveCard from '@/components/InteractiveCard'

const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false })

function WristbandIllustration({ color = '#C6FF00' }: { color?: string }) {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="float-anim relative">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
          style={{ background: color, transform: 'scale(1.3)' }}
        />
        {/* Band */}
        <div
          className="relative w-36 h-24 rounded-3xl border-2 flex items-center justify-center"
          style={{ borderColor: color, background: `${color}10` }}
        >
          <div className="w-20 h-12 rounded-xl border flex items-center justify-center"
            style={{ borderColor: `${color}60`, background: `${color}08` }}>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${10 + Math.sin(i * 2) * 8}px`,
                    background: color,
                    opacity: 0.7,
                    animation: `scrollBounce ${0.8 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Screen pulse */}
          <div
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ background: color, animation: 'pulseAcid 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  )
}

function ExpandableDetail({ preview, detail }: { preview: string; detail: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-violet text-sm hover:text-white transition-colors duration-200 flex items-center gap-2"
      >
        {open ? '▼' : '▶'} {preview}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed mt-3 border-l-2 border-violet/30 pl-4">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const specs1 = [
  { name: 'Sensors', value: 'HRV · GSR · Motion' },
  { name: 'Trigger mechanism', value: 'Arousal stimulus' },
  { name: 'Output', value: 'Encoding score 0-100' },
  { name: 'Anchor', value: 'Olfactory pairing' },
]

const specs2 = [
  { name: 'Sensing', value: 'Real-time EEG' },
  { name: 'Channel 1', value: 'Acoustic · UP phase sync' },
  { name: 'Channel 2', value: 'tACS · 12-15Hz spindle' },
  { name: 'Delivery', value: 'Olfactory diffuser' },
  { name: 'Critical timing', value: '< 100ms accuracy' },
]

export default function SolutionPage() {
  return (
    <div className="bg-midnight min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex flex-col" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 z-0">
          <ParticleCanvas />
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(198,255,0,0.05) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-32 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-violet text-xs uppercase tracking-[0.2em] font-medium mb-6"
          >
            THE SOLUTION
          </motion.p>

          <h1 className="font-bold leading-none mb-4" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            <motion.span
              className="text-white block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              24 hours.
            </motion.span>
            <motion.span
              className="text-acid block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              Three interventions.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/60 text-xl max-w-xl leading-relaxed mt-4"
          >
            Loci is not a sleep tracker. It does not observe - it intervenes. At the moment of
            learning. During rest. And at the exact right millisecond during sleep.
          </motion.p>
        </div>

        <div className="relative z-10 w-full">
          <BrainWaves />
        </div>
      </section>

      {/* ── PIPELINE - HORIZONTAL SCROLL PANELS ─────────────── */}
      <ScrollPin panelCount={3}>

        {/* PANEL 1 - ENCODING */}
        <div
          className="flex-shrink-0 flex flex-col md:flex-row h-full"
          style={{ width: '100vw' }}
        >
          <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-0">
            <div className="max-w-lg">
              <div className="text-acid/15 font-bold select-none leading-none mb-4"
                style={{ fontSize: 'clamp(5rem, 15vw, 10rem)' }}>01</div>
              <p className="text-acid text-xs uppercase tracking-widest font-medium mb-3">ENCODING PHASE</p>
              <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Tag it before it disappears.
              </h2>

              <InteractiveCard effect="pulse" className="mb-6">
                <div className="bg-surface p-6">
                  <p className="text-white/40 text-xs uppercase mb-3">💡 In plain language</p>
                  <p className="text-white/70 text-base leading-relaxed">
                    Right now, while you study, your brain hasn't decided whether to keep this memory yet. Loci intervenes at this exact moment to flag it as important - before the decision is made.
                  </p>
                </div>
              </InteractiveCard>

              <ul className="flex flex-col gap-2 mb-6">
                {['⚡ HRV + GSR biometric sensing', '🏷️ Encoding strength score (0–100)', '👃 Olfactory anchor pairing'].map((item, i) => (
                  <li key={i} className="text-white/70 text-sm flex items-center gap-2">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <ExpandableDetail
                preview="For the curious →"
                detail="Loci Band Day monitors HRV and galvanic skin response to detect peak cognitive engagement. At that moment, a precise arousal stimulus triggers norepinephrine release, artificially elevating amygdala salience - flagging the memory trace for preferential hippocampal replay."
              />

              <div className="mt-6">
                <span className="bg-acid/10 border border-acid text-acid text-xs rounded-full px-3 py-1">
                  NO BCI REQUIRED
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex items-center justify-center px-8 py-8">
            <WristbandIllustration color="#C6FF00" />
          </div>
        </div>

        {/* PANEL 2 - REPLAY WINDOW */}
        <div
          className="flex-shrink-0 flex flex-col md:flex-row h-full"
          style={{ width: '100vw' }}
        >
          <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-0">
            <div className="max-w-lg">
              <div className="text-cyan/15 font-bold select-none leading-none mb-4"
                style={{ fontSize: 'clamp(5rem, 15vw, 10rem)' }}>02</div>
              <p className="text-cyan text-xs uppercase tracking-widest font-medium mb-3">REPLAY WINDOW</p>
              <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Your brain replays while you rest. We amplify it.
              </h2>

              <InteractiveCard effect="pulse" className="mb-6">
                <div className="bg-surface p-6">
                  <p className="text-white/40 text-xs uppercase mb-3">💡 In plain language</p>
                  <p className="text-white/70 text-base leading-relaxed">
                    When you close your laptop and sit quietly for 10 minutes, your hippocampus is already replaying what you just learned. This isn't a metaphor - it's a measurable biological signal. Loci detects it and makes it stronger.
                  </p>
                </div>
              </InteractiveCard>

              <ExpandableDetail
                preview="For the curious →"
                detail="Loren Frank (2013) discovered that hippocampal sharp-wave ripples - the signals that carry memory replays - fire during quiet wakefulness, not only during sleep. Loci's EEG layer detects these awake-state ripples and delivers phase-locked acoustic pulses to amplify them."
              />

              <div className="mt-6 bg-surface/50 rounded-xl p-4 border border-white/5">
                <p className="text-white/30 text-xs italic">
                  "Loren Frank, 2013 - unexploited commercially until now."
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex items-center justify-center px-8 py-8">
            {/* Ripple visualization */}
            <div className="float-anim">
              <svg viewBox="-80 -80 160 160" className="w-48 h-48">
                <defs>
                  <filter id="ripple-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Head silhouette */}
                <ellipse cx="0" cy="0" rx="50" ry="55" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <ellipse cx="0" cy="-5" rx="35" ry="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {/* Ripple waves */}
                {[20, 30, 40].map((r, i) => (
                  <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#00D4FF"
                    strokeWidth="0.8" opacity={0.3 + i * 0.15} filter="url(#ripple-glow)"
                    strokeDasharray={`${r * 0.5} ${r * 0.3}`}
                    style={{ animation: `pulseAcid ${1.2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
                  />
                ))}
                <circle cx="0" cy="0" r="4" fill="#00D4FF" opacity="0.8" filter="url(#ripple-glow)" />
              </svg>
            </div>
          </div>
        </div>

        {/* PANEL 3 - SYNC PHASE */}
        <div
          className="flex-shrink-0 flex flex-col md:flex-row h-full"
          style={{ width: '100vw' }}
        >
          <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-0">
            <div className="max-w-lg">
              <div className="text-violet/15 font-bold select-none leading-none mb-4"
                style={{ fontSize: 'clamp(5rem, 15vw, 10rem)' }}>03</div>
              <p className="text-violet text-xs uppercase tracking-widest font-medium mb-3">SYNC PHASE</p>
              <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                The handshake, engineered.
              </h2>

              <InteractiveCard effect="pulse" className="mb-6">
                <div className="bg-surface p-6">
                  <p className="text-white/40 text-xs uppercase mb-3">💡 In plain language</p>
                  <p className="text-white/70 text-base leading-relaxed">
                    While you sleep, Loci detects the exact millisecond your brain opens the memory transfer window, delivers two synchronized signals to complete the handshake - then releases the scent linked to the memory you flagged this morning.
                  </p>
                </div>
              </InteractiveCard>

              {/* Dual channel diagram */}
              <div className="bg-surface rounded-2xl p-4 mb-4">
                <p className="text-white/40 text-xs uppercase mb-3 font-mono">DUAL CHANNEL SYNC</p>
                <svg viewBox="0 0 280 80" className="w-full h-20">
                  {/* Channel 1 - violet slow wave */}
                  <path d="M0,40 C20,15 40,65 60,40 C80,15 100,65 120,40 C140,15 160,65 180,40 C200,15 220,65 240,40 C260,15 280,65 280,40"
                    stroke="#7B5CFF" strokeWidth="1.5" fill="none" opacity="0.8" />
                  {/* UP phase marker */}
                  <rect x="50" y="15" width="60" height="2" fill="#C6FF00" opacity="0.6" />
                  <text x="55" y="12" fill="#C6FF00" fontSize="5" fontFamily="monospace">UP PHASE</text>
                  {/* Channel 2 - coral spindle inside UP phase */}
                  <path d="M55,40 L60,25 L65,40 L70,18 L75,40 L80,22 L85,40 L90,28 L95,40 L100,40"
                    stroke="#FF4A62" strokeWidth="1" fill="none" opacity="0.9" />
                  {/* 100ms label */}
                  <line x1="50" y1="60" x2="110" y2="60" stroke="#C6FF00" strokeWidth="0.5" />
                  <text x="70" y="72" fill="#C6FF00" fontSize="6" fontFamily="monospace">100ms window</text>
                  {/* Transfer mark */}
                  <text x="200" y="38" fill="#C6FF00" fontSize="8" fontFamily="monospace" fontWeight="bold">✓ Transfer</text>
                </svg>
              </div>

              <ExpandableDetail
                preview="For the curious →"
                detail="Channel 1 (acoustic): detects slow-wave UP phase onset via real-time EEG, fires a pink noise burst to entrain the slow oscillation. Channel 2 (tACS): receives timing signal, fires 12-15Hz alternating current within 100ms to drive thalamo-cortical spindle activity. The olfactory anchor then cues hippocampal replay of the Lead Trace during the spindle window."
              />
            </div>
          </div>

          <div className="md:w-1/2 flex items-center justify-center px-8 py-8">
            <WristbandIllustration color="#7B5CFF" />
          </div>
        </div>
      </ScrollPin>

      {/* ── HARDWARE CARDS ───────────────────────────────────── */}
      <section className="bg-midnight py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">THE HARDWARE</p>
            <h2 className="text-white font-bold text-5xl leading-tight">Two bands. One system.</h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Band Day */}
            <SectionReveal>
              <InteractiveCard effect="glass">
                <div className="bg-surface p-10 border border-white/5 group h-full">
                  <p className="text-acid text-xs uppercase tracking-widest font-medium mb-6">LOCI BAND DAY</p>
                  <WristbandIllustration color="#C6FF00" />
                  <h3 className="text-white font-bold text-3xl mt-4 mb-3">Worn during learning.</h3>
                  <p className="text-white/60 text-base leading-relaxed mb-8">
                    Monitors your engagement in real time. Tags memories at peak learning moments.
                    Assigns an olfactory anchor to each Trace.
                  </p>
                  <div className="flex flex-col">
                    {specs1.map((s, i) => (
                      <div key={i} className="flex justify-between border-b border-white/5 py-4">
                        <span className="text-white/70 text-sm">{s.name}</span>
                        <span className="text-white/40 text-sm">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </InteractiveCard>
            </SectionReveal>

            {/* Band Night */}
            <SectionReveal>
              <InteractiveCard effect="glass">
                <div className="bg-surface p-10 border border-white/5 group h-full">
                  <p className="text-violet text-xs uppercase tracking-widest font-medium mb-6">LOCI BAND NIGHT</p>
                  <WristbandIllustration color="#7B5CFF" />
                  <h3 className="text-white font-bold text-3xl mt-4 mb-3">Worn during sleep.</h3>
                  <p className="text-white/60 text-base leading-relaxed mb-8">
                    Detects the exact moment to intervene. Engineers the spindle-ripple handshake.
                    Delivers the scent that cues your brain to replay the right memory.
                  </p>
                  <div className="flex flex-col">
                    {specs2.map((s, i) => (
                      <div key={i} className="flex justify-between border-b border-white/5 py-4">
                        <span className="text-white/70 text-sm">{s.name}</span>
                        <span className="text-white/40 text-sm">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </InteractiveCard>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  )
}

// ═══ FILE: app/science/page.tsx ═══
'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrainWaves from '@/components/BrainWaves'
import SectionReveal from '@/components/SectionReveal'

function WaveViz({ phase }: { phase: number }) {
  const w = 400, h = 180
  const slowWave = `M0,90 C40,30 80,150 120,90 C160,30 200,150 240,90 C280,30 320,150 360,90 C380,60 395,100 400,90`
  const spindleWave = `M0,90 L50,90 L55,60 L62,120 L70,50 L78,130 L85,60 L92,120 L100,90 L200,90 L210,90`
  const rippleWave = `M0,90 L160,90 L163,78 L167,102 L171,72 L175,108 L179,76 L183,104 L187,82 L191,98 L195,90 L400,90`

  return (
    <div className="w-full max-w-md">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <defs>
          <filter id="gv"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="gc"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="gcy"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {[45, 90, 135].map(y => <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}

        {phase >= 1 && (
          <>
            <motion.path initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:.9}} transition={{duration:1.2}} d={slowWave} stroke="#7B5CFF" strokeWidth="2" fill="none" filter="url(#gv)"/>
            <motion.rect initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.8}} x="120" y="10" width="160" height="160" rx="4" fill="rgba(198,255,0,0.04)" stroke="rgba(198,255,0,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
            <motion.text initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} x="125" y="24" fill="#C6FF00" fontSize="8" fontFamily="monospace">UP PHASE</motion.text>
          </>
        )}
        {phase >= 2 && (
          <motion.path initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:.9}} transition={{duration:1}} d={spindleWave} stroke="#FF4A62" strokeWidth="1.5" fill="none" filter="url(#gc)"/>
        )}
        {phase >= 3 && (
          <>
            <motion.path initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:.9}} transition={{duration:.8}} d={rippleWave} stroke="#00D4FF" strokeWidth="1" fill="none" filter="url(#gcy)"/>
            <motion.text initial={{opacity:0,scale:.5}} animate={{opacity:1,scale:1}} transition={{delay:.5,type:'spring'}} x="330" y="95" fill="#C6FF00" fontSize="14" fontFamily="DM Sans" fontWeight="700">✓</motion.text>
          </>
        )}
      </svg>
      <div className="flex gap-4 mt-2 justify-center flex-wrap">
        {phase >= 1 && <span className="text-violet text-xs font-mono">● Slow wave</span>}
        {phase >= 2 && <span className="text-coral text-xs font-mono">● Spindle</span>}
        {phase >= 3 && <span className="text-cyan text-xs font-mono">● Ripple · Transfer ✓</span>}
      </div>
    </div>
  )
}

const sciencePanels = [
  {
    phase: 1, counter: '01 / 03', title: 'The door opens.',
    color: 'text-violet', borderColor: 'border-violet', labelColor: 'text-acid',
    label: '[UP PHASE - WINDOW OPEN]',
    plain: 'Think of your sleeping brain like a building. Every 2 seconds, a master signal sweeps through - opening a window for about half a second. During that window, the building is receptive. Information can enter. This is the Slow Oscillation.',
    technical: 'Slow oscillations (0.5Hz) originate in layer V pyramidal neurons of the neocortex. The UP state represents mass depolarization of cortical neurons - the window of maximum cortical receptivity for hippocampal input. The DOWN state is active inhibition. (Steriade et al., 1993; Ngo et al., 2013)',
    loci: 'Loci detects this window in real time via EEG and uses it to time everything else.',
  },
  {
    phase: 2, counter: '02 / 03', title: 'The package is sent.',
    color: 'text-coral', borderColor: 'border-coral', labelColor: 'text-coral',
    label: '[SPINDLE - CARRIER WAVE]',
    plain: 'Inside that open window, a second signal appears - the Sleep Spindle. It lasts about one second and fires 12 to 15 times per second. Think of it as a container that can carry something - but only if it arrives inside the window, not outside.',
    technical: 'Spindles (12-15Hz, ~1 second duration) originate in thalamo-reticular circuits. They appear nested within slow oscillation UP phases. Their function: synchronize hippocampal and cortical oscillatory activity to create the transfer window. Coupling accuracy of 50-100ms is critical. (Ladenbauer et al., 2017)',
    loci: "Loci's tACS channel (Channel 2) drives spindle activity on demand - firing within 100ms of UP phase detection by Channel 1.",
  },
  {
    phase: 3, counter: '03 / 03', title: 'The memory arrives.',
    color: 'text-cyan', borderColor: 'border-cyan', labelColor: 'text-cyan',
    label: '[RIPPLE - MEMORY CARRIER]',
    plain: 'The final signal is the Sharp-Wave Ripple. It comes from the hippocampus - the part of the brain that holds short-term memories. It carries a compressed replay of something you experienced. When it nests correctly inside the spindle, the cortex receives and stores it permanently.',
    technical: 'Sharp-wave ripples (80-120Hz, ~100ms) originate in CA1 of the hippocampus. They carry temporally compressed replays of recent experience. For transfer to occur, the ripple must arrive within the spindle window. Miss the coupling - the trace does not reach the neocortex. (Buzsáki, 2015; Frank et al., 2013)',
    loci: 'The olfactory anchor - the scent paired with your Lead Trace - is released during the spindle window, cueing the hippocampus to replay that specific trace.',
  },
]

const papers = [
  {
    journal: 'Nature Neuroscience', jColor: 'text-acid', jBg: 'bg-acid/10 border-acid/30',
    authors: 'Ngo, Claussen, Born, Mölle · 2013',
    headline: '+40-60% UP phases. +10-20% recall.',
    plain: 'Acoustic stimulation timed to slow-wave sleep increased memory transfer windows - and measurably improved recall the next morning.',
    proves: 'Validates Channel 1 - the acoustic slow-wave synchronization layer.',
    waveColor: '#7B5CFF',
  },
  {
    journal: 'Current Biology', jColor: 'text-cyan', jBg: 'bg-cyan/10 border-cyan/30',
    authors: 'Ladenbauer et al. · 2017',
    headline: 'tACS-induced spindles improve memory in older adults.',
    plain: 'Electrically-induced sleep spindles - using the same tACS approach as Loci Channel 2 - increased spindle density and produced statistically significant memory improvement.',
    proves: 'Validates Channel 2 - tACS spindle induction on demand.',
    waveColor: '#FF4A62',
  },
  {
    journal: 'Neuron', jColor: 'text-violet', jBg: 'bg-violet/10 border-violet/30',
    authors: 'Loren Frank et al. · 2013',
    headline: 'Hippocampal replay during quiet wakefulness.',
    plain: 'Memory replay also fires during quiet wakefulness. Every time you pause and sit still, your hippocampus replays what you just experienced. Nobody had built a product around this.',
    proves: 'Validates Wedge 2 - the Replay Window intervention.',
    waveColor: '#00D4FF',
  },
  {
    journal: 'Science', jColor: 'text-coral', jBg: 'bg-coral/10 border-coral/30',
    authors: 'Nedergaard et al. · 2013',
    headline: "The glymphatic system - the brain's nightly cleaning cycle.",
    plain: "During deep sleep, the brain physically clears toxic waste - including proteins linked to Alzheimer's. Miss it enough nights and the damage is physical, not just cognitive.",
    proves: "Establishes the stakes. Why disrupted sleep is a disease-level problem, not a productivity problem.",
    waveColor: '#FF4A62',
  },
]

function ScienceScrolly() {
  const [activePanel, setActivePanel] = useState(0)
  const [expandedTech, setExpandedTech] = useState<number | null>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActivePanel(i) }, { threshold: 0.5 })
      obs.observe(panel)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-24">
          {sciencePanels.map((p, i) => (
            <div key={i} ref={el => { panelRefs.current[i] = el }} className="min-h-[60vh] flex flex-col justify-center py-16">
              <p className={`${p.color} text-xs uppercase tracking-widest font-medium mb-4`}>{p.counter}</p>
              <h3 className="text-white font-bold text-4xl mb-6">{p.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-4">{p.plain}</p>
              <p className={`${p.labelColor} text-xs uppercase tracking-widest font-mono mb-6`}>{p.label}</p>
              <div className="mb-6">
                <button onClick={() => setExpandedTech(expandedTech === i ? null : i)}
                  className="text-white/40 text-xs uppercase tracking-widest hover:text-white/70 transition-colors flex items-center gap-2">
                  {expandedTech === i ? '▼' : '▶'} Technical depth
                </button>
                <AnimatePresence>
                  {expandedTech === i && (
                    <motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                      className="text-white/40 text-sm leading-relaxed mt-3 border-l-2 border-white/10 pl-4 overflow-hidden">
                      {p.technical}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className={`border-l-4 ${p.borderColor} bg-surface rounded-r-xl px-4 py-3`}>
                <p className="text-white/70 text-sm leading-relaxed">{p.loci}</p>
              </div>
              {i === 2 && (
                <div className="mt-6 bg-acid/10 border border-acid rounded-xl px-4 py-3">
                  <p className="text-acid font-bold text-lg">✓ Transfer complete.</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex items-start">
          <div className="sticky top-32 w-full flex flex-col items-center gap-4 pt-16">
            <WaveViz phase={activePanel + 1} />
            <p className="text-white/30 text-xs text-center max-w-xs">Scroll to see each signal appear</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SciencePage() {
  return (
    <div className="bg-midnight min-h-screen">
      <section className="pt-36 pb-16 px-6 text-center relative">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(198,255,0,0.05) 0%, transparent 60%)'}}/>
        <div className="relative z-10">
          <motion.h1 className="text-acid font-bold leading-none mb-6" style={{fontSize:'clamp(4rem,14vw,9rem)'}}
            initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8,ease:[0.16,1,0.3,1]}}>
            The Handshake.
          </motion.h1>
          <motion.p className="text-white/60 text-2xl max-w-2xl mx-auto leading-relaxed"
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.4,duration:.7}}>
            Three signals. One sequence. Miss the nesting by 100 milliseconds and the memory does not transfer.
          </motion.p>
        </div>
      </section>
      <BrainWaves />
      <section className="py-24"><ScienceScrolly /></section>

      <section className="bg-surface py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-violet text-xs uppercase tracking-widest font-medium mb-4">PEER-REVIEWED BASIS</p>
            <h2 className="text-white font-bold text-5xl mb-4">The science Loci is built on.</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">These are not peripheral references. Each paper directly supports a specific mechanism in the Loci pipeline.</p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {papers.map((paper, i) => (
              <SectionReveal key={i}>
                <div className="bg-midnight rounded-2xl p-8 border border-white/5 card-hover hover:border-violet/30 flex flex-col gap-4 h-full">
                  <span className={`text-xs rounded-full px-3 py-1 border w-fit font-medium ${paper.jColor} ${paper.jBg}`}>{paper.journal}</span>
                  <p className="text-white/40 text-xs uppercase tracking-wide">{paper.authors}</p>
                  <h3 className="text-white font-bold text-2xl leading-tight">{paper.headline}</h3>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">{paper.plain}</p>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-violet text-xs leading-relaxed">{paper.proves}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

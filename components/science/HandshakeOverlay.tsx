'use client'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  state: 1 | 2 | 3
  transferComplete: boolean
}

const ease = [0.16, 1, 0.3, 1] as const

const enter = { opacity: 0, y: 24 }
const visible = { opacity: 1, y: 0 }
const exit = { opacity: 0, y: -16 }


const PulsingDot = ({ color }: { color: string }) => (
  <span className="relative flex h-2 w-2 shrink-0 mt-1">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ backgroundColor: color }} />
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
  </span>
)

const Label = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <motion.p variants={{ hidden: enter, show: visible, out: exit }}
    className="text-[11px] uppercase tracking-[0.18em] mb-3 font-medium"
    style={{ color }}>
    {children}
  </motion.p>
)

const H2 = ({ children, color = 'white' }: { children: React.ReactNode; color?: string }) => (
  <motion.h2 variants={{ hidden: enter, show: visible, out: exit }}
    className="font-bold leading-[1.05] mb-5 max-w-xl"
    style={{ color, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
    {children}
  </motion.h2>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <motion.p variants={{ hidden: enter, show: visible, out: exit }}
    className="text-white/60 text-lg leading-relaxed max-w-md">
    {children}
  </motion.p>
)

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10 } },
  out: {},
}

export default function HandshakeOverlay({ state, transferComplete }: Props) {
  const key = transferComplete ? 'complete' : String(state)

  return (
    <div className="absolute inset-0 flex flex-col justify-end pb-16 pointer-events-none"
      style={{ paddingLeft: 'max(48px, 6vw)', paddingRight: 'max(48px, 6vw)' }}>
      <AnimatePresence mode="wait">
        {key === '1' && (
          <motion.div key="1" variants={container} initial="hidden" animate="show" exit="out"
            className="max-w-2xl">
            <Label color="#7B5CFF">SLOW OSCILLATION · 0.5Hz · CORTEX</Label>
            <H2>Your brain opens a window.</H2>
            <Body>
              Every 2 seconds during deep sleep, a slow wave sweeps through the cortex.
              For 500 milliseconds — the UP phase — the brain is maximally receptive.
              Memory can enter.
            </Body>
            <motion.div variants={{ hidden: { ...enter, transition: { delay: 0.4 } }, show: { ...visible, transition: { delay: 0.4, duration: 0.55, ease } }, out: exit }}
              className="inline-flex items-start gap-3 rounded-xl px-4 py-3 mt-5 max-w-sm hidden md:inline-flex"
              style={{ background: '#0E1018', border: '1px solid rgba(123,92,255,0.2)' }}>
              <PulsingDot color="#7B5CFF" />
              <p className="text-white/50 text-sm leading-relaxed">
                The window lasts exactly 500ms.<br />Miss it and the memory cannot transfer.
              </p>
            </motion.div>
          </motion.div>
        )}

        {key === '2' && (
          <motion.div key="2" variants={container} initial="hidden" animate="show" exit="out"
            className="max-w-2xl">
            <Label color="#FF4A62">WITHOUT LOCI · COUPLING FAILURE</Label>
            <H2>The spindle misses the window.</H2>
            <Body>
              The spindle arrives — but the window is closed. The memory trace reaches
              the center and finds nothing there. It retreats. Tonight, this memory is gone.
              Not stored somewhere you can&apos;t reach. Actually gone.
            </Body>
            <motion.div
              variants={{ hidden: { ...enter, transition: { delay: 0.5 } }, show: { ...visible, transition: { delay: 0.5, duration: 0.55, ease } }, out: exit }}
              className="rounded-xl px-4 py-3 mt-5 max-w-sm hidden md:block"
              style={{ background: 'rgba(255,74,98,0.05)', border: '1px solid rgba(255,74,98,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,74,98,0.8)' }}>
                This affects over 300 million with chronic sleep disorders (WHO, 2019). A single night without sleep reduces memory formation by approximately 40% (Yoo et al., 2007).
              </p>
            </motion.div>
          </motion.div>
        )}

        {key === '3' && (
          <motion.div key="3" variants={container} initial="hidden" animate="show" exit="out"
            className="max-w-2xl">
            <Label color="#C6FF00">WITH LOCI · COUPLING ACTIVE</Label>
            <H2>The handshake completes.</H2>
            <Body>
              Channel 1 detects the UP phase. Channel 2 induces the spindle within 100ms.
              The ripple nests inside the spindle. The memory trace travels the full path.
            </Body>
            <motion.div
              variants={{ hidden: { ...enter, transition: { delay: 0.3 } }, show: { ...visible, transition: { delay: 0.3, duration: 0.55, ease } }, out: exit }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mt-5"
              style={{ background: 'rgba(198,255,0,0.08)', border: '1px solid rgba(198,255,0,0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              <span className="text-[#C6FF00] text-xs uppercase tracking-widest">Transfer in progress</span>
            </motion.div>
          </motion.div>
        )}

        {key === 'complete' && (
          <motion.div key="complete" variants={container} initial="hidden" animate="show" exit="out"
            className="max-w-2xl">
            <Label color="#C6FF00">TRANSFER COMPLETE</Label>
            <motion.h2 variants={{ hidden: enter, show: visible, out: exit }}
              className="font-bold leading-[1.0] mb-5"
              style={{ color: '#C6FF00', fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}>
              Remember What Matters.
            </motion.h2>
            <Body>
              This is what Loci engineers every night for the memories that matter most to you.
              Three signals. One sequence. Every night.
            </Body>
            <motion.div variants={{ hidden: enter, show: visible, out: exit }}
              className="flex gap-8 mt-6 flex-wrap">
              {[
                { metric: '+8dB', label: 'Slow-wave amplitude increase' },
                { metric: '+10–20%', label: 'Recall improvement' },
                { metric: '< 100ms', label: 'Trigger accuracy' },
              ].map((s, i) => (
                <motion.div key={i}
                  variants={{ hidden: enter, show: { ...visible, transition: { delay: i * 0.12, duration: 0.55, ease } }, out: exit }}>
                  <span className="text-[#C6FF00] font-bold text-xl block">{s.metric}</span>
                  <span className="text-white/30 text-xs uppercase tracking-wider block mt-1">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.p
              variants={{ hidden: { ...enter, transition: { delay: 0.6 } }, show: { ...visible, transition: { delay: 0.6, duration: 0.55, ease } }, out: exit }}
              className="text-white/20 text-xs uppercase tracking-widest mt-5">
              Ngo et al. 2013 · Lustenberger 2016 · Staresina et al. 2023
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

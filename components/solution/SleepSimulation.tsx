'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INITIAL_STATE, EVENTS, tickToTime, type SimState } from './SimEngine'
import WaveColumn from './WaveColumn'
import TraceList from './TraceList'
import ScoreDisplay from './ScoreDisplay'

const ease = [0.16, 1, 0.3, 1] as const

export default function SleepSimulation() {
  const [simState, setSimState] = useState<SimState>({ ...INITIAL_STATE })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tickRef = useRef(0)

  const clearSim = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const startSimulation = useCallback(() => {
    clearSim()
    tickRef.current = 0
    setSimState({ ...INITIAL_STATE, phase: 'running', simulatedTime: tickToTime(0) })

    intervalRef.current = setInterval(() => {
      tickRef.current += 1
      const tick = tickRef.current

      setSimState(prev => {
        let next: SimState = {
          ...prev,
          tick,
          simulatedTime: tickToTime(tick),
          activeBadges: prev.activeBadges.filter(b => tick - b.startTick < 4),
        }
        const event = EVENTS[tick]
        if (event) next = event(next)
        if (tick >= 90) {
          clearSim()
          next = { ...next, phase: 'complete' }
        }
        return next
      })
    }, 1000)
  }, [clearSim])

  const resetSimulation = useCallback(() => {
    clearSim()
    tickRef.current = 0
    setSimState({ ...INITIAL_STATE })
  }, [clearSim])

  // Connect to external "Begin Simulation" button
  useEffect(() => {
    const btn = document.getElementById('sleep-sim-start')
    if (!btn) return
    const handler = () => startSimulation()
    btn.addEventListener('click', handler)
    return () => btn.removeEventListener('click', handler)
  }, [startSimulation])

  useEffect(() => () => clearSim(), [clearSim])

  const progress = (simState.tick / 90) * 100

  // Count consolidated memories per side
  const leftConsolidated = simState.traces.filter(t => t.leftStatus === 'consolidated').length
  const rightConsolidated = simState.traces.filter(t => t.rightStatus === 'consolidated' || t.rightStatus === 'partial').length

  return (
    <div className="bg-[#080A0F] w-full relative" id="simulation">
      {/* ── HEADER BAR ── */}
      <div className="grid grid-cols-3 items-center px-8 py-4 border-b border-white/5" style={{ height: 72 }}>
        <span className="text-white/30 text-xs uppercase tracking-[0.2em] text-left">
          Without Loci
        </span>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold text-white" style={{ fontSize: 24, fontVariantNumeric: 'tabular-nums' }}>
            {simState.simulatedTime}
          </span>
          <div className="w-48 h-0.5 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-[#C6FF00] rounded"
              style={{
                width: `${progress}%`,
                transition: 'width 0.9s linear',
              }}
            />
          </div>
        </div>
        <span className="text-[#C6FF00] text-xs uppercase tracking-[0.2em] text-right">
          With Loci
        </span>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 min-h-[500px]">

        {/* LEFT — WITHOUT LOCI */}
        <div className="bg-[#080A0F] px-6 pt-4 pb-6 flex flex-col gap-4">
          <WaveColumn side="left" simState={simState} />
          <TraceList traces={simState.traces} side="left" />
          <ScoreDisplay side="left" simState={simState} />
        </div>

        {/* Mobile divider label */}
        <div className="md:hidden border-t border-white/10 text-center py-4">
          <span className="text-[#C6FF00] text-xs uppercase tracking-widest">With Loci ↓</span>
        </div>

        {/* RIGHT — WITH LOCI */}
        <div className="px-6 pt-4 pb-6 flex flex-col gap-4" style={{ background: 'rgba(14,16,24,0.5)' }}>
          <WaveColumn side="right" simState={simState} />
          <TraceList traces={simState.traces} side="right" />
          <ScoreDisplay side="right" simState={simState} />
        </div>
      </div>

      {/* ── COMPLETE OVERLAY ── */}
      <AnimatePresence>
        {simState.phase === 'complete' && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-x-0 bottom-0 bg-[#080A0F] border-t border-white/10 py-16 px-8 z-30"
          >
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">

              {/* Final scores */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease }}
              >
                {/* Left score */}
                <div className="flex flex-col items-center">
                  <span className="font-bold leading-none" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', color: '#FF4A62' }}>
                    {simState.leftCP}
                  </span>
                  <span className="text-white/30 text-sm mt-1">1 / 6 memories</span>
                  <span className="text-white/20 text-xs uppercase tracking-widest mt-0.5">Without Loci</span>
                </div>

                {/* Divider */}
                <div className="w-20 h-px md:w-px md:h-20 bg-white/10" />

                {/* Right score */}
                <div className="flex flex-col items-center">
                  <span className="font-bold leading-none" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', color: '#C6FF00' }}>
                    {simState.rightCP}
                  </span>
                  <span className="text-white/60 text-sm mt-1">5 / 6 memories</span>
                  <span className="text-[#C6FF00] text-xs uppercase tracking-widest mt-0.5">With Loci</span>
                </div>
              </motion.div>

              {/* Headline lines */}
              <motion.div
                className="flex flex-col items-center"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
              >
                {[
                  { text: 'Same student. Same 6 hours. Same night.', cls: 'text-white/50 text-xl font-normal' },
                  { text: 'Remember What Matters.', cls: 'text-white font-bold mt-2', style: { fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' } },
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
                    className={line.cls}
                    style={line.style}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="flex flex-wrap justify-center gap-10 mt-8"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
              >
                {[
                  { metric: '+10–20%', label: 'Recall improvement' },
                  { metric: '+40–60%', label: 'UP phases detected' },
                  { metric: '< 100ms', label: 'Trigger accuracy' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                    className="flex flex-col items-center"
                  >
                    <span className="font-bold text-2xl" style={{ color: '#C6FF00' }}>{s.metric}</span>
                    <span className="text-white/25 text-[10px] uppercase tracking-wider mt-1 block max-w-[120px] text-center">{s.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Science footnote */}
              <motion.p
                className="text-white/15 text-xs uppercase tracking-[0.15em] mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                Ngo et al. 2013 · Ladenbauer 2017 · Loren Frank 2013
              </motion.p>

              {/* Restart */}
              <motion.button
                onClick={resetSimulation}
                className="mt-8 border border-white/10 text-white/30 text-sm rounded-xl px-6 py-3 hover:border-white/20 hover:text-white/50 transition-all duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                style={{ fontWeight: 500 }}
              >
                ↺ Run Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start screen — shown when phase is 'start' */}
      <AnimatePresence>
        {simState.phase === 'start' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-[#080A0F]/80 backdrop-blur-sm z-20"
          >
            <div className="text-center">
              <p className="text-white/20 text-sm uppercase tracking-widest mb-3">
                Click &ldquo;Begin Simulation&rdquo; above to start
              </p>
              <div className="w-px h-8 bg-white/10 mx-auto" />
              <span className="text-white/10 text-xs mt-3 block">↑</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

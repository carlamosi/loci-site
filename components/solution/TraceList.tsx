'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { Trace, TraceStatus } from './SimEngine'

interface Props {
  traces: Trace[]
  side: 'left' | 'right'
}

const statusDot: Record<TraceStatus, string> = {
  pending: 'bg-white/15',
  transferring: 'bg-[#C6FF00] animate-pulse',
  consolidated: 'bg-[#C6FF00]',
  partial: 'bg-white/30',
  lost: 'bg-[#FF4A62]',
}

const nameStyle: Record<TraceStatus, string> = {
  pending: 'text-white/40',
  transferring: 'text-white/80',
  consolidated: 'text-white/70',
  partial: 'text-white/30',
  lost: 'text-white/15 line-through',
}

const rightLabel: Record<TraceStatus, { text: string; cls: string }> = {
  pending: { text: '—', cls: 'text-white/15' },
  transferring: { text: 'Transferring...', cls: 'text-[#C6FF00] animate-pulse' },
  consolidated: { text: '', cls: 'text-[#C6FF00]' },
  partial: { text: 'Partial', cls: 'text-white/30' },
  lost: { text: 'Lost', cls: 'text-[#FF4A62]' },
}

const flashBg: Partial<Record<TraceStatus, string>> = {
  consolidated: 'rgba(198,255,0,0.05)',
  lost: 'rgba(255,74,98,0.05)',
}

export default function TraceList({ traces, side }: Props) {
  return (
    <div>
      <p className="text-white/20 text-[10px] uppercase tracking-widest mb-2">Memory Traces</p>
      <div className="flex flex-col">
        {traces.map(trace => {
          const status = side === 'left' ? trace.leftStatus : trace.rightStatus
          const consolidatedAt = side === 'left' ? trace.leftConsolidatedAt : trace.rightConsolidatedAt
          const label = rightLabel[status]
          const bg = flashBg[status] ?? 'transparent'

          return (
            <motion.div
              key={trace.id}
              layout
              animate={{ backgroundColor: bg }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between py-2.5 border-b border-white/5"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot[status]}`}
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm truncate ${nameStyle[status]}`}>{trace.name}</p>
                  {/* Encoding strength bar */}
                  {(status === 'pending' || status === 'consolidated') && (
                    <div className="mt-0.5">
                      <div className="h-px w-full bg-white/5 rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{
                            width: `${trace.encodingStrength}%`,
                            background: 'linear-gradient(to right, #7B5CFF, #C6FF00)',
                          }}
                        />
                      </div>
                      <p className="text-white/15 text-[9px] mt-0.5">
                        Encoding strength: {trace.encodingStrength}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`text-[11px] ml-3 flex-shrink-0 ${label.cls}`}
                >
                  {status === 'consolidated' && consolidatedAt ? consolidatedAt : label.text}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

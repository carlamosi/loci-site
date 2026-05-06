// ═══ FILE: components/solution/SimEngine.ts ═══
// Pure TypeScript — no React imports. Deterministic. No Math.random().

export type TraceStatus = 'pending' | 'transferring' | 'consolidated' | 'partial' | 'lost'

export type Trace = {
  id: number
  name: string
  encodingStrength: number
  leftStatus: TraceStatus
  rightStatus: TraceStatus
  leftConsolidatedAt?: string
  rightConsolidatedAt?: string
}

export type LociBadge = {
  id: number
  text: string
  color: 'acid' | 'cyan'
  startTick: number
}

export type SimState = {
  tick: number
  simulatedTime: string
  phase: 'start' | 'running' | 'complete'
  traces: Trace[]
  leftCP: number
  rightCP: number
  leftUpPhases: number
  rightUpPhases: number
  leftSpindleDensity: 'Low' | 'High'
  rightSpindleDensity: 'Low' | 'High'
  leftCoupling: string
  rightCoupling: string
  leftWaveHealth: number
  rightWaveHealth: number
  activeBadges: LociBadge[]
}

const BASE_TRACES: Omit<Trace, 'leftStatus' | 'rightStatus'>[] = [
  { id: 0, name: 'Statistics · Chapter 4', encodingStrength: 89 },
  { id: 1, name: 'Spanish vocabulary · Lesson 12', encodingStrength: 76 },
  { id: 2, name: 'Product design principles', encodingStrength: 82 },
  { id: 3, name: 'Organic chemistry reactions', encodingStrength: 61 },
  { id: 4, name: 'Historical dates · WWI', encodingStrength: 71 },
  { id: 5, name: 'Python functions · recursion', encodingStrength: 94 },
]

export const INITIAL_STATE: SimState = {
  tick: 0,
  simulatedTime: '11:00 PM',
  phase: 'start',
  traces: BASE_TRACES.map(t => ({ ...t, leftStatus: 'pending', rightStatus: 'pending' })),
  leftCP: 0,
  rightCP: 0,
  leftUpPhases: 0,
  rightUpPhases: 0,
  leftSpindleDensity: 'Low',
  rightSpindleDensity: 'Low',
  leftCoupling: '0 / 0',
  rightCoupling: '0 / 0',
  leftWaveHealth: 0.9,
  rightWaveHealth: 1.0,
  activeBadges: [],
}

export function tickToTime(tick: number): string {
  const totalMinutes = 2360 + tick * 4
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  const ampm = h >= 12 ? 'AM' : 'PM'
  const h12 = h % 12 || 12
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`
}

export const EVENTS: Record<number, (state: SimState) => SimState> = {
  8: s => ({
    ...s,
    rightCP: 8,
    rightUpPhases: 6,
    activeBadges: [...s.activeBadges, { id: 1, text: '⚡ Channel 1 · UP phase detected', color: 'acid', startTick: 8 }],
  }),
  10: s => ({
    ...s,
    activeBadges: [...s.activeBadges, { id: 2, text: '⚡ Channel 2 · Spindle induced · 87ms', color: 'acid', startTick: 10 }],
  }),
  15: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 0 ? { ...t, rightStatus: 'transferring' } : t),
  }),
  18: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 0 ? { ...t, rightStatus: 'consolidated', rightConsolidatedAt: '11:12 PM' } : t),
    rightCP: 16,
    rightUpPhases: 12,
  }),
  26: s => ({
    ...s,
    leftWaveHealth: 0.4,
    activeBadges: [...s.activeBadges, { id: 3, text: '⚠ Spindle gap · coupling missed', color: 'acid' as const, startTick: 26 }],
  }),
  35: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 1 ? { ...t, leftStatus: 'consolidated', leftConsolidatedAt: '01:20 AM' } : t),
    leftCP: 11,
    leftUpPhases: 9,
  }),
  42: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 1 ? { ...t, rightStatus: 'consolidated', rightConsolidatedAt: '01:48 AM' } : t),
    rightCP: 34,
    rightUpPhases: 26,
    activeBadges: [...s.activeBadges, { id: 4, text: '👃 Eucalyptus A · Lead Trace cued', color: 'cyan', startTick: 42 }],
  }),
  55: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 2 ? { ...t, rightStatus: 'consolidated', rightConsolidatedAt: '02:40 AM' } : t),
    rightCP: 52,
    rightUpPhases: 34,
  }),
  63: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 4 ? { ...t, rightStatus: 'consolidated', rightConsolidatedAt: '03:12 AM' } : t),
    rightCP: 67,
    rightUpPhases: 41,
  }),
  68: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 3 ? { ...t, leftStatus: 'consolidated', leftConsolidatedAt: '03:32 AM' } : t),
    leftCP: 24,
    leftUpPhases: 15,
  }),
  74: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 5 ? { ...t, rightStatus: 'consolidated', rightConsolidatedAt: '03:56 AM' } : t),
    rightCP: 79,
    rightUpPhases: 46,
  }),
  80: s => ({
    ...s,
    traces: s.traces.map(t =>
      [0, 2, 4, 5].includes(t.id) ? { ...t, leftStatus: 'lost' } : t
    ),
    leftCP: 29,
    leftWaveHealth: 0.2,
    leftSpindleDensity: 'Low',
    leftCoupling: '2 / 18',
    leftUpPhases: 18,
  }),
  83: s => ({
    ...s,
    traces: s.traces.map(t => t.id === 3 ? { ...t, rightStatus: 'partial', rightConsolidatedAt: '04:12 AM' } : t),
    rightCP: 89,
    rightSpindleDensity: 'High',
    rightCoupling: '41 / 47',
    rightUpPhases: 47,
  }),
  85: s => ({
    ...s,
    leftCP: 31,
    leftCoupling: '2 / 18',
    leftSpindleDensity: 'Low',
  }),
}

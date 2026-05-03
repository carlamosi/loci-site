'use client'
// ═══ FILE: components/BrainWaves.tsx ═══

interface BrainWavesProps {
  visible?: boolean
  compact?: boolean
}

export default function BrainWaves({ visible = true, compact = false }: BrainWavesProps) {
  const height = compact ? 24 : 40

  // Slow oscillation path - wide smooth sine
  const slowPath = `M0,${height / 2} C50,${height * 0.1} 100,${height * 0.9} 200,${height / 2} C250,${height * 0.1} 300,${height * 0.9} 400,${height / 2} C450,${height * 0.1} 500,${height * 0.9} 600,${height / 2} C650,${height * 0.1} 700,${height * 0.9} 800,${height / 2} C850,${height * 0.1} 900,${height * 0.9} 1000,${height / 2} C1050,${height * 0.1} 1100,${height * 0.9} 1200,${height / 2} C1250,${height * 0.1} 1300,${height * 0.9} 1400,${height / 2} C1450,${height * 0.1} 1500,${height * 0.9} 1600,${height / 2} C1650,${height * 0.1} 1700,${height * 0.9} 1800,${height / 2} C1850,${height * 0.1} 1900,${height * 0.9} 2000,${height / 2}`

  // Sleep spindle - tight clustered spikes
  const spindlePath = (() => {
    let d = `M0,${height / 2}`
    for (let i = 0; i <= 100; i++) {
      const x = i * 20
      // Create clusters of spikes every ~120px
      const cluster = Math.floor(x / 120)
      const posInCluster = x - cluster * 120
      let y = height / 2
      if (posInCluster > 20 && posInCluster < 80) {
        const spikeX = posInCluster - 50
        y = height / 2 - Math.sin((spikeX / 30) * Math.PI) * height * 0.4 * Math.sin((posInCluster - 20) / 60 * Math.PI)
      }
      d += ` L${x},${y}`
    }
    return d
  })()

  // Sharp-wave ripple - dense micro-oscillations
  const ripplePath = (() => {
    let d = `M0,${height / 2}`
    for (let i = 0; i <= 400; i++) {
      const x = i * 5
      const y = height / 2 + Math.sin(i * 1.2) * height * 0.15 * (Math.sin(i * 0.08) > 0.3 ? 1 : 0.2)
      d += ` L${x},${y}`
    }
    return d
  })()

  if (!visible) return null

  return (
    <div className="w-full overflow-hidden" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}>
      {/* Wave 1 - Slow Oscillation */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        {!compact && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs tracking-widest z-10 font-mono">
            SLOW OSCILLATION · 0.5Hz
          </span>
        )}
        <svg
          className="wave-slow absolute top-0 left-0"
          style={{ width: '200%', height: `${height}px` }}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow-violet">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={slowPath}
            stroke="#7B5CFF"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-violet)"
            opacity="0.8"
          />
          {/* Second copy for seamless loop */}
          <path
            d={slowPath}
            stroke="#7B5CFF"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-violet)"
            opacity="0.8"
            transform={`translate(1000, 0)`}
          />
        </svg>
      </div>

      {/* Wave 2 - Sleep Spindle */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        {!compact && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs tracking-widest z-10 font-mono">
            SLEEP SPINDLE · 12-15Hz
          </span>
        )}
        <svg
          className="wave-mid absolute top-0 left-0"
          style={{ width: '200%', height: `${height}px` }}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow-coral">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={spindlePath}
            stroke="#FF4A62"
            strokeWidth="1"
            fill="none"
            filter="url(#glow-coral)"
            opacity="0.8"
          />
          <path
            d={spindlePath}
            stroke="#FF4A62"
            strokeWidth="1"
            fill="none"
            filter="url(#glow-coral)"
            opacity="0.8"
            transform="translate(1000, 0)"
          />
        </svg>
      </div>

      {/* Wave 3 - Sharp-Wave Ripple */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        {!compact && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs tracking-widest z-10 font-mono">
            SHARP-WAVE RIPPLE · 80-120Hz
          </span>
        )}
        <svg
          className="wave-fast absolute top-0 left-0"
          style={{ width: '200%', height: `${height}px` }}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={ripplePath}
            stroke="#00D4FF"
            strokeWidth="0.5"
            fill="none"
            filter="url(#glow-cyan)"
            opacity="0.8"
          />
          <path
            d={ripplePath}
            stroke="#00D4FF"
            strokeWidth="0.5"
            fill="none"
            filter="url(#glow-cyan)"
            opacity="0.8"
            transform="translate(1000, 0)"
          />
        </svg>
      </div>
    </div>
  )
}

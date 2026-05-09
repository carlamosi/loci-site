'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimate, stagger, AnimatePresence } from 'framer-motion'

const rings = [
  { id: 'slow-wave', label: 'Slow Wave', desc: 'Door opens', color: '#7B5CFF', size: 260, z: 120 },
  { id: 'spindle', label: 'Spindle', desc: 'Package sent', color: '#FF4A62', size: 160, z: 60 },
  { id: 'ripple', label: 'Ripple', desc: 'Memory carried', color: '#00D4FF', size: 60, z: 0 },
]

export default function HandshakeDiagram() {
  const [scope, animate] = useAnimate()
  const [activeStage, setActiveStage] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true
    const runSequence = async () => {
      // Small pause before starting
      await new Promise(r => setTimeout(r, 500))

      while (isMounted) {
        // Reset
        setActiveStage(null)
        await animate(".packet", { z: 220, opacity: 0, scale: 0.5 }, { duration: 0 })
        await animate(".ring", { borderColor: "rgba(255,255,255,0.05)", boxShadow: "0 0 0px transparent inset" }, { duration: 0 })
        await animate(".core-flash", { opacity: 0, scale: 0.5 }, { duration: 0 })
        await animate(".ring-glass", { opacity: 0.1 }, { duration: 0 })

        // 1. Packet appears at the top
        await animate(".packet", { opacity: 1, scale: 1 }, { duration: 0.4, ease: "easeOut" })
        
        // 2. Drops to Ring 0 (Slow Wave)
        setActiveStage(0)
        animate(".ring-0", { borderColor: rings[0].color, boxShadow: `0 0 40px ${rings[0].color}40 inset, 0 0 40px ${rings[0].color}40` }, { duration: 0.3 })
        animate(".ring-glass-0", { opacity: 0.3, backgroundColor: `${rings[0].color}10` }, { duration: 0.3 })
        await animate(".packet", { z: rings[0].z }, { duration: 0.6, ease: "easeIn" })

        // 3. Drops to Ring 1 (Spindle)
        setActiveStage(1)
        animate(".ring-1", { borderColor: rings[1].color, boxShadow: `0 0 40px ${rings[1].color}50 inset, 0 0 40px ${rings[1].color}50` }, { duration: 0.3 })
        animate(".ring-glass-1", { opacity: 0.4, backgroundColor: `${rings[1].color}15` }, { duration: 0.3 })
        await animate(".packet", { z: rings[1].z }, { duration: 0.5, ease: "linear" })

        // 4. Drops to Ring 2 (Ripple)
        setActiveStage(2)
        animate(".ring-2", { borderColor: rings[2].color, boxShadow: `0 0 40px ${rings[2].color}60 inset, 0 0 40px ${rings[2].color}60` }, { duration: 0.3 })
        animate(".ring-glass-2", { opacity: 0.5, backgroundColor: `${rings[2].color}20` }, { duration: 0.3 })
        await animate(".packet", { z: rings[2].z }, { duration: 0.4, ease: "easeOut" })

        // 5. Transfer Complete! (The Flash)
        setActiveStage(3)
        animate(".packet", { scale: 3, opacity: 0 }, { duration: 0.2 })
        animate(".core-flash", { opacity: 1, scale: [1, 2.5, 1.5] }, { duration: 0.6, ease: "easeOut" })
        
        // Rings explode outward slightly and fade
        animate(".ring", { scale: 1.1, opacity: 0 }, { duration: 0.8, delay: stagger(0.1, { startDelay: 0.2 }) })

        // Wait on the success state
        await new Promise(r => setTimeout(r, 2500))

        // Restore rings for the next loop
        await animate(".ring", { scale: 1, opacity: 1, borderColor: "rgba(255,255,255,0.05)", boxShadow: "0 0 0px transparent inset" }, { duration: 0.6 })
      }
    }
    
    runSequence()
    return () => { isMounted = false }
  }, [animate])

  return (
    <div ref={scope} className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full min-h-[400px]">
      
      {/* ── 3D ISOMETRIC SCENE ── */}
      <div 
        className="relative w-[300px] h-[300px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-1000"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(-45deg)' }}
        >
          
          {/* Base Grid Plane (For isometric grounding) */}
          <div 
            className="absolute w-[600px] h-[600px]"
            style={{
              transform: 'translateZ(-80px)',
              background: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)'
            }}
          />

          {/* Central Beam Line */}
          <div 
            className="absolute w-px bg-gradient-to-b from-white/0 via-white/20 to-acid/40"
            style={{ height: '300px', transform: 'translateZ(60px) rotateX(90deg)' }}
          />

          {/* The Nested Rings */}
          {rings.map((ring, i) => (
            <motion.div 
              key={ring.id}
              className={`ring ring-${i} absolute rounded-full border-[2px] border-white/5 flex items-center justify-center`}
              style={{ width: ring.size, height: ring.size, z: ring.z }}
            >
              {/* Glassmorphic inner fill */}
              <motion.div 
                className={`ring-glass ring-glass-${i} w-full h-full rounded-full backdrop-blur-[2px] opacity-10`}
                style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              />
            </motion.div>
          ))}

          {/* The Falling Memory Packet */}
          <motion.div 
            className="packet absolute w-5 h-5 rounded-full bg-white"
            style={{ z: 220, opacity: 0, filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.9))' }}
          >
            {/* Core trail/glow */}
            <div className="absolute inset-0 rounded-full bg-white blur-[4px] scale-150" />
          </motion.div>

          {/* The Success Core Flash */}
          <motion.div 
            className="core-flash absolute w-48 h-48 rounded-full bg-acid/30 blur-[40px]"
            style={{ z: 0, opacity: 0 }}
          />
        </div>
      </div>

      {/* ── SIDE PANEL HUD ── */}
      <div className="flex flex-col gap-4 w-full max-w-[280px]">
        {rings.map((ring, i) => {
          const isActive = activeStage === i
          const isPassed = activeStage !== null && activeStage > i
          
          return (
            <div 
              key={ring.id}
              className={`relative p-4 rounded-xl border transition-all duration-500 overflow-hidden ${
                isActive 
                  ? 'bg-white/10 border-white/30 shadow-lg scale-105' 
                  : isPassed
                    ? 'bg-white/5 border-white/10 opacity-60'
                    : 'bg-white/5 border-white/5 opacity-40'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 opacity-20 blur-xl pointer-events-none"
                  style={{ backgroundColor: ring.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}
              
              <div className="flex items-center gap-3 relative z-10">
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${isActive || isPassed ? 'scale-100' : 'scale-50'}`}
                  style={{ backgroundColor: isActive || isPassed ? ring.color : '#ffffff33', boxShadow: isActive ? `0 0 10px ${ring.color}` : 'none' }}
                />
                <div className="flex flex-col text-left">
                  <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {ring.label}
                  </span>
                  <span className={`text-xs transition-colors duration-300 ${isActive ? 'text-white/80' : 'text-white/30'}`}>
                    {ring.desc}
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Transfer Complete Status */}
        <div className="h-12 mt-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeStage === 3 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-6 py-2 rounded-full bg-acid/20 border border-acid/50 text-acid font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(198,255,0,0.3)]"
              >
                Transfer Complete
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

'use client'
// ═══ FILE: components/Footer.tsx ═══
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Solution', href: '/solution' },
  { label: 'Science', href: '/science' },
  { label: 'Prototype', href: '/prototype' },
  { label: 'About', href: '/about' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left — Brand */}
          <div>
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-lg">〰 Loci</span>
              <span className="text-acid font-bold text-lg">.</span>
            </div>
            <p className="text-violet text-xs uppercase tracking-widest mt-2 font-medium">
              Remember What Matters.
            </p>
            <p className="text-white/40 text-sm mt-3 max-w-xs leading-relaxed">
              A 24-hour memory consolidation system. Not less sleep — denser consolidation.
            </p>
          </div>

          {/* Center — Links */}
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 text-sm hover:text-white/70 transition-colors duration-200 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Info */}
          <div className="md:text-right">
            <p className="text-white/30 text-xs">A Moonshot Project · 2026</p>
            <p className="text-white/20 text-xs mt-2">University memory consolidation system</p>
            <p className="text-white/20 text-xs mt-1">Targeting civilizational-scale learning loss</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/20 text-xs">
            © 2026 Loci. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

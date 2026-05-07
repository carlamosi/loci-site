import '../styles/globals.css'
import type { Metadata, Viewport } from 'next'
import RootClientShell from '@/components/RootClientShell'

export const metadata: Metadata = {
  title: 'Loci - Memory Consolidation System',
  description:
    "Loci is a 24-hour memory consolidation system for university students. Not less sleep - denser consolidation. Remember What Matters.",
  applicationName: 'Loci',
  icons: {
    icon: [{ url: '/favicon-v2.svg', type: 'image/svg+xml' }],
    shortcut: [{ url: '/favicon-v2.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#080A0F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootClientShell>{children}</RootClientShell>
      </body>
    </html>
  )
}

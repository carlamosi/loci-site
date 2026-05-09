import '../styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import RootClientShell from '@/components/RootClientShell'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Loci - Memory Consolidation System',
  description:
    "Loci is a 24-hour memory consolidation system for university students. Not less sleep - denser consolidation. Remember What Matters.",
  applicationName: 'Loci',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#080A0F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans`}>
        <RootClientShell>{children}</RootClientShell>
      </body>
    </html>
  )
}

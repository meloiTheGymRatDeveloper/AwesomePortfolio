import type { Metadata } from 'next'
import './globals.css'
import { StarCanvas } from '@/components/grimoire/StarCanvas'
import { Particles } from '@/components/grimoire/Particles'

export const metadata: Metadata = {
  title: 'The Chosen One',
  description: 'A magical classroom recitation randomizer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        {/* Candlelight glow */}
        <div
          aria-hidden="true"
          className="fixed bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-[1] animate-candle-flicker"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(200,169,107,0.13) 0%, transparent 70%)',
          }}
        />
        <StarCanvas />
        <Particles />
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  )
}

import { ReactNode } from 'react'

interface GrimoireCardProps {
  children: ReactNode
  className?: string
}

export function GrimoireCard({ children, className = '' }: GrimoireCardProps) {
  return (
    <div
      className={`relative bg-gradient-to-br from-[#f9f3ea] via-parchment to-[#ede3d4] border border-gold rounded-sm shadow-[0_4px_40px_rgba(200,169,107,0.13),inset_0_1px_0_rgba(255,255,255,0.53)] ${className}`}
    >
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <span aria-hidden="true" className="absolute top-2 left-2.5 text-gold/50 text-lg leading-none select-none">❧</span>
      <span aria-hidden="true" className="absolute top-2 right-2.5 text-gold/50 text-lg leading-none select-none [transform:scaleX(-1)]">❧</span>
      <span aria-hidden="true" className="absolute bottom-2 left-2.5 text-gold/50 text-lg leading-none select-none [transform:scaleY(-1)]">❧</span>
      <span aria-hidden="true" className="absolute bottom-2 right-2.5 text-gold/50 text-lg leading-none select-none [transform:scale(-1)]">❧</span>
      {children}
    </div>
  )
}

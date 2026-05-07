'use client'

interface RevealCardProps {
  name: string
  onCorrect: () => void
  onSkip: () => void
  isLoading: boolean
}

export function RevealCard({ name, onCorrect, onSkip, isLoading }: RevealCardProps) {
  return (
    <div className="animate-reveal-in w-full max-w-sm">
      {/* Reveal box */}
      <div
        className="relative border border-gold rounded-sm px-6 py-4 text-center mb-4"
        style={{
          background: 'linear-gradient(135deg, #2a1f14, #1a1410)',
          boxShadow: '0 4px 32px rgba(200,169,107,0.2)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-2 left-1/2 -translate-x-1/2 font-cinzel text-gold text-[9px] tracking-[4px] whitespace-nowrap px-2"
          style={{ background: '#2a1f14' }}
        >
          ⬡ ✦ ⬡
        </div>
        <p className="font-cinzel text-[9px] tracking-[5px] uppercase text-gold/70 mb-1">
          The Fates Have Spoken
        </p>
        <p aria-live="polite" className="font-cormorant italic text-2xl font-light text-[#f5ead8] tracking-wide">
          <span aria-hidden="true">✦ </span>{name}<span aria-hidden="true"> ✦</span>
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onCorrect}
          disabled={isLoading}
          className="font-cinzel text-[10px] tracking-[2px] uppercase border border-moss text-moss px-5 py-2 rounded-sm transition-all duration-200 hover:bg-moss hover:text-parchment disabled:opacity-50"
        >
          <span aria-hidden="true">✓ </span>Answered Correctly
        </button>
        <button
          onClick={onSkip}
          disabled={isLoading}
          className="font-cinzel text-[10px] tracking-[2px] uppercase border border-burgundy text-burgundy px-5 py-2 rounded-sm transition-all duration-200 hover:bg-burgundy hover:text-parchment disabled:opacity-50"
        >
          <span aria-hidden="true">↩ </span>Skip
        </button>
      </div>
    </div>
  )
}

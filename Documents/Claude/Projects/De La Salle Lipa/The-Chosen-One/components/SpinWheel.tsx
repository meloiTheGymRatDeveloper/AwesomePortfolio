'use client'

interface SpinWheelProps {
  isSpinning: boolean
  disabled: boolean
  onCast: () => void
}

export function SpinWheel({ isSpinning, disabled, onCast }: SpinWheelProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-56 h-56">

        {/* Rune ring */}
        <div
          className="absolute rounded-full border border-gold/30 animate-rune-spin"
          style={{ inset: '-14px' }}
        >
          <span aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-[7px] tracking-[5px] whitespace-nowrap">
            ✦ ✧ ⬡ ✦ ✧ ⬡ ✦ ✧ ⬡
          </span>
        </div>

        {/* Wheel */}
        <div
          aria-hidden="true"
          className={`w-56 h-56 rounded-full ${isSpinning ? 'animate-wheel-spin' : 'animate-idle-glow'}`}
          style={{
            background: 'conic-gradient(#24324A 0deg 45deg, #C8A96B 45deg 90deg, #5C7A7A 90deg 135deg, #6A2E35 135deg 180deg, #6E7554 180deg 225deg, #A89BC7 225deg 270deg, #24324A 270deg 315deg, #C8A96B 315deg 360deg)',
            boxShadow: '0 0 0 3px #F4EBDD, 0 0 0 5px #C8A96B, 0 8px 40px rgba(36,50,74,0.27)',
          }}
        />

        {/* Hub */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-parchment rounded-full border-2 border-gold flex items-center justify-center text-xl shadow-[0_2px_12px_rgba(200,169,107,0.27)]">
            🎩
          </div>
        </div>

        {/* Pointer */}
        <div
          aria-hidden="true"
          className="absolute -top-5 left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '24px solid #C8A96B',
            filter: 'drop-shadow(0 2px 4px rgba(200,169,107,0.53))',
          }}
        />
      </div>

      <button
        onClick={onCast}
        disabled={disabled || isSpinning}
        className="font-cinzel text-xs font-semibold tracking-[4px] uppercase text-parchment bg-navy border border-gold px-8 py-3 rounded-sm transition-all duration-300 shadow-[0_2px_16px_rgba(36,50,74,0.2)] hover:shadow-[0_4px_24px_rgba(200,169,107,0.27)] hover:bg-[#1a273a] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ✦ &nbsp;Cast the Spell&nbsp; ✦
      </button>
    </div>
  )
}

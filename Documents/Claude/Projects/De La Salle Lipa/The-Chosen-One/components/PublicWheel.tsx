'use client'
import { useState, useRef } from 'react'
import { ANIME_NAMES } from '@/lib/anime-names'
import { SpinWheel } from '@/components/SpinWheel'
import { RevealCard } from '@/components/RevealCard'
import { GrimoireCard } from '@/components/grimoire/GrimoireCard'
import { OrnamentDivider } from '@/components/grimoire/OrnamentDivider'

export function PublicWheel() {
  const [remaining, setRemaining] = useState<string[]>([...ANIME_NAMES])
  const [isSpinning, setIsSpinning] = useState(false)
  const [pickedName, setPickedName] = useState<string | null>(null)
  const pickedRef = useRef<string | null>(null)

  const handleCast = () => {
    if (remaining.length === 0) return
    setIsSpinning(true)
    setPickedName(null)

    const pool = remaining.length > 0 ? remaining : [...ANIME_NAMES]
    const idx = Math.floor(Math.random() * pool.length)
    const name = pool[idx]
    pickedRef.current = name

    setTimeout(() => {
      setIsSpinning(false)
      setPickedName(pickedRef.current)
    }, 4000)
  }

  const handleSkip = () => {
    setPickedName(null)
  }

  const handleNext = () => {
    if (!pickedName) return
    const next = remaining.filter(n => n !== pickedName)
    setRemaining(next.length === 0 ? [...ANIME_NAMES] : next)
    setPickedName(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-cinzel text-[10px] tracking-[6px] uppercase text-gold block mb-2">
          ✦ &nbsp;Portfolio Demo&nbsp; ✦
        </span>
        <h1 className="font-cinzel text-4xl font-bold text-navy tracking-wide">
          The Chosen One
        </h1>
        <p className="font-cormorant italic text-lg text-ink-soft mt-2 opacity-80">
          Let the stars decide who speaks today
        </p>
      </div>

      <OrnamentDivider text="✦ &nbsp;Summon the Apprentice&nbsp; ✦" />

      <GrimoireCard className="p-8 mt-6">
        <div className="flex flex-col items-center gap-6">
          <SpinWheel
            isSpinning={isSpinning}
            disabled={remaining.length === 0}
            onCast={handleCast}
          />

          {pickedName && (
            <RevealCard
              name={pickedName}
              onCorrect={handleNext}
              onSkip={handleSkip}
              isLoading={false}
            />
          )}

          <p className="font-garamond italic text-sm text-ink-soft/60 mt-2">
            {remaining.length} of {ANIME_NAMES.length} apprentices remaining
          </p>
        </div>
      </GrimoireCard>

      <div className="text-center mt-8">
        <p className="font-cormorant italic text-sm text-ink-soft/50">
          This is a public demo. Student names shown are fictional anime characters.
        </p>
      </div>
    </div>
  )
}

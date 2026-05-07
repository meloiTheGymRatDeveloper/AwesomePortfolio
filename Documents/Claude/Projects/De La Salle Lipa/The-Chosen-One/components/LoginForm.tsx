'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { GrimoireCard } from '@/components/grimoire/GrimoireCard'

export function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        setPassword('')
        setError('The grimoire does not recognize you.')
        setLoading(false)
      }
    } catch {
      setError('A spell failure occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-cinzel text-[10px] tracking-[6px] uppercase text-gold block mb-3">
            ✦ &nbsp;Restricted&nbsp; ✦
          </span>
          <h1 className="font-cinzel text-3xl font-bold text-navy">The Atelier</h1>
          <p className="font-cormorant italic text-base text-ink-soft mt-2 opacity-70">
            Enter the warden's incantation
          </p>
        </div>

        <GrimoireCard className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Incantation…"
              autoComplete="current-password"
              className="font-garamond text-base bg-white/40 border border-gold/40 rounded-sm px-3 py-2.5 text-ink placeholder-[#9a8070] placeholder:italic outline-none focus:border-gold focus:bg-white/70 transition-colors"
              autoFocus
            />

            {error && (
              <p role="alert" className="font-cormorant italic text-sm text-burgundy text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="font-cinzel text-[10px] tracking-[4px] uppercase text-parchment bg-navy border border-gold py-3 rounded-sm transition-all duration-200 hover:bg-[#1a273a] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Opening…' : <><span aria-hidden="true">✦ </span>Open the Grimoire<span aria-hidden="true"> ✦</span></>}
            </button>
          </form>
        </GrimoireCard>
      </div>
    </div>
  )
}

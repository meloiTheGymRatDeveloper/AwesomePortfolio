'use client'
import { useState } from 'react'
import type { Student } from '@/lib/types'

interface StudentSidebarProps {
  students: Student[]
  onAdd: (name: string) => Promise<void>
  onRemove: (id: string) => void
  onReset: () => void
  hasActiveStudents: boolean
}

export function StudentSidebar({ students, onAdd, onRemove, onReset, hasActiveStudents }: StudentSidebarProps) {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const handleAdd = async () => {
    if (!name.trim()) return
    setSaving(true)
    await onAdd(name.trim())
    setName('')
    setSaving(false)
  }

  const active = students.filter(s => !s.removed).length

  return (
    <div
      className="w-72 border border-gold/50 rounded-sm p-5 flex flex-col gap-3 relative"
      style={{ background: 'linear-gradient(160deg, #f9f3ea, #F4EBDD)' }}
    >
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="font-cinzel text-[10px] tracking-[4px] uppercase text-navy text-center">
        <span aria-hidden="true">✦ </span><span className="text-gold">Apprentices</span><span aria-hidden="true"> ✦</span>
      </div>

      <p aria-live="polite" className="font-cormorant italic text-sm text-ink-soft/70 text-center">
        {active} remaining of {students.length}
      </p>

      {/* Student list */}
      <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1" role="list" aria-label="Apprentices">
        {students.length === 0 && (
          <p className="font-garamond italic text-sm text-ink-soft/50 text-center py-4">
            No apprentices yet.
          </p>
        )}
        {students.map(s => (
          <div
            key={s.id}
            role="listitem"
            className="group flex items-center justify-between bg-white/40 border border-gold/20 rounded-sm px-2.5 py-1.5 transition-colors hover:bg-gold/10"
          >
            <span
              className={`font-garamond text-sm ${
                s.removed ? 'line-through text-moss/60 italic' : 'text-navy'
              }`}
            >
              {s.name}
              {s.removed && <span aria-label="answered" className="ml-1 text-moss text-xs">✓</span>}
            </span>
            <button
              onClick={() => onRemove(s.id)}
              aria-label={`Remove ${s.name} permanently`}
              className="text-burgundy/40 text-xs hover:text-burgundy hidden group-hover:block ml-2 leading-none"
            >
              <span aria-hidden="true">🗑</span>
            </button>
          </div>
        ))}
      </div>

      {/* Add student */}
      <div className="flex gap-1.5 mt-1">
        <label htmlFor="add-student-name" className="sr-only">Add apprentice</label>
        <input
          id="add-student-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add apprentice…"
          className="flex-1 font-garamond text-sm bg-white/50 border border-gold/40 rounded-sm px-2.5 py-1.5 text-ink placeholder:italic placeholder-[#9a8070] outline-none focus:border-gold"
        />
        <button
          onClick={handleAdd}
          disabled={saving || !name.trim()}
          aria-label="Add apprentice"
          className="font-cinzel text-sm bg-navy border border-gold text-parchment px-3 rounded-sm hover:bg-[#1a273a] disabled:opacity-50 transition-colors"
        >
          +
        </button>
      </div>

      {/* Reset */}
      {confirmReset ? (
        <div className="flex gap-2 items-center justify-center">
          <span className="font-garamond text-xs text-ink-soft/70">Reset all students?</span>
          <button
            onClick={() => { onReset(); setConfirmReset(false) }}
            className="font-cinzel text-[9px] text-burgundy hover:underline"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirmReset(false)}
            className="font-cinzel text-[9px] text-gold hover:underline"
          >
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmReset(true)}
          disabled={!students.length}
          className="w-full font-cinzel text-[9px] tracking-[3px] uppercase bg-transparent border border-gold text-gold py-2 rounded-sm hover:bg-gold hover:text-navy transition-all duration-200 disabled:opacity-30"
        >
          <span aria-hidden="true">↺ </span>Reset the Circle
        </button>
      )}
    </div>
  )
}

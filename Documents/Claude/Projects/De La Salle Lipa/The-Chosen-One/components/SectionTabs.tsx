'use client'
import { useState } from 'react'
import type { Section } from '@/lib/types'

interface SectionTabsProps {
  sections: Section[]
  activeSectionId: string | null
  onSelect: (id: string) => void
  onAdd: (name: string) => Promise<void>
  onDelete: (id: string) => void
}

export function SectionTabs({ sections, activeSectionId, onSelect, onAdd, onDelete }: SectionTabsProps) {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleAdd = async () => {
    if (!newName.trim()) return
    setSaving(true)
    await onAdd(newName.trim())
    setNewName('')
    setAdding(false)
    setSaving(false)
  }

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      {sections.map(s => (
        <div key={s.id} className="relative group">
          <button
            onClick={() => onSelect(s.id)}
            aria-pressed={activeSectionId === s.id}
            className={`font-cinzel text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
              activeSectionId === s.id
                ? 'bg-navy text-parchment border-gold'
                : 'bg-transparent text-ink-soft border-gold/40 hover:border-gold hover:bg-gold/10'
            }`}
          >
            {s.name}
          </button>
          {confirmDelete === s.id ? (
            <div className="absolute top-full left-0 mt-1 bg-navy border border-gold/40 rounded-sm p-2 z-10 whitespace-nowrap flex gap-2">
              <span className="font-garamond text-xs text-parchment/70 mr-1">Delete?</span>
              <button
                onClick={() => { onDelete(s.id); setConfirmDelete(null) }}
                className="font-cinzel text-[9px] text-burgundy hover:underline"
              >Yes</button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="font-cinzel text-[9px] text-gold hover:underline"
              >No</button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(s.id)}
              aria-label={`Delete ${s.name}`}
              className="absolute -top-1 -right-1 w-4 h-4 bg-burgundy/80 rounded-full text-parchment text-[9px] hidden group-hover:flex items-center justify-center hover:bg-burgundy"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      ))}

      {adding ? (
        <div className="flex gap-1">
          <label htmlFor="new-section-name" className="sr-only">New section name</label>
          <input
            id="new-section-name"
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Section name…"
            autoFocus
            className="font-garamond text-sm bg-white/40 border border-gold/50 rounded-sm px-2 py-1.5 text-ink placeholder:italic outline-none focus:border-gold w-36"
          />
          <button
            onClick={handleAdd}
            disabled={saving || !newName.trim()}
            className="font-cinzel text-[9px] text-navy border border-gold/50 px-2 py-1 rounded-sm hover:bg-gold/10 disabled:opacity-50"
          >
            Add
          </button>
          <button
            onClick={() => { setAdding(false); setNewName('') }}
            className="font-cinzel text-[9px] text-ink-soft border border-gold/30 px-2 py-1 rounded-sm hover:bg-gold/5"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="font-cinzel text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-sm border border-dashed border-gold/50 text-gold hover:border-gold transition-colors"
        >
          + New Section
        </button>
      )}
    </div>
  )
}

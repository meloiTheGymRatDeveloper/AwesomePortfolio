'use client'
import { useState, useRef, useEffect } from 'react'
import type { Section, Student } from '@/lib/types'
import { SectionTabs } from '@/components/SectionTabs'
import { StudentSidebar } from '@/components/StudentSidebar'
import { SpinWheel } from '@/components/SpinWheel'
import { RevealCard } from '@/components/RevealCard'
import { GrimoireCard } from '@/components/grimoire/GrimoireCard'
import { OrnamentDivider } from '@/components/grimoire/OrnamentDivider'

interface AdminDashboardProps {
  initialSections: Section[]
  initialStudents: Student[]
}

export function AdminDashboard({ initialSections, initialStudents }: AdminDashboardProps) {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    initialSections[0]?.id ?? null
  )
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isSpinning, setIsSpinning] = useState(false)
  const [pickedStudent, setPickedStudent] = useState<Student | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [allSpokenMsg, setAllSpokenMsg] = useState(false)
  const autoResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (autoResetTimerRef.current) clearTimeout(autoResetTimerRef.current)
    }
  }, [])

  const activeStudents = students.filter(s => !s.removed)

  const switchSection = async (id: string) => {
    if (autoResetTimerRef.current) {
      clearTimeout(autoResetTimerRef.current)
      autoResetTimerRef.current = null
      setAllSpokenMsg(false)
    }
    setActiveSectionId(id)
    setPickedStudent(null)
    const res = await fetch(`/api/sections/${id}/students`)
    if (res.ok) setStudents(await res.json())
  }

  const addSection = async (name: string) => {
    const res = await fetch('/api/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      const section: Section = await res.json()
      setSections(prev => [...prev, section])
      await switchSection(section.id)
    }
  }

  const deleteSection = async (id: string) => {
    if (isSpinning) return
    await fetch(`/api/sections/${id}`, { method: 'DELETE' })
    const next = sections.filter(s => s.id !== id)
    setSections(next)
    if (activeSectionId === id) {
      const fallback = next[0]?.id ?? null
      setActiveSectionId(fallback)
      if (fallback) {
        const res = await fetch(`/api/sections/${fallback}/students`)
        if (res.ok) setStudents(await res.json())
      } else {
        setStudents([])
      }
    }
    setPickedStudent(null)
  }

  const handleCast = async () => {
    if (isSpinning || !activeSectionId || activeStudents.length === 0) return
    setIsSpinning(true)
    setPickedStudent(null)

    try {
      const [spinRes] = await Promise.all([
        fetch(`/api/sections/${activeSectionId}/spin`, { method: 'POST' }).then(r => r.json()),
        new Promise(resolve => setTimeout(resolve, 4000)),
      ])
      setPickedStudent(spinRes)
    } finally {
      setIsSpinning(false)
    }
  }

  const handleCorrect = async () => {
    if (!pickedStudent) return
    setActionLoading(true)
    try {
      await fetch(`/api/students/${pickedStudent.id}/correct`, { method: 'PATCH' })
      const updated = students.map(s =>
        s.id === pickedStudent.id ? { ...s, removed: true } : s
      )
      setStudents(updated)
      setPickedStudent(null)

      // Auto-reset if pool is now empty
      const stillActive = updated.filter(s => !s.removed).length
      if (stillActive === 0 && activeSectionId) {
        setAllSpokenMsg(true)
        autoResetTimerRef.current = setTimeout(async () => {
          await fetch(`/api/sections/${activeSectionId}/reset`, { method: 'POST' })
          setStudents(prev => prev.map(s => ({ ...s, removed: false })))
          setAllSpokenMsg(false)
          autoResetTimerRef.current = null
        }, 2500)
      }
    } finally {
      setActionLoading(false)
    }
  }

  const handleSkip = () => setPickedStudent(null)

  const addStudent = async (name: string) => {
    if (!activeSectionId) return
    const res = await fetch(`/api/sections/${activeSectionId}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      const student: Student = await res.json()
      setStudents(prev => [...prev, student].sort((a, b) => a.name.localeCompare(b.name)))
    }
  }

  const removeStudent = async (id: string) => {
    await fetch(`/api/students/${id}`, { method: 'DELETE' })
    setStudents(prev => prev.filter(s => s.id !== id))
    if (pickedStudent?.id === id) setPickedStudent(null)
  }

  const resetSection = async () => {
    if (!activeSectionId) return
    await fetch(`/api/sections/${activeSectionId}/reset`, { method: 'POST' })
    setStudents(prev => prev.map(s => ({ ...s, removed: false })))
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-cinzel text-[10px] tracking-[6px] uppercase text-gold block mb-2">
          De La Salle Lipa &nbsp;·&nbsp; College of Information Technology
        </span>
        <h1 className="font-cinzel text-4xl font-bold text-navy tracking-wide">
          The Chosen One
        </h1>
        <p className="font-cormorant italic text-lg text-ink-soft mt-2 opacity-80">
          Let the stars decide who speaks today
        </p>
      </div>

      <OrnamentDivider text="✦ &nbsp;Summon the Apprentice&nbsp; ✦" />

      {/* Section tabs */}
      <SectionTabs
        sections={sections}
        activeSectionId={activeSectionId}
        onSelect={switchSection}
        onAdd={addSection}
        onDelete={deleteSection}
      />

      {/* Main layout */}
      <div className="flex gap-6 items-start">
        <GrimoireCard className="flex-1 p-8">
          <div className="flex flex-col items-center gap-6">
            <SpinWheel
              isSpinning={isSpinning}
              disabled={!activeSectionId || activeStudents.length === 0}
              onCast={handleCast}
            />

            {allSpokenMsg && (
              <div aria-live="polite" className="animate-reveal-in font-cormorant italic text-lg text-gold text-center">
                All apprentices have spoken <span aria-hidden="true">✦</span>
              </div>
            )}

            {pickedStudent && !allSpokenMsg && (
              <RevealCard
                name={pickedStudent.name}
                onCorrect={handleCorrect}
                onSkip={handleSkip}
                isLoading={actionLoading}
              />
            )}

            {!activeSectionId && (
              <p className="font-cormorant italic text-sm text-ink-soft/50 text-center">
                Create a section to begin.
              </p>
            )}

            {activeSectionId && activeStudents.length === 0 && !allSpokenMsg && (
              <p className="font-cormorant italic text-sm text-ink-soft/50 text-center">
                Add apprentices to begin.
              </p>
            )}
          </div>
        </GrimoireCard>

        <StudentSidebar
          students={students}
          onAdd={addStudent}
          onRemove={removeStudent}
          onReset={resetSection}
          hasActiveStudents={activeStudents.length > 0}
        />
      </div>
    </div>
  )
}

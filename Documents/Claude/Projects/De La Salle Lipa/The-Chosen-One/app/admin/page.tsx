import type { Metadata } from 'next'
import { getSections } from '@/lib/sections'
import { getStudentsBySection } from '@/lib/students'
import { AdminDashboard } from '@/components/AdminDashboard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard — The Chosen One',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const sections = await getSections()
  const firstSection = sections[0]
  const students = firstSection ? await getStudentsBySection(firstSection.id) : []

  return (
    <AdminDashboard
      initialSections={sections}
      initialStudents={students}
    />
  )
}

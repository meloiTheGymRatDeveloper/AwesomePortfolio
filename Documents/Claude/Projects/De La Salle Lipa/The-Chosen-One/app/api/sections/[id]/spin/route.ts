import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { spinStudent } from '@/lib/students'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  const student = await spinStudent(id)
  if (!student) {
    return NextResponse.json({ error: 'No active students in this section' }, { status: 404 })
  }
  return NextResponse.json(student)
}

import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { resetSection } from '@/lib/students'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  await resetSection(id)
  return NextResponse.json({ ok: true })
}

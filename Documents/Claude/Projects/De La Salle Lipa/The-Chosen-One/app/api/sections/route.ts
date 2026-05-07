import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSections, createSection } from '@/lib/sections'

export async function GET(request: NextRequest) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  return NextResponse.json(await getSections())
}

export async function POST(request: NextRequest) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const name = body.name
  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  const section = await createSection(name.trim())
  return NextResponse.json(section, { status: 201 })
}

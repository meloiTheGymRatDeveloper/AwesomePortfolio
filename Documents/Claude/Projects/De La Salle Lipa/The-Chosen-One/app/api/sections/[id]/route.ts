import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { renameSection, deleteSection } from '@/lib/sections'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
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
  const section = await renameSection(id, name.trim())
  if (!section) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(section)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  await deleteSection(id)
  return new NextResponse(null, { status: 204 })
}

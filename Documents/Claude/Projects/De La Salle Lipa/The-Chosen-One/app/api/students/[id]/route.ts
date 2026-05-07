import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { removeStudent } from '@/lib/students'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  await removeStudent(id)
  return new NextResponse(null, { status: 204 })
}

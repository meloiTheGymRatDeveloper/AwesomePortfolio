import { NextRequest, NextResponse } from 'next/server'
import { setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const response = NextResponse.json({ ok: true })
  await setSessionCookie(response)
  return response
}

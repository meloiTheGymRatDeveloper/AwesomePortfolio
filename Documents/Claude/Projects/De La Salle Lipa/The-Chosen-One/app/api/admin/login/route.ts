import { NextRequest, NextResponse } from 'next/server'
import { setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const body = await request.json()
  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const response = NextResponse.json({ ok: true })
  await setSessionCookie(response)
  return response
}

import { describe, it, expect, beforeAll } from 'vitest'
import { signToken, verifyToken } from '../lib/auth'

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-that-is-at-least-32-characters-long'
})

describe('signToken', () => {
  it('returns a three-part JWT string', async () => {
    const token = await signToken({ role: 'admin' })
    expect(typeof token).toBe('string')
    expect(token.split('.').length).toBe(3)
  })

  it('encodes the payload into the token', async () => {
    const { jwtVerify } = await import('jose')
    const token = await signToken({ role: 'admin', sub: 'test' })
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
    expect(payload.role).toBe('admin')
  })
})

describe('verifyToken', () => {
  it('returns true for a valid signed token', async () => {
    const token = await signToken({ role: 'admin' })
    expect(await verifyToken(token)).toBe(true)
  })

  it('returns false for a tampered token', async () => {
    const token = await signToken({ role: 'admin' })
    const tampered = token.slice(0, -4) + 'XXXX'
    expect(await verifyToken(tampered)).toBe(false)
  })

  it('returns false for an empty string', async () => {
    expect(await verifyToken('')).toBe(false)
  })

  it('returns false for an expired token', async () => {
    const { SignJWT } = await import('jose')
    const expired = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('-1s')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))
    expect(await verifyToken(expired)).toBe(false)
  })

  it('returns false for a token signed with the wrong secret', async () => {
    const { SignJWT } = await import('jose')
    const wrongKey = new TextEncoder().encode('a-completely-different-secret-32x')
    const foreign = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(wrongKey)
    expect(await verifyToken(foreign)).toBe(false)
  })
})

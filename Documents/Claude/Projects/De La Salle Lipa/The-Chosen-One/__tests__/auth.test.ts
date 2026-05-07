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
})

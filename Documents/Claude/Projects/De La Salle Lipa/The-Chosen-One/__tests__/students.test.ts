import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../lib/db', () => ({
  sql: vi.fn(),
}))

import { sql } from '../lib/db'
import { spinStudent, markStudentCorrect, resetSection, addStudent } from '../lib/students'

const mockSql = vi.mocked(sql)

beforeEach(() => {
  vi.clearAllMocks()
})

const mockStudent = {
  id: 'student-1',
  section_id: 'section-1',
  name: 'Coco',
  removed: false,
  created_at: '2026-01-01T00:00:00Z',
}

describe('spinStudent', () => {
  it('returns a student when one is available', async () => {
    mockSql.mockResolvedValueOnce([mockStudent] as any)
    const result = await spinStudent('section-1')
    expect(result).toEqual(mockStudent)
  })

  it('returns null when the pool is empty', async () => {
    mockSql.mockResolvedValueOnce([] as any)
    const result = await spinStudent('section-1')
    expect(result).toBeNull()
  })
})

describe('markStudentCorrect', () => {
  it('returns the updated student with removed = true', async () => {
    const updated = { ...mockStudent, removed: true }
    mockSql.mockResolvedValueOnce([updated] as any)
    const result = await markStudentCorrect('student-1')
    expect(result?.removed).toBe(true)
  })

  it('returns null when student id does not exist', async () => {
    mockSql.mockResolvedValueOnce([] as any)
    const result = await markStudentCorrect('nonexistent')
    expect(result).toBeNull()
  })
})

describe('resetSection', () => {
  it('calls sql once with the section id', async () => {
    mockSql.mockResolvedValueOnce([] as any)
    await resetSection('section-1')
    expect(mockSql).toHaveBeenCalledOnce()
  })
})

describe('addStudent', () => {
  it('returns the created student', async () => {
    mockSql.mockResolvedValueOnce([mockStudent] as any)
    const result = await addStudent('section-1', 'Coco')
    expect(result.name).toBe('Coco')
    expect(result.section_id).toBe('section-1')
  })
})

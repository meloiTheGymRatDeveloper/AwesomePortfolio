import { sql } from './db'
import type { Student } from './types'

export async function getStudentsBySection(sectionId: string): Promise<Student[]> {
  const rows = await sql`
    SELECT * FROM students
    WHERE section_id = ${sectionId}
    ORDER BY name ASC
  `
  return rows as Student[]
}

export async function addStudent(sectionId: string, name: string): Promise<Student> {
  const [row] = await sql`
    INSERT INTO students (section_id, name) VALUES (${sectionId}, ${name}) RETURNING *
  `
  if (!row) throw new Error('addStudent: INSERT returned no row')
  return row as Student
}

export async function removeStudent(id: string): Promise<void> {
  await sql`DELETE FROM students WHERE id = ${id}`
}

export async function markStudentCorrect(id: string): Promise<Student | null> {
  const rows = await sql`
    UPDATE students SET removed = true WHERE id = ${id} RETURNING *
  `
  return rows[0] as Student ?? null
}

export async function resetSection(sectionId: string): Promise<void> {
  await sql`UPDATE students SET removed = false WHERE section_id = ${sectionId}`
}

export async function spinStudent(sectionId: string): Promise<Student | null> {
  const rows = await sql`
    SELECT * FROM students
    WHERE section_id = ${sectionId} AND removed = false
    ORDER BY RANDOM()
    LIMIT 1
  `
  return rows[0] as Student ?? null
}

export async function countActiveStudents(sectionId: string): Promise<number> {
  const rows = await sql`
    SELECT COUNT(*) as count FROM students
    WHERE section_id = ${sectionId} AND removed = false
  `
  return Number(rows[0]?.count ?? 0)
}

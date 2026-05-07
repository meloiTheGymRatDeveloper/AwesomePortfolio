import { sql } from './db'
import type { Section } from './types'

export async function getSections(): Promise<Section[]> {
  const rows = await sql`SELECT * FROM sections ORDER BY created_at ASC`
  return rows as Section[]
}

export async function createSection(name: string): Promise<Section> {
  const [row] = await sql`
    INSERT INTO sections (name) VALUES (${name}) RETURNING *
  `
  return row as Section
}

export async function renameSection(id: string, name: string): Promise<Section | null> {
  const rows = await sql`
    UPDATE sections SET name = ${name} WHERE id = ${id} RETURNING *
  `
  return rows[0] as Section ?? null
}

export async function deleteSection(id: string): Promise<void> {
  await sql`DELETE FROM sections WHERE id = ${id}`
}

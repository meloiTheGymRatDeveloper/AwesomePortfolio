export interface Section {
  id: string
  name: string
  created_at: string
}

export interface Student {
  id: string
  section_id: string
  name: string
  removed: boolean
  created_at: string
}

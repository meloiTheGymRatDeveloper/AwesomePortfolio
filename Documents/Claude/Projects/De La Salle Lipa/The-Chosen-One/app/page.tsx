import type { Metadata } from 'next'
import { PublicWheel } from '@/components/PublicWheel'

export const metadata: Metadata = {
  title: 'The Chosen One — Classroom Recitation Randomizer',
  description: 'A magical spin-the-wheel app for randomly calling students during recitation.',
}

export default function HomePage() {
  return <PublicWheel />
}

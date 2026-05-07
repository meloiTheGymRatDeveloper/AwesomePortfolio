import type { Metadata } from 'next'
import { LoginForm } from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Admin Login — The Chosen One',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <LoginForm />
}

# The Chosen One — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a Witch Hat Atelier–themed spin-the-wheel classroom recitation randomizer with a password-gated teacher mode (real student names) and a public portfolio mode (anime character names).

**Architecture:** Next.js 15 App Router on Vercel with Neon Postgres. Server Components handle initial data fetching; Client Components manage wheel animation and interactive state. A single `ADMIN_PASSWORD` env var gates all `/admin` routes via Next.js middleware + signed JWT cookie stored in an httpOnly cookie.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Neon Postgres (`@neondatabase/serverless`), `jose` (JWT signing), Vitest (unit tests)

---

## File Map

```
app/
  layout.tsx                          Root layout — fonts, atmosphere components, metadata
  globals.css                         Grimoire CSS variables, keyframes, Tailwind base
  page.tsx                            Public wheel page (renders PublicWheel client component)
  admin/
    page.tsx                          Admin dashboard — Server Component, fetches initial data
    login/
      page.tsx                        Login page (renders LoginForm client component)
  api/
    admin/login/route.ts              POST /api/admin/login
    sections/route.ts                 GET, POST /api/sections
    sections/[id]/route.ts            PATCH, DELETE /api/sections/:id
    sections/[id]/students/route.ts   GET, POST /api/sections/:id/students
    sections/[id]/spin/route.ts       POST /api/sections/:id/spin
    sections/[id]/reset/route.ts      POST /api/sections/:id/reset
    students/[id]/route.ts            DELETE /api/students/:id
    students/[id]/correct/route.ts    PATCH /api/students/:id/correct

components/
  grimoire/
    StarCanvas.tsx                    Canvas twinkling gold stars (useEffect)
    Particles.tsx                     Six floating gold particle divs
    GrimoireCard.tsx                  Parchment card — border, corner flourishes
    OrnamentDivider.tsx               Gold ✦ ⬡ ✦ horizontal divider
  SpinWheel.tsx                       Animated wheel + rune ring + Cast the Spell button
  RevealCard.tsx                      Animated name reveal card after spin
  AdminDashboard.tsx                  Main admin client component — all admin state
  SectionTabs.tsx                     Section tab switcher — switch/add/delete sections
  StudentSidebar.tsx                  Scrollable apprentice list — add/remove/reset
  LoginForm.tsx                       Password form client component
  PublicWheel.tsx                     Public page wheel — anime names, client-side only

lib/
  db.ts                               Neon SQL tagged-template client
  auth.ts                             JWT sign/verify, setSessionCookie, requireAuth
  sections.ts                         Section DB queries (getSections, createSection, etc.)
  students.ts                         Student DB queries (spinStudent, markStudentCorrect, etc.)
  types.ts                            Shared TypeScript types (Section, Student)
  anime-names.ts                      Hardcoded ~80 anime character names
  db/
    schema.sql                        CREATE TABLE sections, students

middleware.ts                         Protects /admin/* — redirects to /admin/login if no cookie

__tests__/
  auth.test.ts                        signToken / verifyToken unit tests
  students.test.ts                    spinStudent / markStudentCorrect / resetSection tests

.env.example                          DATABASE_URL, JWT_SECRET, ADMIN_PASSWORD
vitest.config.ts                      Vitest with @/ alias
tailwind.config.ts                    Grimoire color tokens + font families
next.config.ts                        Standard Next.js 15 config
```

---

## Task 1: Scaffold Project & Configure Tooling

**Files:**
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `vitest.config.ts`
- Create: `.env.example`
- Create: `.gitignore` (update)

- [ ] **Step 1: Initialize Next.js 15 project**

Run in the project root (`The-Chosen-One/`):

```bash
npx create-next-app@15 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected output ends with: `Success! Created the-chosen-one`

- [ ] **Step 2: Install additional dependencies**

```bash
npm install jose @neondatabase/serverless
npm install -D vitest @vitest/ui
```

Expected: packages added without errors.

- [ ] **Step 3: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 4: Add test script to `package.json`**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write `tailwind.config.ts`**

Replace the generated file entirely:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F4EBDD',
        'parchment-dark': '#E8D9C4',
        ink: '#1C1A1A',
        'ink-soft': '#3a3530',
        navy: '#24324A',
        gold: '#C8A96B',
        'gold-light': '#dfc48a',
        teal: '#5C7A7A',
        moss: '#6E7554',
        burgundy: '#6A2E35',
        lavender: '#A89BC7',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        garamond: ['"EB Garamond"', 'serif'],
      },
      animation: {
        'rune-spin': 'rune-spin 20s linear infinite',
        'candle-flicker': 'candle-flicker 4s ease-in-out infinite alternate',
        'float-up': 'float-up linear infinite',
        'idle-glow': 'idle-glow 3s ease-in-out infinite alternate',
        'reveal-in': 'reveal-in 0.4s ease-out forwards',
        'wheel-spin': 'wheel-spin 4s ease-out forwards',
      },
      keyframes: {
        'rune-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'candle-flicker': {
          '0%': { opacity: '0.6', transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: '0.9', transform: 'translateX(-48%) scale(1.05)' },
          '100%': { opacity: '0.7', transform: 'translateX(-52%) scale(0.97)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.2' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
        'idle-glow': {
          '0%': { boxShadow: '0 0 0 3px #F4EBDD, 0 0 0 5px #C8A96B, 0 8px 40px rgba(36,50,74,0.27)' },
          '100%': { boxShadow: '0 0 0 3px #F4EBDD, 0 0 0 5px #C8A96B, 0 8px 50px rgba(200,169,107,0.33)' },
        },
        'reveal-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'wheel-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(1440deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Write `app/globals.css`**

Replace the generated file:

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --parchment: #F4EBDD;
  --ink: #1C1A1A;
  --navy: #24324A;
  --gold: #C8A96B;
  --moss: #6E7554;
  --burgundy: #6A2E35;
}

body {
  background-color: var(--parchment);
  color: var(--ink);
  font-family: 'Cormorant Garamond', serif;
}

/* Parchment noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
}
```

- [ ] **Step 7: Write `.env.example`**

```
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=replace-with-a-random-32-plus-character-string
ADMIN_PASSWORD=replace-with-your-chosen-password
```

- [ ] **Step 8: Update `.gitignore`** to ensure `.env.local` is excluded (Next.js adds this by default — verify it's present):

```
.env.local
.env*.local
```

- [ ] **Step 9: Verify setup compiles**

```bash
npm run build
```

Expected: Build succeeds (may warn about empty pages — that's fine at this stage).

- [ ] **Step 10: Commit**

```bash
git add next.config.ts tailwind.config.ts app/globals.css vitest.config.ts .env.example package.json package-lock.json
git commit -m "chore: scaffold Next.js 15 with grimoire theme config"
```

---

## Task 2: Types, Constants, and Database

**Files:**
- Create: `lib/types.ts`
- Create: `lib/anime-names.ts`
- Create: `lib/db.ts`
- Create: `lib/db/schema.sql`

- [ ] **Step 1: Write `lib/types.ts`**

```ts
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
```

- [ ] **Step 2: Write `lib/anime-names.ts`**

```ts
export const ANIME_NAMES: string[] = [
  // Witch Hat Atelier
  'Coco', 'Agott', 'Richeh', 'Tetia', 'Qifrey', 'Olruggio', 'Beldaruit',
  'Luluci', 'Custas', 'Ilseta', 'Dagda', 'Alaira', 'Nolnoa', 'Saviz',
  // Studio Ghibli
  'Howl', 'Sophie', 'Chihiro', 'Nausicaä', 'Kiki', 'Sheeta', 'Pazu',
  'Ashitaka', 'San', 'Ponyo', 'Arrietty', 'Satsuki', 'Calcifer',
  // Fullmetal Alchemist
  'Edward', 'Alphonse', 'Winry', 'Riza', 'Mustang', 'Scar', 'Greed',
  'Olivier', 'Izumi', 'Ling', 'Mei',
  // Attack on Titan
  'Eren', 'Mikasa', 'Armin', 'Levi', 'Hange', 'Erwin', 'Historia',
  'Ymir', 'Reiner', 'Connie', 'Sasha',
  // Demon Slayer
  'Tanjiro', 'Nezuko', 'Zenitsu', 'Inosuke', 'Shinobu', 'Giyuu',
  'Rengoku', 'Kanao', 'Tengen', 'Mitsuri',
  // My Hero Academia
  'Izuku', 'Katsuki', 'Shoto', 'Ochaco', 'Tenya', 'Momo', 'Tsuyu',
  'Eijiro', 'Denki', 'Fumikage',
  // Spy x Family
  'Loid', 'Yor', 'Anya', 'Bond',
  // Frieren
  'Frieren', 'Fern', 'Stark', 'Himmel', 'Heiter', 'Eisen', 'Flamme',
  // Violet Evergarden
  'Violet', 'Gilbert', 'Claudia', 'Cattleya', 'Erica',
  // Made in Abyss
  'Riko', 'Reg', 'Nanachi', 'Mitty',
]
```

- [ ] **Step 3: Write `lib/db/schema.sql`**

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS sections (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS students (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  removed    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

- [ ] **Step 4: Write `lib/db.ts`**

```ts
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

export const sql = neon(process.env.DATABASE_URL!)
```

- [ ] **Step 5: Create your `.env.local`**

Copy `.env.example` to `.env.local` and fill in your Neon `DATABASE_URL`. (Get this from the Vercel dashboard after linking Neon in Task 12, or from neon.tech directly.)

For now, leave `JWT_SECRET` and `ADMIN_PASSWORD` as placeholders — you'll fill them in Task 3.

- [ ] **Step 6: Run the schema migration**

Add a temporary script to `package.json`:
```json
"db:migrate": "npx tsx lib/db/migrate.ts"
```

Create `lib/db/migrate.ts`:
```ts
import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join } from 'path'
import 'dotenv/config'

const sql = neon(process.env.DATABASE_URL!)
const schema = readFileSync(join(process.cwd(), 'lib/db/schema.sql'), 'utf-8')

sql(schema).then(() => {
  console.log('✓ Migration complete')
  process.exit(0)
}).catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
```

Install tsx and dotenv:
```bash
npm install -D tsx dotenv
```

Run:
```bash
npm run db:migrate
```

Expected: `✓ Migration complete`

- [ ] **Step 7: Commit**

```bash
git add lib/ package.json package-lock.json
git commit -m "feat: add types, anime names, DB schema and client"
```

---

## Task 3: Auth Utilities & Middleware

**Files:**
- Create: `lib/auth.ts`
- Create: `middleware.ts`
- Create: `__tests__/auth.test.ts`

- [ ] **Step 1: Write failing tests for `lib/auth.ts`**

Create `__tests__/auth.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../lib/auth'`

- [ ] **Step 3: Write `lib/auth.ts`**

```ts
import { SignJWT, jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET env var is required')
  return new TextEncoder().encode(secret)
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret())
    return true
  } catch {
    return false
  }
}

export async function setSessionCookie(response: NextResponse): Promise<void> {
  const token = await signToken({ role: 'admin' })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token)
}

export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const authed = await isAuthenticated(request)
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npm test
```

Expected: PASS — 4 tests passing

- [ ] **Step 5: Write `middleware.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const authed = await isAuthenticated(request)
    if (!authed) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

- [ ] **Step 6: Set `JWT_SECRET` in `.env.local`**

Generate a random secret and add it:
```
JWT_SECRET=use-openssl-rand-base64-32-to-generate-this
```

You can generate one with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

- [ ] **Step 7: Commit**

```bash
git add lib/auth.ts middleware.ts __tests__/auth.test.ts
git commit -m "feat: add JWT auth utilities and admin route middleware"
```

---

## Task 4: Data Layer — Sections & Students

**Files:**
- Create: `lib/sections.ts`
- Create: `lib/students.ts`
- Create: `__tests__/students.test.ts`

- [ ] **Step 1: Write failing tests**

Create `__tests__/students.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../lib/students'`

- [ ] **Step 3: Write `lib/sections.ts`**

```ts
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
```

- [ ] **Step 4: Write `lib/students.ts`**

```ts
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
  return Number(rows[0].count)
}
```

- [ ] **Step 5: Run tests — verify they pass**

```bash
npm test
```

Expected: PASS — 6 tests passing

- [ ] **Step 6: Commit**

```bash
git add lib/sections.ts lib/students.ts __tests__/students.test.ts
git commit -m "feat: add sections and students data layer with tests"
```

---

## Task 5: API Routes

**Files:**
- Create: `app/api/admin/login/route.ts`
- Create: `app/api/sections/route.ts`
- Create: `app/api/sections/[id]/route.ts`
- Create: `app/api/sections/[id]/students/route.ts`
- Create: `app/api/sections/[id]/spin/route.ts`
- Create: `app/api/sections/[id]/reset/route.ts`
- Create: `app/api/students/[id]/route.ts`
- Create: `app/api/students/[id]/correct/route.ts`

- [ ] **Step 1: Write `app/api/admin/login/route.ts`**

```ts
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
```

- [ ] **Step 2: Write `app/api/sections/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSections, createSection } from '@/lib/sections'

export async function GET(request: NextRequest) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  return NextResponse.json(await getSections())
}

export async function POST(request: NextRequest) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { name } = await request.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  const section = await createSection(name.trim())
  return NextResponse.json(section, { status: 201 })
}
```

- [ ] **Step 3: Write `app/api/sections/[id]/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { renameSection, deleteSection } from '@/lib/sections'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  const { name } = await request.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  const section = await renameSection(id, name.trim())
  if (!section) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(section)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  await deleteSection(id)
  return new NextResponse(null, { status: 204 })
}
```

- [ ] **Step 4: Write `app/api/sections/[id]/students/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getStudentsBySection, addStudent } from '@/lib/students'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  return NextResponse.json(await getStudentsBySection(id))
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  const { name } = await request.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  const student = await addStudent(id, name.trim())
  return NextResponse.json(student, { status: 201 })
}
```

- [ ] **Step 5: Write `app/api/sections/[id]/spin/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { spinStudent } from '@/lib/students'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  const student = await spinStudent(id)
  if (!student) {
    return NextResponse.json({ error: 'No active students in this section' }, { status: 404 })
  }
  return NextResponse.json(student)
}
```

- [ ] **Step 6: Write `app/api/sections/[id]/reset/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { resetSection } from '@/lib/students'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  await resetSection(id)
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 7: Write `app/api/students/[id]/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { removeStudent } from '@/lib/students'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  await removeStudent(id)
  return new NextResponse(null, { status: 204 })
}
```

- [ ] **Step 8: Write `app/api/students/[id]/correct/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { markStudentCorrect } from '@/lib/students'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(request)
  if (unauth) return unauth
  const { id } = await params
  const student = await markStudentCorrect(id)
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(student)
}
```

- [ ] **Step 9: Run tests to confirm nothing broke**

```bash
npm test
```

Expected: PASS — same 6 tests as before (student tests only — auth not loaded yet in this task).

- [ ] **Step 10: Commit**

```bash
git add app/api/
git commit -m "feat: add all API route handlers"
```

---

## Task 6: Grimoire UI Foundation Components

**Files:**
- Create: `components/grimoire/StarCanvas.tsx`
- Create: `components/grimoire/Particles.tsx`
- Create: `components/grimoire/GrimoireCard.tsx`
- Create: `components/grimoire/OrnamentDivider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write `components/grimoire/StarCanvas.tsx`**

```tsx
'use client'
import { useEffect, useRef } from 'react'

export function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }))

    let animId: number
    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const alpha = ((Math.sin(t * s.speed + s.phase) + 1) / 2) * 0.5 + 0.1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 169, 107, ${alpha})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-50"
    />
  )
}
```

- [ ] **Step 2: Write `components/grimoire/Particles.tsx`**

```tsx
const PARTICLES = [
  { left: '10%', duration: '12s', delay: '0s', size: 3 },
  { left: '25%', duration: '16s', delay: '3s', size: 2 },
  { left: '60%', duration: '14s', delay: '6s', size: 3 },
  { left: '80%', duration: '18s', delay: '2s', size: 2 },
  { left: '45%', duration: '11s', delay: '8s', size: 3 },
  { left: '90%', duration: '15s', delay: '1s', size: 4 },
]

export function Particles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-[1] rounded-full bg-gold animate-float-up"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  )
}
```

- [ ] **Step 3: Write `components/grimoire/GrimoireCard.tsx`**

```tsx
import { ReactNode } from 'react'

interface GrimoireCardProps {
  children: ReactNode
  className?: string
}

export function GrimoireCard({ children, className = '' }: GrimoireCardProps) {
  return (
    <div
      className={`relative bg-gradient-to-br from-[#f9f3ea] via-parchment to-[#ede3d4] border border-gold rounded-sm shadow-[0_4px_40px_rgba(200,169,107,0.13),inset_0_1px_0_rgba(255,255,255,0.53)] ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <span className="absolute top-2 left-2.5 text-gold/50 text-lg leading-none select-none">❧</span>
      <span className="absolute top-2 right-2.5 text-gold/50 text-lg leading-none select-none [transform:scaleX(-1)]">❧</span>
      <span className="absolute bottom-2 left-2.5 text-gold/50 text-lg leading-none select-none [transform:scaleY(-1)]">❧</span>
      <span className="absolute bottom-2 right-2.5 text-gold/50 text-lg leading-none select-none [transform:scale(-1)]">❧</span>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Write `components/grimoire/OrnamentDivider.tsx`**

```tsx
interface OrnamentDividerProps {
  text?: string
}

export function OrnamentDivider({ text = '✦ ⬡ ✦' }: OrnamentDividerProps) {
  return (
    <div className="flex items-center gap-3 text-gold/60 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <span className="font-cinzel text-sm tracking-[0.3em] whitespace-nowrap">{text}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}
```

- [ ] **Step 5: Write `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import { StarCanvas } from '@/components/grimoire/StarCanvas'
import { Particles } from '@/components/grimoire/Particles'

export const metadata: Metadata = {
  title: 'The Chosen One',
  description: 'A magical classroom recitation randomizer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        {/* Candlelight glow */}
        <div
          className="fixed bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-[1] animate-candle-flicker"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(200,169,107,0.13) 0%, transparent 70%)',
          }}
        />
        <StarCanvas />
        <Particles />
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Verify dev server renders without errors**

```bash
npm run dev
```

Open http://localhost:3000 — should show a warm parchment background with twinkling gold stars and floating particles.

- [ ] **Step 7: Commit**

```bash
git add components/grimoire/ app/layout.tsx
git commit -m "feat: add grimoire UI foundation — stars, particles, card, divider"
```

---

## Task 7: SpinWheel & RevealCard Components

**Files:**
- Create: `components/SpinWheel.tsx`
- Create: `components/RevealCard.tsx`

- [ ] **Step 1: Write `components/SpinWheel.tsx`**

```tsx
'use client'

interface SpinWheelProps {
  isSpinning: boolean
  disabled: boolean
  onCast: () => void
}

export function SpinWheel({ isSpinning, disabled, onCast }: SpinWheelProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-56 h-56">

        {/* Rune ring */}
        <div
          className="absolute rounded-full border border-gold/30 animate-rune-spin"
          style={{ inset: '-14px' }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-[7px] tracking-[5px] whitespace-nowrap">
            ✦ ✧ ⬡ ✦ ✧ ⬡ ✦ ✧ ⬡
          </span>
        </div>

        {/* Wheel */}
        <div
          className={`w-56 h-56 rounded-full ${isSpinning ? 'animate-wheel-spin' : 'animate-idle-glow'}`}
          style={{
            background: 'conic-gradient(#24324A 0deg 45deg, #C8A96B 45deg 90deg, #5C7A7A 90deg 135deg, #6A2E35 135deg 180deg, #6E7554 180deg 225deg, #A89BC7 225deg 270deg, #24324A 270deg 315deg, #C8A96B 315deg 360deg)',
            boxShadow: '0 0 0 3px #F4EBDD, 0 0 0 5px #C8A96B, 0 8px 40px rgba(36,50,74,0.27)',
          }}
        />

        {/* Hub */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-parchment rounded-full border-2 border-gold flex items-center justify-center text-xl shadow-[0_2px_12px_rgba(200,169,107,0.27)]">
            🎩
          </div>
        </div>

        {/* Pointer */}
        <div
          className="absolute -top-5 left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '24px solid #C8A96B',
            filter: 'drop-shadow(0 2px 4px rgba(200,169,107,0.53))',
          }}
        />
      </div>

      <button
        onClick={onCast}
        disabled={disabled || isSpinning}
        className="font-cinzel text-xs font-semibold tracking-[4px] uppercase text-parchment bg-navy border border-gold px-8 py-3 rounded-sm transition-all duration-300 shadow-[0_2px_16px_rgba(36,50,74,0.2)] hover:shadow-[0_4px_24px_rgba(200,169,107,0.27)] hover:bg-[#1a273a] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ✦ &nbsp;Cast the Spell&nbsp; ✦
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Write `components/RevealCard.tsx`**

```tsx
'use client'

interface RevealCardProps {
  name: string
  onCorrect: () => void
  onSkip: () => void
  isLoading: boolean
}

export function RevealCard({ name, onCorrect, onSkip, isLoading }: RevealCardProps) {
  return (
    <div className="animate-reveal-in w-full max-w-sm">
      {/* Reveal box */}
      <div
        className="relative border border-gold rounded-sm px-6 py-4 text-center mb-4"
        style={{
          background: 'linear-gradient(135deg, #2a1f14, #1a1410)',
          boxShadow: '0 4px 32px rgba(200,169,107,0.2)',
        }}
      >
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 font-cinzel text-gold text-[9px] tracking-[4px] whitespace-nowrap px-2"
          style={{ background: '#2a1f14' }}
        >
          ⬡ ✦ ⬡
        </div>
        <p className="font-cinzel text-[9px] tracking-[5px] uppercase text-gold/70 mb-1">
          The Fates Have Spoken
        </p>
        <p className="font-cormorant italic text-2xl font-light text-[#f5ead8] tracking-wide">
          ✦ &nbsp;{name}&nbsp; ✦
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onCorrect}
          disabled={isLoading}
          className="font-cinzel text-[10px] tracking-[2px] uppercase border border-moss text-moss px-5 py-2 rounded-sm transition-all duration-200 hover:bg-moss hover:text-parchment disabled:opacity-50"
        >
          ✓ &nbsp;Answered Correctly
        </button>
        <button
          onClick={onSkip}
          disabled={isLoading}
          className="font-cinzel text-[10px] tracking-[2px] uppercase border border-burgundy text-burgundy px-5 py-2 rounded-sm transition-all duration-200 hover:bg-burgundy hover:text-parchment disabled:opacity-50"
        >
          ↩ &nbsp;Skip
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/SpinWheel.tsx components/RevealCard.tsx
git commit -m "feat: add SpinWheel and RevealCard components"
```

---

## Task 8: Public Wheel Page

**Files:**
- Create: `components/PublicWheel.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `components/PublicWheel.tsx`**

```tsx
'use client'
import { useState, useRef } from 'react'
import { ANIME_NAMES } from '@/lib/anime-names'
import { SpinWheel } from '@/components/SpinWheel'
import { RevealCard } from '@/components/RevealCard'
import { GrimoireCard } from '@/components/grimoire/GrimoireCard'
import { OrnamentDivider } from '@/components/grimoire/OrnamentDivider'

export function PublicWheel() {
  const [remaining, setRemaining] = useState<string[]>([...ANIME_NAMES])
  const [isSpinning, setIsSpinning] = useState(false)
  const [pickedName, setPickedName] = useState<string | null>(null)
  const pickedRef = useRef<string | null>(null)

  const handleCast = () => {
    if (remaining.length === 0) return
    setIsSpinning(true)
    setPickedName(null)

    const pool = remaining.length > 0 ? remaining : [...ANIME_NAMES]
    const idx = Math.floor(Math.random() * pool.length)
    const name = pool[idx]
    pickedRef.current = name

    setTimeout(() => {
      setIsSpinning(false)
      setPickedName(pickedRef.current)
    }, 4000)
  }

  const handleSkip = () => {
    setPickedName(null)
  }

  const handleNext = () => {
    if (!pickedName) return
    const next = remaining.filter(n => n !== pickedName)
    setRemaining(next.length === 0 ? [...ANIME_NAMES] : next)
    setPickedName(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-cinzel text-[10px] tracking-[6px] uppercase text-gold block mb-2">
          ✦ &nbsp;Portfolio Demo&nbsp; ✦
        </span>
        <h1 className="font-cinzel text-4xl font-bold text-navy tracking-wide">
          The Chosen One
        </h1>
        <p className="font-cormorant italic text-lg text-ink-soft mt-2 opacity-80">
          Let the stars decide who speaks today
        </p>
      </div>

      <OrnamentDivider text="✦ &nbsp;Summon the Apprentice&nbsp; ✦" />

      <GrimoireCard className="p-8 mt-6">
        <div className="flex flex-col items-center gap-6">
          <SpinWheel
            isSpinning={isSpinning}
            disabled={remaining.length === 0}
            onCast={handleCast}
          />

          {pickedName && (
            <RevealCard
              name={pickedName}
              onCorrect={handleNext}
              onSkip={handleSkip}
              isLoading={false}
            />
          )}

          <p className="font-garamond italic text-sm text-ink-soft/60 mt-2">
            {remaining.length} of {ANIME_NAMES.length} apprentices remaining
          </p>
        </div>
      </GrimoireCard>

      <div className="text-center mt-8">
        <p className="font-cormorant italic text-sm text-ink-soft/50">
          This is a public demo. Student names shown are fictional anime characters.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `app/page.tsx`**

```tsx
import { PublicWheel } from '@/components/PublicWheel'

export default function HomePage() {
  return <PublicWheel />
}
```

- [ ] **Step 3: Start dev server and verify the public page**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Parchment background with stars and particles renders
- The wheel displays with the rune ring
- "Cast the Spell ✦" button is clickable
- Wheel spins for ~4 seconds, then the reveal card appears with an anime name
- "Skip" dismisses the card
- "Answered Correctly" removes the name from the pool and shows the remaining count

- [ ] **Step 4: Commit**

```bash
git add components/PublicWheel.tsx app/page.tsx
git commit -m "feat: public wheel page with anime name pool"
```

---

## Task 9: Login Page

**Files:**
- Create: `components/LoginForm.tsx`
- Create: `app/admin/login/page.tsx`

- [ ] **Step 1: Write `components/LoginForm.tsx`**

```tsx
'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { GrimoireCard } from '@/components/grimoire/GrimoireCard'

export function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('The grimoire does not recognize you.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-cinzel text-[10px] tracking-[6px] uppercase text-gold block mb-3">
            ✦ &nbsp;Restricted&nbsp; ✦
          </span>
          <h1 className="font-cinzel text-3xl font-bold text-navy">The Atelier</h1>
          <p className="font-cormorant italic text-base text-ink-soft mt-2 opacity-70">
            Enter the warden's incantation
          </p>
        </div>

        <GrimoireCard className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Incantation…"
              className="font-garamond text-base bg-white/40 border border-gold/40 rounded-sm px-3 py-2.5 text-ink placeholder-[#9a8070] placeholder:italic outline-none focus:border-gold focus:bg-white/70 transition-colors"
              autoFocus
            />

            {error && (
              <p className="font-cormorant italic text-sm text-burgundy text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="font-cinzel text-[10px] tracking-[4px] uppercase text-parchment bg-navy border border-gold py-3 rounded-sm transition-all duration-200 hover:bg-[#1a273a] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Opening…' : '✦ &nbsp;Open the Grimoire&nbsp; ✦'}
            </button>
          </form>
        </GrimoireCard>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `app/admin/login/page.tsx`**

```tsx
import { LoginForm } from '@/components/LoginForm'

export default function LoginPage() {
  return <LoginForm />
}
```

- [ ] **Step 3: Set `ADMIN_PASSWORD` in `.env.local` and test login**

Add to `.env.local`:
```
ADMIN_PASSWORD=your-chosen-password
```

Start dev server (`npm run dev`), open http://localhost:3000/admin/login. Verify:
- Entering wrong password shows "The grimoire does not recognize you."
- Entering correct password redirects to `/admin` (will 404 for now — that's expected)

- [ ] **Step 4: Commit**

```bash
git add components/LoginForm.tsx app/admin/login/page.tsx
git commit -m "feat: add login page with grimoire styling"
```

---

## Task 10: Admin Dashboard Components

**Files:**
- Create: `components/SectionTabs.tsx`
- Create: `components/StudentSidebar.tsx`

- [ ] **Step 1: Write `components/SectionTabs.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { Section } from '@/lib/types'

interface SectionTabsProps {
  sections: Section[]
  activeSectionId: string | null
  onSelect: (id: string) => void
  onAdd: (name: string) => Promise<void>
  onDelete: (id: string) => void
}

export function SectionTabs({ sections, activeSectionId, onSelect, onAdd, onDelete }: SectionTabsProps) {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleAdd = async () => {
    if (!newName.trim()) return
    setSaving(true)
    await onAdd(newName.trim())
    setNewName('')
    setAdding(false)
    setSaving(false)
  }

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      {sections.map(s => (
        <div key={s.id} className="relative group">
          <button
            onClick={() => onSelect(s.id)}
            className={`font-cinzel text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
              activeSectionId === s.id
                ? 'bg-navy text-parchment border-gold'
                : 'bg-transparent text-ink-soft border-gold/40 hover:border-gold hover:bg-gold/10'
            }`}
          >
            {s.name}
          </button>
          {confirmDelete === s.id ? (
            <div className="absolute top-full left-0 mt-1 bg-navy border border-gold/40 rounded-sm p-2 z-10 whitespace-nowrap flex gap-2">
              <span className="font-garamond text-xs text-parchment/70 mr-1">Delete?</span>
              <button
                onClick={() => { onDelete(s.id); setConfirmDelete(null) }}
                className="font-cinzel text-[9px] text-burgundy hover:underline"
              >Yes</button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="font-cinzel text-[9px] text-gold hover:underline"
              >No</button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(s.id)}
              className="absolute -top-1 -right-1 w-4 h-4 bg-burgundy/80 rounded-full text-parchment text-[9px] hidden group-hover:flex items-center justify-center hover:bg-burgundy"
            >
              ×
            </button>
          )}
        </div>
      ))}

      {adding ? (
        <div className="flex gap-1">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Section name…"
            autoFocus
            className="font-garamond text-sm bg-white/40 border border-gold/50 rounded-sm px-2 py-1.5 text-ink placeholder:italic outline-none focus:border-gold w-36"
          />
          <button
            onClick={handleAdd}
            disabled={saving || !newName.trim()}
            className="font-cinzel text-[9px] text-navy border border-gold/50 px-2 py-1 rounded-sm hover:bg-gold/10 disabled:opacity-50"
          >
            Add
          </button>
          <button
            onClick={() => { setAdding(false); setNewName('') }}
            className="font-cinzel text-[9px] text-ink-soft border border-gold/30 px-2 py-1 rounded-sm hover:bg-gold/5"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="font-cinzel text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-sm border border-dashed border-gold/50 text-gold hover:border-gold transition-colors"
        >
          + New Section
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Write `components/StudentSidebar.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { Student } from '@/lib/types'

interface StudentSidebarProps {
  students: Student[]
  onAdd: (name: string) => Promise<void>
  onRemove: (id: string) => void
  onReset: () => void
  hasActiveStudents: boolean
}

export function StudentSidebar({ students, onAdd, onRemove, onReset, hasActiveStudents }: StudentSidebarProps) {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const handleAdd = async () => {
    if (!name.trim()) return
    setSaving(true)
    await onAdd(name.trim())
    setName('')
    setSaving(false)
  }

  const active = students.filter(s => !s.removed).length

  return (
    <div
      className="w-72 border border-gold/50 rounded-sm p-5 flex flex-col gap-3 relative"
      style={{ background: 'linear-gradient(160deg, #f9f3ea, #F4EBDD)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="font-cinzel text-[10px] tracking-[4px] uppercase text-navy text-center">
        ✦ <span className="text-gold">Apprentices</span> ✦
      </div>

      <p className="font-cormorant italic text-sm text-ink-soft/70 text-center">
        {active} remaining of {students.length}
      </p>

      {/* Student list */}
      <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1">
        {students.length === 0 && (
          <p className="font-garamond italic text-sm text-ink-soft/50 text-center py-4">
            No apprentices yet.
          </p>
        )}
        {students.map(s => (
          <div
            key={s.id}
            className="group flex items-center justify-between bg-white/40 border border-gold/20 rounded-sm px-2.5 py-1.5 transition-colors hover:bg-gold/10"
          >
            <span
              className={`font-garamond text-sm ${
                s.removed ? 'line-through text-moss/60 italic' : 'text-navy'
              }`}
            >
              {s.name}
              {s.removed && <span className="ml-1 text-moss text-xs">✓</span>}
            </span>
            <button
              onClick={() => onRemove(s.id)}
              className="text-burgundy/40 text-xs hover:text-burgundy hidden group-hover:block ml-2 leading-none"
              title="Remove permanently"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {/* Add student */}
      <div className="flex gap-1.5 mt-1">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add apprentice…"
          className="flex-1 font-garamond text-sm bg-white/50 border border-gold/40 rounded-sm px-2.5 py-1.5 text-ink placeholder:italic placeholder-[#9a8070] outline-none focus:border-gold"
        />
        <button
          onClick={handleAdd}
          disabled={saving || !name.trim()}
          className="font-cinzel text-sm bg-navy border border-gold text-parchment px-3 rounded-sm hover:bg-[#1a273a] disabled:opacity-50 transition-colors"
        >
          +
        </button>
      </div>

      {/* Reset */}
      {confirmReset ? (
        <div className="flex gap-2 items-center justify-center">
          <span className="font-garamond text-xs text-ink-soft/70">Reset all students?</span>
          <button
            onClick={() => { onReset(); setConfirmReset(false) }}
            className="font-cinzel text-[9px] text-burgundy hover:underline"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirmReset(false)}
            className="font-cinzel text-[9px] text-gold hover:underline"
          >
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmReset(true)}
          disabled={!students.length}
          className="w-full font-cinzel text-[9px] tracking-[3px] uppercase bg-transparent border border-gold text-gold py-2 rounded-sm hover:bg-gold hover:text-navy transition-all duration-200 disabled:opacity-30"
        >
          ↺ &nbsp;Reset the Circle
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/SectionTabs.tsx components/StudentSidebar.tsx
git commit -m "feat: add SectionTabs and StudentSidebar admin components"
```

---

## Task 11: Admin Dashboard Page

**Files:**
- Create: `components/AdminDashboard.tsx`
- Create: `app/admin/page.tsx`

- [ ] **Step 1: Write `components/AdminDashboard.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { Section, Student } from '@/lib/types'
import { SectionTabs } from '@/components/SectionTabs'
import { StudentSidebar } from '@/components/StudentSidebar'
import { SpinWheel } from '@/components/SpinWheel'
import { RevealCard } from '@/components/RevealCard'
import { GrimoireCard } from '@/components/grimoire/GrimoireCard'
import { OrnamentDivider } from '@/components/grimoire/OrnamentDivider'

interface AdminDashboardProps {
  initialSections: Section[]
  initialStudents: Student[]
}

export function AdminDashboard({ initialSections, initialStudents }: AdminDashboardProps) {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    initialSections[0]?.id ?? null
  )
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isSpinning, setIsSpinning] = useState(false)
  const [pickedStudent, setPickedStudent] = useState<Student | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [allSpokenMsg, setAllSpokenMsg] = useState(false)

  const activeStudents = students.filter(s => !s.removed)

  const switchSection = async (id: string) => {
    setActiveSectionId(id)
    setPickedStudent(null)
    const res = await fetch(`/api/sections/${id}/students`)
    if (res.ok) setStudents(await res.json())
  }

  const addSection = async (name: string) => {
    const res = await fetch('/api/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      const section: Section = await res.json()
      setSections(prev => [...prev, section])
      await switchSection(section.id)
    }
  }

  const deleteSection = async (id: string) => {
    await fetch(`/api/sections/${id}`, { method: 'DELETE' })
    const next = sections.filter(s => s.id !== id)
    setSections(next)
    if (activeSectionId === id) {
      const fallback = next[0]?.id ?? null
      setActiveSectionId(fallback)
      if (fallback) {
        const res = await fetch(`/api/sections/${fallback}/students`)
        if (res.ok) setStudents(await res.json())
      } else {
        setStudents([])
      }
    }
    setPickedStudent(null)
  }

  const handleCast = async () => {
    if (!activeSectionId || activeStudents.length === 0) return
    setIsSpinning(true)
    setPickedStudent(null)

    const [spinRes] = await Promise.all([
      fetch(`/api/sections/${activeSectionId}/spin`, { method: 'POST' }).then(r => r.json()),
      new Promise(resolve => setTimeout(resolve, 4000)),
    ])

    setIsSpinning(false)
    setPickedStudent(spinRes)
  }

  const handleCorrect = async () => {
    if (!pickedStudent) return
    setActionLoading(true)
    await fetch(`/api/students/${pickedStudent.id}/correct`, { method: 'PATCH' })
    const updated = students.map(s =>
      s.id === pickedStudent.id ? { ...s, removed: true } : s
    )
    setStudents(updated)
    setPickedStudent(null)
    setActionLoading(false)

    // Auto-reset if pool is now empty
    const stillActive = updated.filter(s => !s.removed).length
    if (stillActive === 0 && activeSectionId) {
      setAllSpokenMsg(true)
      setTimeout(async () => {
        await fetch(`/api/sections/${activeSectionId}/reset`, { method: 'POST' })
        setStudents(prev => prev.map(s => ({ ...s, removed: false })))
        setAllSpokenMsg(false)
      }, 2500)
    }
  }

  const handleSkip = () => setPickedStudent(null)

  const addStudent = async (name: string) => {
    if (!activeSectionId) return
    const res = await fetch(`/api/sections/${activeSectionId}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      const student: Student = await res.json()
      setStudents(prev => [...prev, student].sort((a, b) => a.name.localeCompare(b.name)))
    }
  }

  const removeStudent = async (id: string) => {
    await fetch(`/api/students/${id}`, { method: 'DELETE' })
    setStudents(prev => prev.filter(s => s.id !== id))
    if (pickedStudent?.id === id) setPickedStudent(null)
  }

  const resetSection = async () => {
    if (!activeSectionId) return
    await fetch(`/api/sections/${activeSectionId}/reset`, { method: 'POST' })
    setStudents(prev => prev.map(s => ({ ...s, removed: false })))
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-cinzel text-[10px] tracking-[6px] uppercase text-gold block mb-2">
          De La Salle Lipa &nbsp;·&nbsp; College of Information Technology
        </span>
        <h1 className="font-cinzel text-4xl font-bold text-navy tracking-wide">
          The Chosen One
        </h1>
        <p className="font-cormorant italic text-lg text-ink-soft mt-2 opacity-80">
          Let the stars decide who speaks today
        </p>
      </div>

      <OrnamentDivider text="✦ &nbsp;Summon the Apprentice&nbsp; ✦" />

      {/* Section tabs */}
      <SectionTabs
        sections={sections}
        activeSectionId={activeSectionId}
        onSelect={switchSection}
        onAdd={addSection}
        onDelete={deleteSection}
      />

      {/* Main layout */}
      <div className="flex gap-6 items-start">
        <GrimoireCard className="flex-1 p-8">
          <div className="flex flex-col items-center gap-6">
            <SpinWheel
              isSpinning={isSpinning}
              disabled={!activeSectionId || activeStudents.length === 0}
              onCast={handleCast}
            />

            {allSpokenMsg && (
              <div className="animate-reveal-in font-cormorant italic text-lg text-gold text-center">
                All apprentices have spoken ✦
              </div>
            )}

            {pickedStudent && !allSpokenMsg && (
              <RevealCard
                name={pickedStudent.name}
                onCorrect={handleCorrect}
                onSkip={handleSkip}
                isLoading={actionLoading}
              />
            )}

            {!activeSectionId && (
              <p className="font-cormorant italic text-sm text-ink-soft/50 text-center">
                Create a section to begin.
              </p>
            )}

            {activeSectionId && activeStudents.length === 0 && !allSpokenMsg && (
              <p className="font-cormorant italic text-sm text-ink-soft/50 text-center">
                Add apprentices to begin.
              </p>
            )}
          </div>
        </GrimoireCard>

        <StudentSidebar
          students={students}
          onAdd={addStudent}
          onRemove={removeStudent}
          onReset={resetSection}
          hasActiveStudents={activeStudents.length > 0}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `app/admin/page.tsx`**

```tsx
import { getSections } from '@/lib/sections'
import { getStudentsBySection } from '@/lib/students'
import { AdminDashboard } from '@/components/AdminDashboard'

export default async function AdminPage() {
  const sections = await getSections()
  const firstSection = sections[0]
  const students = firstSection ? await getStudentsBySection(firstSection.id) : []

  return (
    <AdminDashboard
      initialSections={sections}
      initialStudents={students}
    />
  )
}
```

- [ ] **Step 3: Start dev server and test the full admin flow**

```bash
npm run dev
```

Open http://localhost:3000/admin (should redirect to `/admin/login` first). After logging in, verify:
- Sections can be created, switched, deleted
- Students can be added and appear in the sidebar
- Spinning the wheel selects a random active student after 4 seconds
- "Answered Correctly" marks the student with strikethrough
- "Skip" dismisses the reveal card
- "Reset the Circle" (with confirmation) un-marks all students
- When the last student is marked correct, "All apprentices have spoken ✦" appears and the list resets automatically

- [ ] **Step 4: Run full test suite**

```bash
npm test
```

Expected: PASS — all 10 tests passing (4 auth + 6 student).

- [ ] **Step 5: Commit**

```bash
git add components/AdminDashboard.tsx app/admin/page.tsx
git commit -m "feat: admin dashboard with sections, spin wheel, and student management"
```

---

## Task 12: Deploy to Vercel

**Files:**
- None — deployment configuration only

- [ ] **Step 1: Install Vercel CLI** (if not already installed)

```bash
npm install -g vercel
```

- [ ] **Step 2: Link the project to Vercel**

```bash
vercel link
```

Follow prompts: choose your Vercel account, create a new project named `the-chosen-one`.

- [ ] **Step 3: Add Neon Postgres from Vercel Marketplace**

In the Vercel dashboard:
1. Go to your project → **Storage** tab
2. Click **Add** → **Neon Postgres**
3. Create a new database, select the region closest to your students (e.g., Singapore for PH)
4. Click **Connect** — this auto-adds `DATABASE_URL` to your Vercel env vars

- [ ] **Step 4: Pull env vars to local**

```bash
vercel env pull .env.local
```

This overwrites your local `.env.local` with Vercel's vars, including the real `DATABASE_URL`. Verify it updated.

- [ ] **Step 5: Run the migration against the real Neon database**

```bash
npm run db:migrate
```

Expected: `✓ Migration complete`

- [ ] **Step 6: Add remaining env vars to Vercel**

```bash
vercel env add JWT_SECRET production
# Paste your generated secret when prompted

vercel env add ADMIN_PASSWORD production
# Paste your chosen password when prompted
```

Repeat for `preview` and `development` environments if desired.

- [ ] **Step 7: Deploy to production**

```bash
vercel --prod
```

Expected output includes: `✓ Production: https://the-chosen-one-xxxx.vercel.app`

- [ ] **Step 8: Smoke test the live deployment**

Open the production URL. Verify:
- Public page loads with grimoire theme
- Spinning the wheel works with anime names
- `/admin/login` accepts the correct password
- Admin dashboard loads sections, wheel spins, student CRUD works

- [ ] **Step 9: Final commit**

```bash
git add .
git commit -m "chore: finalize deployment — Neon migration complete, env vars set"
git push origin main
```

---

## Quick Reference: Running the Project

```bash
npm run dev          # Local dev server at http://localhost:3000
npm test             # Run unit tests
npm run build        # Production build
npm run db:migrate   # Apply schema to Neon database
vercel --prod        # Deploy to production
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string (from Vercel Marketplace) |
| `JWT_SECRET` | Random 32+ char string for signing session cookies |
| `ADMIN_PASSWORD` | Password to access the `/admin` dashboard |

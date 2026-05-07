# The Chosen One — Spin the Wheel Design Spec

**Date:** 2026-05-07
**Project:** The Chosen One — Classroom Recitation Randomizer
**Owner:** De La Salle Lipa, College of IT

---

## Overview

A deployed web application that lets a college professor randomly call students for recitation using an animated spin-the-wheel mechanic. Built with a Witch Hat Atelier–inspired aesthetic — elegant magical fantasy, dark academia, illuminated manuscript vibes.

The app has two modes:
- **Teacher mode** (password-gated): real student names, full section management
- **Public mode** (open): interactive wheel with anime character names — safe to link from a portfolio

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Deployment | Vercel |
| Database | Neon (Postgres) via Vercel Marketplace |
| Auth | Single `ADMIN_PASSWORD` env var + httpOnly signed cookie |
| Styling | Tailwind CSS + custom CSS (grimoire theme) |
| Fonts | Cinzel, Cormorant Garamond, EB Garamond (Google Fonts) |

---

## Visual Design

### Theme
Witch Hat Atelier — elegant magical fantasy mixed with dark academia and medieval storybook aesthetics. Feels like an ancient enchanted manuscript.

**Avoid:** cyberpunk, neon colors, glassmorphism, flat/SaaS UI, cartoonish fantasy.

### Color Palette

| Token | Hex | Use |
|---|---|---|
| `--parchment` | `#F4EBDD` | Primary background |
| `--ink` | `#1C1A1A` | Primary text |
| `--navy` | `#24324A` | Buttons, headers, wheel segments |
| `--gold` | `#C8A96B` | Accents, borders, pointer, dividers |
| `--teal` | `#5C7A7A` | Dusty teal accent |
| `--moss` | `#6E7554` | "Correct" button, strikethrough students |
| `--burgundy` | `#6A2E35` | "Skip" button, danger states |
| `--lavender` | `#A89BC7` | Soft accent, wheel segments |

### Typography
- **Headings:** Cinzel (serif, all-caps feel, fantasy novel chapter titles)
- **Body / names:** Cormorant Garamond (elegant, italic-friendly)
- **Lists / inputs:** EB Garamond

### Atmosphere Effects
- Warm parchment background with subtle paper noise texture
- Twinkling gold star canvas (60 stars, gentle opacity animation)
- Candlelight glow rising from bottom of viewport
- Floating gold particles drifting upward
- Rune ring orbiting the wheel (slow CSS rotation)
- Ornate corner flourishes (❧) on cards
- Ink-line dividers with gold `✦ ⬡ ✦` ornaments

### UI Language
- Spin button → **"Cast the Spell ✦"**
- Students → **"Apprentices"**
- Reset → **"Reset the Circle"**
- Reveal label → **"The Fates Have Spoken"**
- Section list header → **"✦ Apprentices ✦"**

---

## Data Model

```sql
sections (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  created_at  timestamptz DEFAULT now()
)

students (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  uuid REFERENCES sections(id) ON DELETE CASCADE,
  name        text NOT NULL,
  removed     boolean DEFAULT false,   -- true = answered correctly, out of spin pool
  created_at  timestamptz DEFAULT now()
)
```

`removed = true` means the student has answered correctly and is excluded from the spin pool until reset.

---

## Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Interactive wheel with anime character names |
| `/admin` | Teacher (cookie) | Full dashboard — redirects to `/admin/login` if no session |
| `/admin/login` | Public | Password entry form |

Next.js middleware protects all `/admin/*` routes — checks for a valid signed `admin_session` cookie, redirects to `/admin/login` if absent or invalid.

---

## Pages

### `/` — Public Page

- Full grimoire UI with the atmospheric effects
- Wheel uses a hardcoded list of ~80 anime/Witch Hat Atelier character names (client-side only, no DB)
- Anyone can click "Cast the Spell ✦" and spin
- Auto-resets when all names are exhausted
- No section management — single shared pool
- Real student names are never accessible from this page (no unauthenticated API routes touch the `students` table)

### `/admin/login`

- Minimal grimoire-styled page
- Single password input + submit button
- On correct password: server action sets httpOnly signed cookie, redirects to `/admin`
- On incorrect: inline error message ("The grimoire does not recognize you.")

### `/admin` — Teacher Dashboard

**Layout:**
- Section tabs along the top (`Section A`, `Section B`, `+ New Section`)
- Center/left: wheel area
- Right sidebar: apprentice list

**Section management:**
- Click tab to switch active section
- `+ New Section` opens an inline name input
- Section name is editable (click to rename)
- Sections can be deleted (with confirmation — deletes all students in that section)

**Student management (sidebar):**
- Scrollable list of all students in the active section
- Students marked correct appear with strikethrough + moss green color
- Hover reveals a trash icon to permanently remove a student from the section
- "Add apprentice…" input + `+` button at the bottom to add new students
- "Reset the Circle" button — resets all `removed = false` for the section (confirmation prompt)

---

## Wheel Behavior

1. Teacher clicks **"Cast the Spell ✦"**
2. Button disables immediately (prevents double-cast)
3. An API call (`POST /api/sections/:id/spin`) fires — server picks a random student where `removed = false` from the active section and returns the name
4. Wheel CSS animation starts: fast spin → gradual easing deceleration over ~4 seconds
5. Rune ring speeds up and slows with the wheel
6. Wheel stops — reveal card animates in (fade + scale) showing the student's name
7. **"Answered Correctly"** and **"Skip"** buttons appear

**Correct:**
- `PATCH /api/students/:id/correct` sets `removed = true`
- Student gets strikethrough in sidebar
- Reveal card clears, wheel is ready to spin again

**Skip:**
- Student stays in pool
- Reveal card clears, wheel ready to spin again

**Empty section guard:**
- If a section has zero students and the teacher clicks "Cast the Spell", the button is disabled and a tooltip reads: "Add apprentices to begin."

**Auto-reset trigger:**
- After marking a student correct, if the active pool becomes empty, a brief animation plays: `"All apprentices have spoken ✦"` then automatically resets all students in that section (`removed = false`) and continues

---

## Auth & Security

- `ADMIN_PASSWORD` stored as a Vercel environment variable (never in the repo)
- Correct password → server action creates a signed JWT stored in an httpOnly cookie (`admin_session`, 7-day expiry)
- Next.js middleware checks the cookie on every `/admin/*` request
- No unauthenticated API route touches the `students` or `sections` tables
- Password can be changed anytime via Vercel dashboard without redeployment

---

## Public Mode — Anime Name Pool

A hardcoded array of ~80 names drawn from Witch Hat Atelier characters and other well-known anime. Managed entirely client-side (React state). Examples:

> Coco, Agott, Richeh, Tetia, Qifrey, Olruggio, Beldaruit, Luluci, Custas...
> plus names from other anime (Howl, Sophie, Chihiro, Nausicaä, Kiki, etc.)

Resets automatically when exhausted. No DB involved.

---

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | None | Validates password, sets session cookie |
| `GET` | `/api/sections` | Cookie | List all sections |
| `POST` | `/api/sections` | Cookie | Create section |
| `PATCH` | `/api/sections/:id` | Cookie | Rename section |
| `DELETE` | `/api/sections/:id` | Cookie | Delete section + all students |
| `GET` | `/api/sections/:id/students` | Cookie | List students in section |
| `POST` | `/api/sections/:id/students` | Cookie | Add student |
| `DELETE` | `/api/students/:id` | Cookie | Permanently remove student |
| `POST` | `/api/sections/:id/spin` | Cookie | Pick random active student |
| `PATCH` | `/api/students/:id/correct` | Cookie | Mark student as removed |
| `POST` | `/api/sections/:id/reset` | Cookie | Reset all students in section |

---

## Out of Scope

- Multiple teacher accounts / multi-user auth
- Attendance tracking or history
- Student photos
- Mobile-specific layout (desktop-first for classroom projector use)
- Offline mode

# Portfolio Site Redesign — Design Spec

**Date:** 2026-05-06
**Status:** Approved

---

## Overview

Full redesign of Meloi Magpantay's portfolio site to reflect her personality (insightful, idealistic, empathetic), target audience (real estate agents and small business owners in the Philippines), and brand identity ("Meloi The Gym Rat Dev"). The approach is problem-solver first — leading with client outcomes, not technical stack.

---

## Brand & Personality

- **Name/Brand:** Meloi The Gym Rat Dev
- **Tagline direction:** "Your business deserves a website that works as hard as you do."
- **Personality:** Insightful, idealistic, empathetic — warm in copy, polished in design
- **Tone:** Professional but personable. Credible without being cold. Never disappears on clients.
- **Personal hook:** Consistent gym-goer. Discipline and consistency apply equally to fitness and code.

---

## Target Audience

- Real estate agents (primary — matches Property Geek case study)
- Small business owners in the Philippines
- Non-technical clients who value trust, clear communication, and results over jargon

---

## Visual System

### Color Palette
| Role | Value |
|------|-------|
| Page background | `#0f172a` (slate-900) |
| Card / surface | `#1e293b` (slate-800) |
| Border | `#334155` (slate-700) |
| Body text | `#94a3b8` (slate-400) |
| Headings | `#f8fafc` (slate-50) |
| Accent (violet) | `#a78bfa` (violet-400) |
| Accent gradient | `#6366f1` → `#a78bfa` (indigo to violet) |

### Typography
- Font: Inter (already configured via `--font-inter`)
- Headlines: `font-extrabold`, `tracking-tight`, large scale
- Eyebrow labels: `text-xs uppercase tracking-widest text-violet-400`
- Body: `leading-relaxed text-slate-400`

### Feel
Dark mode, polished, technical — signals credibility. Copy carries the warmth.

---

## Logo / Nav

**Treatment:** Stacked two-liner
- Line 1: "Meloi" — large, white, `font-extrabold`, `tracking-tight`
- Line 2: "THE GYM RAT DEV" — small, violet, `uppercase`, `tracking-widest`, `text-xs`

**Nav links:** About · Work · Services · Contact

**Nav style:** Sticky, dark background (`bg-slate-900/80`), `backdrop-blur`, subtle bottom border (`border-slate-800`)

---

## Pages

### Home (`/`)

#### Hero
- Eyebrow: `FREELANCE WEB DEVELOPER · PHILIPPINES`
- Headline: `"Your business deserves a website that works as hard as you do."`
- Subheadline: `"I build fast, modern websites for real estate agents and small businesses. Clear communication, honest pricing, and no disappearing acts."`
- CTA primary: "Let's talk →" (gradient button: `#6366f1` → `#a78bfa`)
- CTA secondary: "See my work" (ghost/outline button)
- Trust indicators (3 dark cards below CTAs):
  - `2+` Projects
  - `PH` Based
  - `✓` Available Now

#### About Teaser
- Real photo of Meloi — place at `public/images/meloi.jpg` (user to supply; component references this path)
- Photo style: square, `rounded-2xl`, violet ring (`ring-2 ring-violet-500`)
- Bio: *"I'm Meloi — a web developer based in the Philippines. I build fast, modern websites for real estate agents and small businesses who are serious about their online presence. When I'm not coding, I'm at the gym. Consistency is how I approach both."*
- Link: "More about me →"

#### Services (3 cards)
| Service | Description | Price |
|---------|-------------|-------|
| Landing Pages | Single-page marketing sites built for conversion. Fast, mobile-first, SEO-ready. | From ₱22,000 |
| Full Websites | 5–10 page sites with CMS, blog, and contact forms. Perfect for small businesses and real estate agents. | From ₱65,000 |
| Web Applications | Custom dashboards, internal tools, and MVPs built with Next.js, Node.js, and MongoDB. | From ₱135,000 |

#### Featured Work (2 cards)
- **Property Geek** — Real estate site for a licensed PRC broker. Next.js 15, TypeScript, Tailwind CSS. Badge: "Client Project"
- **Natours** — Tour booking web app. Node.js, Express, MongoDB, Stripe. Published on Render. Badge: "Practice Project"

#### CTA Strip
- Headline: `"Ready to build something?"`
- Subheadline: `"Let's talk about your project."`
- Button: "Get in touch →"

---

### About (`/about`)

#### Bio (3 paragraphs)
1. Introduction — who Meloi is, where she's based, who she builds for
2. Approach — understand the problem, design the smallest solution, ship it, iterate. No surprises, no ghost.
3. Personal — consistent at the gym; that same discipline applies to code and client work

#### Skills Grid
| Group | Items |
|-------|-------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, HTML & CSS |
| Backend | Node.js, Express, REST APIs, MongoDB, Authentication |
| Tooling & Deploy | Git & GitHub, Vercel, Cloudflare, Figma, VS Code |

#### Process Steps
1. **Discovery** — Talk about goals, audience, constraints. Return a scoped proposal with timeline and fixed price.
2. **Design & Build** — Design in the browser, share a preview URL updated every few days. No surprises at the end.
3. **Launch & Support** — Polished handoff, deployment, 30 days of free bug fixes and small tweaks.

#### CTA
- Link to `/contact`

---

### Work (`/work`)

- Grid of project cards
- **Property Geek** — badge: `Client Project` (violet)
- **Natours** — badge: `Practice Project` (slate, no violet — honest distinction)
- Each card: title, badge, one-line summary, stack tags, year, link to case study

#### Project: Property Geek (`/work/property-geek`)
- Client: Jireh Mamaclay — licensed PRC real estate broker, Area Champion of the South (AyalaLand, Greenfield, Rockwell)
- Role: Design & Development
- Stack: Next.js 15, TypeScript, Tailwind CSS v4
- Story:
  - **The problem:** A licensed real estate broker with premium partnerships (AyalaLand, Greenfield, Rockwell) had no professional web presence. Clients were referred via word-of-mouth with nothing to land on.
  - **The approach:** Built a fast, SEO-optimised landing site with listings, an about section, and a contact form. Designed for trust — clean layout, real photography, clear calls to action.
  - **The result:** A professional online presence that matches the quality of her partnerships. Ready to scale with a lead CRM in Phase 2.

#### Project: Natours (`/work/natours`)
- Role: Developer (self-directed learning project)
- Stack: Node.js, Express, MongoDB, Stripe, Pug templates
- Live: Published on Render
- Story:
  - **The project:** A full-stack tour booking web application built while completing Jonas Schmedtmann's Node.js course. Covers authentication, payments, REST API design, and deployment.
  - **What I built:** User auth (JWT), Stripe checkout, CRUD for tours and bookings, admin dashboard, email notifications, and a live Render deployment.
  - **What I learned:** Backend architecture, API security, and production deployment — the foundation for every web app I build for clients.

---

### Services (`/services`)

- Page header: "What I Build"
- 3 service cards (same as homepage)
- Process summary below cards (condensed version of the 3 steps)
- CTA: "Have a project in mind? Let's talk."

---

### Contact (`/contact`)

- Intro: *"Got a project in mind? Tell me about it — I read every message."*
- Form fields: Name, Email, Message, Submit
- Below form: email link + GitHub + LinkedIn icons
- Availability badge: "Currently available for new projects"

---

## Content Replacements

| Location | Old | New |
|----------|-----|-----|
| `content/site.ts` → `name` | "Meloi Magpantay" | "Meloi Magpantay" (keep legal name) |
| `content/site.ts` → `role` | "Freelance Web Developer" | "Freelance Web Developer" |
| `content/site.ts` → `email` | `hello@meloi.dev` | `meloi.m.magpantay@gmail.com` |
| `content/about.ts` → `bio.long[2]` | hobby placeholder | gym/consistency line |
| `content/projects.ts` | 3 placeholder projects | Property Geek + Natours |
| `components/footer.tsx` | hardcoded placeholder URLs | import from `siteConfig` (GitHub, LinkedIn, email already defined there) |
| `components/nav.tsx` | plain name logo | stacked two-liner logo |
| Tailwind dark theme | light neutral palette | dark slate + violet accent |

---

## Tailwind Config Changes

- Add `colors.slate` and `colors.violet` explicitly (or rely on defaults — both are included in Tailwind v3 core)
- Add `backgroundImage` for gradient: `'brand-gradient': 'linear-gradient(135deg, #6366f1, #a78bfa)'`
- Dark mode: write dark styles directly using Tailwind's `bg-slate-*`, `text-slate-*` classes — no `darkMode: 'class'` toggle needed since the entire site is always dark

---

## Files to Change

| File | Change |
|------|--------|
| `tailwind.config.ts` | Add gradient utility, confirm dark defaults |
| `app/layout.tsx` | Add dark background to `<body>`, update metadata |
| `components/nav.tsx` | Stacked logo, dark nav styles |
| `components/footer.tsx` | Real social links, dark styles |
| `components/sections/hero.tsx` | Full rewrite — new copy, gradient CTA, trust indicators |
| `components/sections/about-teaser.tsx` | Real photo, new bio copy, dark styles |
| `components/sections/services.tsx` | PHP pricing, dark card styles |
| `components/sections/featured-work.tsx` | Real projects, badges, dark styles |
| `components/sections/cta.tsx` | New copy, dark styles |
| `components/page-header.tsx` | Dark styles |
| `content/site.ts` | Email, availability |
| `content/about.ts` | Full bio rewrite, gym line |
| `content/projects.ts` | Replace all 3 placeholders with Property Geek + Natours |
| `content/services.ts` | PHP pricing, updated descriptions |
| `app/about/page.tsx` | Dark styles |
| `app/services/page.tsx` | Dark styles |
| `app/work/page.tsx` | Project badges, dark styles |
| `app/work/[slug]/page.tsx` | Dark styles, case study layout |
| `app/contact/page.tsx` | New intro copy, dark styles |

---

## Out of Scope

- CMS integration
- Blog
- Analytics
- Real domain/DNS setup
- Phase 2 features for Property Geek (lead CRM)

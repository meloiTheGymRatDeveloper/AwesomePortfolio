# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint check
```

No test suite is configured.

## File structure

```
├── app/
│   ├── layout.tsx              # Root layout (Nav + Footer wrapper)
│   ├── page.tsx                # Home page (composes section components)
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── work/
│   │   ├── page.tsx            # All projects listing
│   │   └── [slug]/page.tsx     # Case study detail page
│   ├── contact/page.tsx
│   ├── api/contact/route.ts    # Contact form API (Resend)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx
├── components/
│   ├── container.tsx           # Max-width wrapper used everywhere
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── page-header.tsx         # Eyebrow/title/description block for inner pages
│   ├── contact-form.tsx        # Client component
│   └── sections/               # Homepage sections (Hero, Services, FeaturedWork, CTA, AboutTeaser)
├── content/                    # All site data as flat TS files (no CMS)
│   ├── site.ts                 # Name, email, URL, socials, availability
│   ├── projects.ts             # Project list + getProject(slug)
│   ├── services.ts             # Services list with icons and pricing
│   └── about.ts                # About page copy
├── hooks/                      # Custom React hooks
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
├── types/
│   └── resend.d.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Architecture

This is a Next.js 15 (App Router) portfolio site using TypeScript and Tailwind CSS.

### Content layer (`content/`)

All site data lives in flat TypeScript files — no CMS, no database. To update personal info, services, or projects, edit these files directly:

- `content/site.ts` — single source of truth for name, email, URL, socials, availability status. Consumed by layout metadata, nav, footer, and contact page.
- `content/projects.ts` — array of `Project` objects with a `story[]` field for case-study detail pages. `getProject(slug)` is the only query helper.
- `content/services.ts` — array of `Service` objects including a `LucideIcon` reference rendered directly in the component.
- `content/about.ts` — about page copy.

### Pages (`app/`)

Each route is a server component. The home page (`app/page.tsx`) composes section components. Dynamic route `app/work/[slug]/page.tsx` calls `getProject(slug)` and 404s if not found.

`app/api/contact/route.ts` is the only API route. It validates the form payload and sends via **Resend**. Without `RESEND_API_KEY` set it logs to the console and returns `{ ok: true, dev: true }` — safe to use in dev with no env setup.

### Components

- `components/container.tsx` — wraps content in `max-w-container` (1120 px) with horizontal padding. Used in every section and page.
- `components/sections/` — homepage sections (Hero, Services, FeaturedWork, CTA). Each is a self-contained server component.
- `components/page-header.tsx` — reusable eyebrow/title/description header used on inner pages.
- `components/contact-form.tsx` — client component that POSTs to `/api/contact`.

### Hooks (`hooks/`)

Custom React hooks go here. Import them with `@/hooks/use-whatever`.

### Styling

Tailwind only — no CSS modules. The `cn()` utility (`lib/utils.ts`) combines `clsx` + `tailwind-merge` and should be used for any conditional or merged class strings. The design uses a neutral palette with `neutral-900` for headings and `neutral-600` for body text.

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `RESEND_API_KEY` | Sends contact form emails via Resend | No (dev falls back to console log) |
| `CONTACT_EMAIL_TO` | Recipient address for contact emails | No (defaults to `hello@example.com`) |
| `CONTACT_EMAIL_FROM` | Sender address shown in email | No (defaults to Resend onboarding address) |

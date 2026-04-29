# Meloi Magpantay — Portfolio Site

Personal freelance portfolio built with Next.js 15, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, for the contact form
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## Stack

- **Next.js 15** — App Router, React Server Components
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3.4**
- **Lucide React** — icon library
- **Resend** — transactional email for the contact form
- **clsx + tailwind-merge** — class composition (`cn` helper)

## Project structure

```
portfolio-site/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout: fonts, Nav, Footer, metadata
│   ├── page.tsx                 # Home (Hero, About teaser, Services, Work, CTA)
│   ├── globals.css              # Tailwind + CSS variables
│   ├── not-found.tsx            # Custom 404
│   ├── opengraph-image.tsx      # Auto-generated OG image
│   ├── sitemap.ts               # /sitemap.xml
│   ├── robots.ts                # /robots.txt
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── work/
│   │   ├── page.tsx             # /work index
│   │   └── [slug]/page.tsx      # Dynamic case study
│   ├── contact/page.tsx
│   └── api/
│       └── contact/route.ts     # POST handler for the form
│
├── components/                  # Reusable components
│   ├── nav.tsx                  # Sticky top nav with backdrop blur
│   ├── footer.tsx               # Footer with social links
│   ├── container.tsx            # Max-width wrapper
│   ├── page-header.tsx          # Inner-page header (eyebrow + title + desc)
│   ├── contact-form.tsx         # Client-side form with submit states
│   └── sections/                # Home page sections
│       ├── hero.tsx
│       ├── about-teaser.tsx
│       ├── services.tsx
│       ├── featured-work.tsx
│       └── cta.tsx
│
├── content/                     # Site copy & data — edit these to update copy
│   ├── site.ts                  # Name, role, URL, email, socials
│   ├── about.ts                 # Bio, skills, process
│   ├── services.ts              # Service packages (also used on home)
│   └── projects.ts              # Case study metadata + story sections
│
├── lib/
│   └── utils.ts                 # cn() helper
│
├── types/
│   └── resend.d.ts              # Ambient types so it compiles without resend installed
│
├── public/                      # Static assets — drop favicon/portrait/screenshots here
│
├── .env.example                 # Copy to .env.local and fill in
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Editing content

Almost everything you'll want to change lives in `content/`:

- **`content/site.ts`** — your name, role, URL, email, social links.
- **`content/about.ts`** — bio paragraphs, skills, process steps.
- **`content/services.ts`** — the three service packages (title, description, price, icon). Used on `/` and `/services`.
- **`content/projects.ts`** — case studies. Each project has `slug`, `title`, `summary`, `stack`, plus optional `client`, `role`, `duration`, `liveUrl`, and a `story` array of `{heading, body}` sections rendered on `/work/[slug]`.

Pages don't hardcode copy — they pull from these files, so you don't have to dig through JSX to fix a typo.

## Adding images

Drop files into `/public` and reference them by absolute path (`/portrait.jpg`, `/work/project-one.png`). Recommended:

| File | Purpose | Suggested size |
|---|---|---|
| `/public/portrait.jpg` | About teaser + About page | 800×800 |
| `/public/work/project-*.png` | Project screenshots | 1600×1200 |
| `/public/favicon.ico` | Browser tab icon | 32×32 |
| `/public/apple-touch-icon.png` | iOS home screen | 180×180 |

The placeholder gray boxes in `about-teaser.tsx`, `featured-work.tsx`, and `work/[slug]/page.tsx` have inline comments showing the exact `<Image>` snippet to swap in.

## Contact form

The contact form posts to `/api/contact`, which sends an email via [Resend](https://resend.com).

**Without setup:** if `RESEND_API_KEY` isn't set, the API logs the submission to the server console and returns success. This lets you test the UX before signing up for Resend.

**With setup:**
1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day).
2. Verify a sender domain or use the default `onboarding@resend.dev`.
3. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY=re_...`
   - `CONTACT_EMAIL_TO=your-email@example.com`
   - `CONTACT_EMAIL_FROM=Portfolio Contact <contact@yourdomain.com>`
4. Restart `npm run dev`.

In Vercel, add the same env vars under Project Settings → Environment Variables.

## Deploy

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add env vars (above).
4. Done. Custom domain is added under Project Settings → Domains once you've bought one.

## What's still placeholder

These are intentionally generic — replace as you have content:

- All copy on `/about` (bio paragraphs, the `[hobby/interest placeholder]` line)
- The three service prices
- All three projects in `content/projects.ts` (currently "Project One/Two/Three")
- Social links in `content/site.ts` (currently `github.com/meloi`, etc.)
- Email address in `content/site.ts` (currently `hello@meloi.dev`)
- All gray placeholder image boxes — see "Adding images" above

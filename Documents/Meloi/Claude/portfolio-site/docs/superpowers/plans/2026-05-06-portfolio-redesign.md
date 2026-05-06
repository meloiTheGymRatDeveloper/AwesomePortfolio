# Portfolio Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from a light neutral placeholder site to a dark, violet-accented personal brand for "Meloi The Gym Rat Dev" with real content, PHP pricing, and a problem-solver-first approach targeting real estate agents and small business owners in the Philippines.

**Architecture:** All content lives in flat TypeScript files under `content/` — no CMS. Components are Next.js 15 App Router server components styled with Tailwind CSS. The dark theme is applied by replacing `neutral-*` Tailwind classes with `slate-*` and adding `violet-*` accent colors. No dark mode toggle — the entire site is always dark.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v3, Inter font, Lucide React icons, Next.js Image

---

## File Map

| File | Action |
|------|--------|
| `content/site.ts` | Update email, title |
| `content/about.ts` | Full bio rewrite with gym line |
| `content/projects.ts` | Replace placeholders with Property Geek + Natours; add `projectType` field |
| `content/services.ts` | PHP pricing, updated Full Websites description |
| `app/globals.css` | Update CSS variables to dark slate palette |
| `tailwind.config.ts` | No changes needed — slate/violet already in Tailwind v3 defaults |
| `app/layout.tsx` | Remove body color class (globals.css handles it) |
| `components/nav.tsx` | Stacked two-liner logo, dark nav styles |
| `components/footer.tsx` | Import socials from siteConfig, dark styles |
| `components/page-header.tsx` | Dark styles |
| `components/sections/hero.tsx` | Full rewrite — new copy, gradient CTA, trust indicators |
| `components/sections/about-teaser.tsx` | Real photo path, new bio, dark styles |
| `components/sections/services.tsx` | Dark card styles |
| `components/sections/featured-work.tsx` | Project type badges, dark styles |
| `components/sections/cta.tsx` | New copy, dark styles |
| `app/about/page.tsx` | Dark styles, real photo via Next.js Image |
| `app/work/page.tsx` | Project type badges, dark styles |
| `app/work/[slug]/page.tsx` | Dark styles |
| `app/services/page.tsx` | Dark styles |
| `app/contact/page.tsx` | New intro copy, dark styles |

---

## Task 1: Update Content Files

**Files:**
- Modify: `content/site.ts`
- Modify: `content/about.ts`
- Modify: `content/projects.ts`
- Modify: `content/services.ts`

- [ ] **Step 1: Update site.ts**

Replace the entire file:

```typescript
export const siteConfig = {
  name: "Meloi Magpantay",
  shortName: "Meloi",
  role: "Freelance Web Developer",
  title: "Meloi The Gym Rat Dev — Freelance Web Developer",
  description:
    "Freelance web developer building fast, modern websites for real estate agents and small businesses in the Philippines.",
  url: "https://meloi.dev",
  email: "meloi.m.magpantay@gmail.com",
  location: "Philippines",
  available: true,
  socials: {
    github: "https://github.com/meloi",
    linkedin: "https://www.linkedin.com/in/meloi",
    twitter: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
```

- [ ] **Step 2: Update about.ts**

Replace the entire file:

```typescript
export const bio = {
  short:
    "I'm Meloi — a web developer based in the Philippines, building modern websites for real estate agents and small businesses who are serious about their online presence.",
  long: [
    "I'm Meloi — a web developer based in the Philippines. I build fast, modern websites for real estate agents and small businesses who need a professional online presence without the corporate runaround. My clients are people who care deeply about their business and want a developer who does too.",
    "My approach is simple: understand the problem first, design the smallest thing that solves it, then ship it. I share preview links early and often, communicate through every step, and don't disappear after launch. Every project includes 30 days of post-launch support — no extra charge.",
    "When I'm not coding, I'm at the gym. Consistency is how I approach both — show up, do the work, get better. It's the same discipline I bring to every project.",
  ],
};

export const skillGroups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML & CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "MongoDB", "Authentication"],
  },
  {
    title: "Tooling & Deploy",
    items: ["Git & GitHub", "Vercel", "Cloudflare", "Figma", "VS Code"],
  },
];

export const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We talk about your goals, audience, and constraints. I return a scoped proposal with timeline and fixed price.",
  },
  {
    step: "02",
    title: "Design & Build",
    description:
      "I design in the browser and share a preview URL you can check every few days. No surprises at the end.",
  },
  {
    step: "03",
    title: "Launch & Support",
    description:
      "I hand off a polished site, deploy it, and stick around for 30 days of free bug fixes and small tweaks.",
  },
];
```

- [ ] **Step 3: Update projects.ts**

Replace the entire file:

```typescript
export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  year: number;
  client?: string;
  role?: string;
  duration?: string;
  liveUrl?: string;
  projectType?: "client" | "practice";
  story?: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "property-geek",
    title: "Property Geek",
    summary:
      "A professional real estate website for a licensed PRC broker with partnerships at AyalaLand, Greenfield, and Rockwell.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
    year: 2025,
    client: "Jireh Mamaclay",
    role: "Design & Development",
    duration: "3 weeks",
    liveUrl: "",
    projectType: "client",
    story: [
      {
        heading: "The problem",
        body: "A licensed real estate broker with premium partnerships — AyalaLand, Greenfield, and Rockwell — had no professional web presence. Every client lead came through word-of-mouth with nothing to land on, no listings to browse, and no way to verify credibility online.",
      },
      {
        heading: "The approach",
        body: "I built a fast, SEO-optimised landing site with property listings, an about section showcasing her credentials, and a contact form. The design prioritised trust — clean layout, clear calls to action, and a structure that could scale into a full listing platform in Phase 2.",
      },
      {
        heading: "The result",
        body: "A professional online presence that matches the quality of her developer partnerships. The site establishes credibility immediately and gives potential buyers a clear path to get in touch.",
      },
    ],
  },
  {
    slug: "natours",
    title: "Natours",
    summary:
      "A full-stack tour booking web app with authentication, Stripe payments, and a live deployment on Render.",
    stack: ["Node.js", "Express", "MongoDB", "Stripe"],
    year: 2024,
    role: "Developer",
    duration: "6 weeks",
    liveUrl: "",
    projectType: "practice",
    story: [
      {
        heading: "The project",
        body: "A full-stack tour booking web application built while completing Jonas Schmedtmann's Node.js course. The scope covers authentication, payments, REST API design, and production deployment — a deliberate exercise in backend fundamentals.",
      },
      {
        heading: "What I built",
        body: "User authentication with JWT, Stripe checkout for bookings, full CRUD for tours and reservations, an admin dashboard, email notifications via Nodemailer, and a live Render deployment with environment-based configuration.",
      },
      {
        heading: "What I learned",
        body: "Backend architecture, API security patterns, and what production deployment actually involves. These are the foundations I bring to every client web app I build — Natours is where I proved I could do it end to end.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 4: Update services.ts**

Replace the entire file:

```typescript
import { Layers, Globe, Terminal, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  startingPrice: string;
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Landing Pages",
    description:
      "Single-page marketing sites built for conversion. Fast, mobile-first, SEO-ready.",
    startingPrice: "From ₱22,000",
    Icon: Layers,
  },
  {
    title: "Full Websites",
    description:
      "5–10 page sites with CMS, blog, and contact forms. Perfect for small businesses and real estate agents.",
    startingPrice: "From ₱65,000",
    Icon: Globe,
  },
  {
    title: "Web Applications",
    description:
      "Custom dashboards, internal tools, and MVPs built with Next.js, Node.js, and MongoDB.",
    startingPrice: "From ₱135,000",
    Icon: Terminal,
  },
];
```

- [ ] **Step 5: Verify — check for TypeScript errors**

```bash
npm run lint
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add content/site.ts content/about.ts content/projects.ts content/services.ts
git commit -m "feat: update all content — real projects, PHP pricing, gym bio"
```

---

## Task 2: Dark Theme Foundation

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update CSS variables to dark slate palette**

Replace the entire file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --muted: 215 20% 65%;
    --border: 217 33% 17%;
    --accent: 258 90% 66%;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-feature-settings: "cv11", "ss01", "ss03";
  }

  ::selection {
    background-color: hsl(var(--accent));
    color: hsl(var(--foreground));
  }
}
```

- [ ] **Step 2: Start dev server and verify dark background loads**

```bash
npm run dev
```

Open http://localhost:3000. The page background should now be dark navy (#0f172a). Text may look unstyled — that's expected until component classes are updated in later tasks.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: dark slate theme CSS variables"
```

---

## Task 3: Nav, Footer, and Page Header

**Files:**
- Modify: `components/nav.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/page-header.tsx`

- [ ] **Step 1: Update nav.tsx — stacked logo + dark styles**

Replace the entire file:

```typescript
import Link from "next/link";
import Container from "./container";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-tight text-slate-50 transition-colors hover:text-violet-400">
            Meloi
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">
            The Gym Rat Dev
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slate-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
```

- [ ] **Step 2: Update footer.tsx — pull from siteConfig + dark styles**

Replace the entire file:

```typescript
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Container from "./container";
import { siteConfig } from "@/content/site";

const socials = [
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
  { href: siteConfig.socials.github, label: "GitHub", Icon: Github },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-10 text-sm text-slate-500">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Meloi Magpantay. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {socials.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors hover:text-slate-50"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 3: Update page-header.tsx — dark styles**

Replace the entire file:

```typescript
import Container from "./container";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="border-b border-slate-800 py-20 md:py-28">
      <Container>
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-violet-400">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-50 md:text-5xl md:leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Verify nav and footer render correctly**

With `npm run dev` still running, open http://localhost:3000. You should see:
- Dark sticky nav with "Meloi / THE GYM RAT DEV" stacked logo in top-left
- Violet accent on "The Gym Rat Dev" line
- Dark footer with real social icon links

- [ ] **Step 5: Commit**

```bash
git add components/nav.tsx components/footer.tsx components/page-header.tsx
git commit -m "feat: dark nav with stacked logo, footer from siteConfig, dark page-header"
```

---

## Task 4: Hero Section

**Files:**
- Modify: `components/sections/hero.tsx`

- [ ] **Step 1: Rewrite hero.tsx**

Replace the entire file:

```typescript
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../container";

export default function Hero() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-violet-400">
          Freelance Web Developer · Philippines
        </p>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-50 md:text-6xl md:leading-[1.05]">
          Your business deserves a website that works as hard as you do.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          I build fast, modern websites for real estate agents and small
          businesses. Clear communication, honest pricing, and no disappearing
          acts.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Let&apos;s talk
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-50"
          >
            See my work
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm">
          <div className="rounded-xl bg-slate-800 p-4 text-center ring-1 ring-slate-700">
            <p className="text-xl font-extrabold text-violet-400">2+</p>
            <p className="mt-1 text-xs text-slate-500">Projects</p>
          </div>
          <div className="rounded-xl bg-slate-800 p-4 text-center ring-1 ring-slate-700">
            <p className="text-xl font-extrabold text-violet-400">PH</p>
            <p className="mt-1 text-xs text-slate-500">Based</p>
          </div>
          <div className="rounded-xl bg-slate-800 p-4 text-center ring-1 ring-slate-700">
            <p className="text-xl font-extrabold text-violet-400">✓</p>
            <p className="mt-1 text-xs text-slate-500">Available</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify hero in browser**

Open http://localhost:3000. You should see:
- Violet eyebrow text: "FREELANCE WEB DEVELOPER · PHILIPPINES"
- Large bold headline on dark background
- Gradient "Let's talk" button and outline "See my work" button
- 3 dark stat cards below

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat: new hero section — outcome-first headline, gradient CTA, trust indicators"
```

---

## Task 5: About Teaser Section

**Files:**
- Modify: `components/sections/about-teaser.tsx`

- [ ] **Step 1: Update about-teaser.tsx — real photo path, new bio, dark styles**

Replace the entire file:

```typescript
import Image from "next/image";
import Link from "next/link";
import Container from "../container";
import { bio } from "@/content/about";

export default function AboutTeaser() {
  return (
    <section className="border-t border-slate-800 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl ring-2 ring-violet-500/40">
            <Image
              src="/images/meloi.jpg"
              alt="Meloi Magpantay"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-violet-400">
              About
            </p>
            <p className="text-2xl font-medium leading-relaxed tracking-tight text-slate-50 md:text-3xl md:leading-snug">
              {bio.short}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-slate-50 hover:underline"
            >
              More about me →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Place your photo**

Copy your photo to `public/images/meloi.jpg`. The component references this exact path. If you haven't added the photo yet, the Image component will show a broken image — that's fine to fix later.

- [ ] **Step 3: Verify in browser**

Open http://localhost:3000. The about teaser should show your photo (or a broken image placeholder if not yet added) with the updated bio text on dark background.

- [ ] **Step 4: Commit**

```bash
git add components/sections/about-teaser.tsx
git commit -m "feat: about teaser — real photo path, updated bio, dark styles"
```

---

## Task 6: Services, FeaturedWork, and CTA Sections

**Files:**
- Modify: `components/sections/services.tsx`
- Modify: `components/sections/featured-work.tsx`
- Modify: `components/sections/cta.tsx`

- [ ] **Step 1: Update services.tsx — dark card styles**

Replace the entire file:

```typescript
import { services } from "@/content/services";
import Container from "../container";

export default function Services() {
  return (
    <section id="services" className="border-t border-slate-800 py-20 md:py-28">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
            What I do
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl">
            Services built for businesses that mean it.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700"
            >
              <service.Icon size={22} className="mb-5 text-violet-400" />
              <h3 className="text-lg font-semibold text-slate-50">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
              <p className="mt-6 text-sm font-semibold text-violet-400">
                {service.startingPrice}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update featured-work.tsx — project type badges + dark styles**

Replace the entire file:

```typescript
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import Container from "../container";

export default function FeaturedWork() {
  const featured = projects.slice(0, 2);

  return (
    <section id="work" className="border-t border-slate-800 py-20 md:py-28">
      <Container>
        <div className="mb-14 flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
              Featured work
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl">
              Selected projects.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-slate-50 hover:underline md:inline"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800 ring-1 ring-slate-700 transition-all group-hover:ring-violet-500/50">
                <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-slate-600">
                  {project.title}
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-50">
                      {project.title}
                    </h3>
                    {project.projectType === "client" && (
                      <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400 ring-1 ring-violet-500/30">
                        Client
                      </span>
                    )}
                    {project.projectType === "practice" && (
                      <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-400 ring-1 ring-slate-600">
                        Practice
                      </span>
                    )}
                  </div>
                  <p className="mt-1 max-w-md text-sm text-slate-400">
                    {project.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-700 px-2.5 py-0.5 text-xs text-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Update cta.tsx — new copy + dark styles**

Replace the entire file:

```typescript
import Link from "next/link";
import Container from "../container";

export default function CTA() {
  return (
    <section className="border-t border-slate-800 py-24 md:py-32">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-slate-50 md:text-5xl md:leading-[1.1]">
          Ready to build something?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
          Let&apos;s talk about your project.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Get in touch →
        </Link>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Verify homepage in browser**

Open http://localhost:3000. Check all sections:
- Hero: dark bg, gradient button, trust cards
- About teaser: photo, bio, dark bg
- Services: dark cards with violet icons and prices in ₱
- Featured Work: Property Geek (Client badge) and Natours (Practice badge)
- CTA: gradient button, dark bg

- [ ] **Step 5: Commit**

```bash
git add components/sections/services.tsx components/sections/featured-work.tsx components/sections/cta.tsx
git commit -m "feat: dark homepage sections — services cards, project badges, new CTA copy"
```

---

## Task 7: About Page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Update app/about/page.tsx — dark styles + real photo**

Replace the entire file:

```typescript
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import CTA from "@/components/sections/cta";
import { bio, skillGroups, process } from "@/content/about";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: bio.short,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Hi, I'm Meloi. I build websites that get out of the way."
        description={bio.short}
      />

      {/* Bio + portrait */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl ring-2 ring-violet-500/40">
              <Image
                src="/images/meloi.jpg"
                alt="Meloi Magpantay"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-5">
              {bio.long.map((para, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-slate-400">
                  {para}
                </p>
              ))}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Work with me
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-50"
                >
                  See my work
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="border-t border-slate-800 py-20 md:py-28">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
              Skills
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl">
              What I work with.
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-50">
                  {group.title}
                </h3>
                <ul className="space-y-2 text-slate-400">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-slate-800 py-20 md:py-28">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
              How I work
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl">
              A simple, honest process.
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.step} className="flex flex-col">
                <span className="mb-5 font-mono text-sm text-violet-400">
                  {p.step}
                </span>
                <h3 className="text-lg font-semibold text-slate-50">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
```

- [ ] **Step 2: Verify /about in browser**

Open http://localhost:3000/about. Check:
- Dark page header with violet eyebrow
- Bio paragraphs including gym line as the third paragraph
- Gradient "Work with me" button
- Skills and process sections on dark background with violet accents

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: about page — dark styles, real photo, gym bio, violet accents"
```

---

## Task 8: Work Pages

**Files:**
- Modify: `app/work/page.tsx`
- Modify: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Update app/work/page.tsx — project type badges + dark styles**

Replace the entire file:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import CTA from "@/components/sections/cta";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description:
    "Selected client and personal projects — websites and web apps built with modern tooling.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected projects."
        description="A handful of projects — each one a chance to solve a real problem with clean code."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800 ring-1 ring-slate-700 transition-all group-hover:ring-violet-500/50">
                  <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-slate-600">
                    {project.title}
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>{project.year}</span>
                      {project.client && (
                        <>
                          <span>·</span>
                          <span>{project.client}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-slate-50">
                        {project.title}
                      </h2>
                      {project.projectType === "client" && (
                        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400 ring-1 ring-violet-500/30">
                          Client
                        </span>
                      )}
                      {project.projectType === "practice" && (
                        <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-400 ring-1 ring-slate-600">
                          Practice
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-md text-sm text-slate-400">
                      {project.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-700 px-2.5 py-0.5 text-xs text-slate-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
```

- [ ] **Step 2: Update app/work/[slug]/page.tsx — dark styles**

Replace the entire file:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "@/components/container";
import CTA from "@/components/sections/cta";
import { projects, getProject } from "@/content/projects";
import { siteConfig } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* Header */}
      <section className="border-b border-slate-800 py-20 md:py-28">
        <Container>
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-50"
          >
            <ArrowLeft size={16} />
            All work
          </Link>

          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>{project.year}</span>
            {project.client && (
              <>
                <span>·</span>
                <span>{project.client}</span>
              </>
            )}
            {project.projectType === "client" && (
              <>
                <span>·</span>
                <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400 ring-1 ring-violet-500/30">
                  Client Project
                </span>
              </>
            )}
            {project.projectType === "practice" && (
              <>
                <span>·</span>
                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-400 ring-1 ring-slate-600">
                  Practice Project
                </span>
              </>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-50 md:text-5xl md:leading-[1.1]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {project.summary}
          </p>
        </Container>
      </section>

      {/* Hero image placeholder */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-slate-700">
            <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-slate-600">
              {project.title} — screenshot
            </div>
          </div>
        </Container>
      </section>

      {/* Meta grid */}
      <section className="py-8">
        <Container>
          <div className="grid gap-8 border-y border-slate-800 py-8 md:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Client
              </p>
              <p className="mt-2 text-slate-300">{project.client ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Role
              </p>
              <p className="mt-2 text-slate-300">{project.role ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Duration
              </p>
              <p className="mt-2 text-slate-300">{project.duration ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Stack
              </p>
              <p className="mt-2 text-slate-300">{project.stack.join(", ")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story sections */}
      {project.story && (
        <section className="py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-12">
              {project.story.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-50 md:text-3xl">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-400">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Live link */}
      {project.liveUrl && (
        <section className="py-12">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Visit live site
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Next project */}
      <section className="border-t border-slate-800 py-16 md:py-20">
        <Container>
          <Link href={`/work/${nextProject.slug}`} className="group block">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Next project
            </p>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-50 md:text-3xl">
                {nextProject.title}
              </h3>
              <ArrowUpRight
                size={22}
                className="shrink-0 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
              />
            </div>
          </Link>
        </Container>
      </section>

      <CTA />
    </>
  );
}
```

- [ ] **Step 3: Verify /work and case study pages in browser**

- Open http://localhost:3000/work — should show Property Geek (violet "Client" badge) and Natours ("Practice" badge)
- Click Property Geek → should show the full case study with dark styles and "Client Project" badge in the header
- Click Natours → should show the backend case study with "Practice Project" badge

- [ ] **Step 4: Commit**

```bash
git add app/work/page.tsx "app/work/[slug]/page.tsx"
git commit -m "feat: work pages — project type badges, dark styles, real case study copy"
```

---

## Task 9: Services and Contact Pages

**Files:**
- Modify: `app/services/page.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Update app/services/page.tsx — dark styles**

Replace the entire file:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import CTA from "@/components/sections/cta";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Services — ${siteConfig.name}`,
  description:
    "Landing pages, full websites, and web applications. Clear scope, fixed pricing, PHP rates.",
};

const serviceDetails: Record<
  string,
  { timeline: string; deliverables: string[] }
> = {
  "Landing Pages": {
    timeline: "1–2 weeks",
    deliverables: [
      "Single-page responsive design",
      "Copywriting guidance + SEO basics",
      "Contact form with email delivery",
      "Deployed on Vercel with custom domain",
      "1 round of revisions",
    ],
  },
  "Full Websites": {
    timeline: "3–5 weeks",
    deliverables: [
      "Up to 10 pages + blog",
      "Headless CMS so you can edit content yourself",
      "Responsive design + accessibility pass",
      "SEO setup (sitemap, meta, OG images)",
      "30 days of post-launch bug fixes",
    ],
  },
  "Web Applications": {
    timeline: "4–8 weeks",
    deliverables: [
      "Custom UI and API",
      "User authentication and roles",
      "Database design (MongoDB or Postgres)",
      "Payment integration if needed (Stripe)",
      "Deployment, monitoring, and handoff",
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Clear scope, fixed pricing, no surprises."
        description="Pick the package that fits your project, or get in touch for something custom. Every engagement starts with a short discovery call."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-10">
            {services.map((service) => {
              const details = serviceDetails[service.title];
              return (
                <article
                  key={service.title}
                  className="grid gap-8 rounded-2xl border border-slate-700 bg-slate-800 p-8 md:grid-cols-[1fr_1.5fr] md:p-12"
                >
                  <div>
                    <service.Icon size={28} className="mb-6 text-violet-400" />
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-50 md:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-slate-400">{service.description}</p>
                    <div className="mt-8 space-y-1 text-sm">
                      <p className="text-slate-500">Starting at</p>
                      <p className="text-xl font-semibold text-violet-400">
                        {service.startingPrice}
                      </p>
                    </div>
                    {details && (
                      <div className="mt-6 space-y-1 text-sm">
                        <p className="text-slate-500">Timeline</p>
                        <p className="font-medium text-slate-300">
                          {details.timeline}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-50">
                      What&apos;s included
                    </h3>
                    {details && (
                      <ul className="space-y-3">
                        {details.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-slate-400"
                          >
                            <Check
                              size={18}
                              className="mt-0.5 shrink-0 text-violet-400"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-violet-500 hover:text-slate-50"
                    >
                      Request a quote
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-16 max-w-xl text-sm text-slate-500">
            Need something that doesn&apos;t fit these packages? I also take on
            custom projects and short engagements.{" "}
            <Link
              href="/contact"
              className="font-medium text-slate-300 underline-offset-4 hover:underline"
            >
              Tell me about it →
            </Link>
          </p>
        </Container>
      </section>

      <CTA />
    </>
  );
}
```

- [ ] **Step 2: Update app/contact/page.tsx — new intro + dark styles**

Replace the entire file:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import ContactForm from "@/components/contact-form";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description:
    "Got a project in mind? Get in touch — I read every message and reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Got a project in mind?"
        description="Tell me about it — I read every message. No obligation, just a conversation about what you're building."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
            <div>
              <ContactForm />
            </div>

            <aside className="space-y-10">
              <div>
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-50">
                  Other ways to reach me
                </h3>
                <ul className="space-y-4 text-slate-400">
                  <li className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-slate-600" />
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-slate-50"
                    >
                      {siteConfig.email}
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <Github
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-600"
                    />
                    <Link
                      href={siteConfig.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-slate-50"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <Linkedin
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-600"
                    />
                    <Link
                      href={siteConfig.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-slate-50"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-600"
                    />
                    <span>{siteConfig.location}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-50">
                  Availability
                </h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                  </span>
                  <p className="text-sm text-slate-400">
                    {siteConfig.available
                      ? "Currently available for new projects."
                      : "Currently booked. Get in touch for the next open slot."}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify /services and /contact in browser**

- Open http://localhost:3000/services — dark service cards, violet prices in ₱, violet check icons
- Open http://localhost:3000/contact — new intro copy, dark form area, violet pulsing availability dot

- [ ] **Step 4: Run build to catch any TypeScript errors**

```bash
npm run build
```

Expected: Build completes with no errors. If there are errors, fix them before committing.

- [ ] **Step 5: Commit**

```bash
git add app/services/page.tsx app/contact/page.tsx
git commit -m "feat: services and contact pages — dark styles, PHP pricing, new contact intro"
```

---

## Task 10: Final Check and .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add .superpowers to .gitignore**

Open `.gitignore` and add this line if not already present:

```
.superpowers/
```

- [ ] **Step 2: Run full build**

```bash
npm run build
```

Expected: Build completes successfully. All pages statically generated.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: No errors or warnings.

- [ ] **Step 4: Manual smoke test**

With `npm run dev`, visit every page and confirm:
- `/` — Hero, About teaser, Services, Featured Work, CTA all dark
- `/about` — Bio with gym line, skills, process, dark styles
- `/work` — Property Geek (Client badge), Natours (Practice badge)
- `/work/property-geek` — Full case study, dark, Client badge
- `/work/natours` — Full case study, dark, Practice badge
- `/services` — 3 service cards, PHP prices, violet checks
- `/contact` — New intro, violet availability dot

- [ ] **Step 5: Final commit**

```bash
git add .gitignore
git commit -m "chore: add .superpowers to .gitignore"
```

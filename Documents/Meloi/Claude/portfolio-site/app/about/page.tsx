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

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

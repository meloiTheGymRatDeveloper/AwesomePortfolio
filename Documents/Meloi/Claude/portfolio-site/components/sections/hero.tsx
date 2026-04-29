import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../container";

export default function Hero() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for freelance projects
        </div>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-neutral-900 md:text-6xl md:leading-[1.05]">
          I build fast, modern websites for growing businesses.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          I&apos;m Meloi — a freelance web developer specializing in Next.js,
          React, and Node.js. I help startups and small businesses turn ideas
          into polished web experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Start a project
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/work"
            className="text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
          >
            See my work →
          </Link>
        </div>
      </Container>
    </section>
  );
}

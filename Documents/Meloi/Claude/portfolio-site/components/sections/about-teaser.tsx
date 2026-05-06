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

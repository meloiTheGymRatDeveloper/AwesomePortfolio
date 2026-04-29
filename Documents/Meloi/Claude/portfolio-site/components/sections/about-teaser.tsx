import Link from "next/link";
import Container from "../container";
import { bio } from "@/content/about";

export default function AboutTeaser() {
  return (
    <section className="border-t border-neutral-200 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
          {/* Portrait placeholder — replace /public/portrait.jpg once provided */}
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-semibold text-neutral-300">
                MM
              </span>
            </div>
            {/* When you drop portrait.jpg into /public, swap this block for:
                <Image src="/portrait.jpg" alt="Meloi Magpantay" fill className="object-cover" />
            */}
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-wider text-neutral-500">
              About
            </p>
            <p className="text-2xl font-medium leading-relaxed tracking-tight text-neutral-900 md:text-3xl md:leading-snug">
              {bio.short}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
            >
              More about me →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

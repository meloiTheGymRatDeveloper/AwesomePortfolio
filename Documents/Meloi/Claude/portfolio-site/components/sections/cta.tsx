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

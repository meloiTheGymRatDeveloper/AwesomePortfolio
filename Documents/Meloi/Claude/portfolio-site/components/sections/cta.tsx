import Link from "next/link";
import Container from "../container";

export default function CTA() {
  return (
    <section className="border-t border-neutral-200 py-24 md:py-32">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl md:leading-[1.1]">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">
          I&apos;m currently taking on part-time freelance work. Let&apos;s talk
          about what you&apos;re building.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Get in touch
        </Link>
      </Container>
    </section>
  );
}

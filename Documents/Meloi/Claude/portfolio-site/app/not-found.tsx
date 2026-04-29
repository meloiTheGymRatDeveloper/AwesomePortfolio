import Link from "next/link";
import Container from "@/components/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container>
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-sm text-neutral-500">404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Page not found.
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            The page you&apos;re looking for doesn&apos;t exist, or it&apos;s
            been moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Back home
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
            >
              See my work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

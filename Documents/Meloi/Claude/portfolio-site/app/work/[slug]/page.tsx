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
      <section className="border-b border-neutral-200 py-20 md:py-28">
        <Container>
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft size={16} />
            All work
          </Link>

          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{project.year}</span>
            {project.client && (
              <>
                <span>·</span>
                <span>{project.client}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl md:leading-[1.1]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
            {project.summary}
          </p>
        </Container>
      </section>

      {/* Hero image */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
            <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-neutral-400">
              Hero screenshot placeholder
            </div>
          </div>
        </Container>
      </section>

      {/* Meta grid */}
      <section className="py-8">
        <Container>
          <div className="grid gap-8 border-y border-neutral-200 py-8 md:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                Client
              </p>
              <p className="mt-2 text-neutral-900">
                {project.client ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                Role
              </p>
              <p className="mt-2 text-neutral-900">{project.role ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                Duration
              </p>
              <p className="mt-2 text-neutral-900">
                {project.duration ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                Stack
              </p>
              <p className="mt-2 text-neutral-900">
                {project.stack.join(", ")}
              </p>
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
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-neutral-700">
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
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
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
      <section className="border-t border-neutral-200 py-16 md:py-20">
        <Container>
          <Link href={`/work/${nextProject.slug}`} className="group block">
            <p className="text-xs uppercase tracking-wider text-neutral-500">
              Next project
            </p>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                {nextProject.title}
              </h3>
              <ArrowUpRight
                size={22}
                className="shrink-0 text-neutral-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900"
              />
            </div>
          </Link>
        </Container>
      </section>

      <CTA />
    </>
  );
}

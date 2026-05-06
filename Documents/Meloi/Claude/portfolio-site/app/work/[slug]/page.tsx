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

      <section className="py-12 md:py-16">
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-slate-700">
            <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-slate-600">
              {project.title} — screenshot
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="grid gap-8 border-y border-slate-800 py-8 md:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Client</p>
              <p className="mt-2 text-slate-300">{project.client ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Role</p>
              <p className="mt-2 text-slate-300">{project.role ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Duration</p>
              <p className="mt-2 text-slate-300">{project.duration ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Stack</p>
              <p className="mt-2 text-slate-300">{project.stack.join(", ")}</p>
            </div>
          </div>
        </Container>
      </section>

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

      <section className="border-t border-slate-800 py-16 md:py-20">
        <Container>
          <Link href={`/work/${nextProject.slug}`} className="group block">
            <p className="text-xs uppercase tracking-wider text-slate-500">Next project</p>
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

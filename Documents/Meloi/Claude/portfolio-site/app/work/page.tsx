import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import CTA from "@/components/sections/cta";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description:
    "Selected client and personal projects — websites and web apps built with modern tooling.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected projects."
        description="A handful of projects — each one a chance to solve a real problem with clean code."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800 ring-1 ring-slate-700 transition-all group-hover:ring-violet-500/50">
                  <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-slate-600">
                    {project.title}
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>{project.year}</span>
                      {project.client && (
                        <>
                          <span>·</span>
                          <span>{project.client}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-slate-50">
                        {project.title}
                      </h2>
                      {project.projectType === "client" && (
                        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400 ring-1 ring-violet-500/30">
                          Client
                        </span>
                      )}
                      {project.projectType === "practice" && (
                        <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-400 ring-1 ring-slate-600">
                          Practice
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-md text-sm text-slate-400">
                      {project.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-700 px-2.5 py-0.5 text-xs text-slate-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

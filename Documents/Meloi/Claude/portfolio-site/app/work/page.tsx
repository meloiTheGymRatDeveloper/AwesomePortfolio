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
    "Selected freelance and personal projects — websites and web apps built with modern tooling.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected projects."
        description="A handful of recent and past projects. Each one is a chance to work on something genuinely interesting."
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
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200 transition-all group-hover:ring-neutral-300">
                  <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-neutral-400">
                    Screenshot placeholder
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span>{project.year}</span>
                      {project.client && (
                        <>
                          <span>·</span>
                          <span>{project.client}</span>
                        </>
                      )}
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-neutral-900">
                      {project.title}
                    </h2>
                    <p className="mt-1 max-w-md text-sm text-neutral-600">
                      {project.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-neutral-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900"
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

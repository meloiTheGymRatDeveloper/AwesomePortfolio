import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import Container from "../container";

export default function FeaturedWork() {
  const featured = projects.slice(0, 2);

  return (
    <section id="work" className="border-t border-neutral-200 py-20 md:py-28">
      <Container>
        <div className="mb-14 flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-wider text-neutral-500">
              Featured work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              Selected projects.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline md:inline"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {featured.map((project) => (
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
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {project.title}
                  </h3>
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
  );
}

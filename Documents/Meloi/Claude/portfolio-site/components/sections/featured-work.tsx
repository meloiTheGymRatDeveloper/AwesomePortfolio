import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import Container from "../container";

export default function FeaturedWork() {
  const featured = projects.slice(0, 2);

  return (
    <section id="work" className="border-t border-slate-800 py-20 md:py-28">
      <Container>
        <div className="mb-14 flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
              Featured work
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl">
              Selected projects.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-slate-50 hover:underline md:inline"
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
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800 ring-1 ring-slate-700 transition-all group-hover:ring-violet-500/50">
                <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-slate-600">
                  {project.title}
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-50">
                      {project.title}
                    </h3>
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
  );
}

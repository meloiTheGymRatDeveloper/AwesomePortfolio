import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import CTA from "@/components/sections/cta";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Services — ${siteConfig.name}`,
  description:
    "Landing pages, full websites, and web applications. Clear scope, fixed pricing, PHP rates.",
};

const serviceDetails: Record<
  string,
  { timeline: string; deliverables: string[] }
> = {
  "Landing Pages": {
    timeline: "1–2 weeks",
    deliverables: [
      "Single-page responsive design",
      "Copywriting guidance + SEO basics",
      "Contact form with email delivery",
      "Deployed on Vercel with custom domain",
      "1 round of revisions",
    ],
  },
  "Full Websites": {
    timeline: "3–5 weeks",
    deliverables: [
      "Up to 10 pages + blog",
      "Headless CMS so you can edit content yourself",
      "Responsive design + accessibility pass",
      "SEO setup (sitemap, meta, OG images)",
      "30 days of post-launch bug fixes",
    ],
  },
  "Web Applications": {
    timeline: "4–8 weeks",
    deliverables: [
      "Custom UI and API",
      "User authentication and roles",
      "Database design (MongoDB or Postgres)",
      "Payment integration if needed (Stripe)",
      "Deployment, monitoring, and handoff",
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Clear scope, fixed pricing, no surprises."
        description="Pick the package that fits your project, or get in touch for something custom. Every engagement starts with a short discovery call."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-10">
            {services.map((service) => {
              const details = serviceDetails[service.title];
              return (
                <article
                  key={service.title}
                  className="grid gap-8 rounded-2xl border border-slate-700 bg-slate-800 p-8 md:grid-cols-[1fr_1.5fr] md:p-12"
                >
                  <div>
                    <service.Icon size={28} className="mb-6 text-violet-400" />
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-50 md:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-slate-400">{service.description}</p>
                    <div className="mt-8 space-y-1 text-sm">
                      <p className="text-slate-500">Starting at</p>
                      <p className="text-xl font-semibold text-violet-400">
                        {service.startingPrice}
                      </p>
                    </div>
                    {details && (
                      <div className="mt-6 space-y-1 text-sm">
                        <p className="text-slate-500">Timeline</p>
                        <p className="font-medium text-slate-300">
                          {details.timeline}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-50">
                      What&apos;s included
                    </h3>
                    {details && (
                      <ul className="space-y-3">
                        {details.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-slate-400"
                          >
                            <Check
                              size={18}
                              className="mt-0.5 shrink-0 text-violet-400"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-violet-500 hover:text-slate-50"
                    >
                      Request a quote
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-16 max-w-xl text-sm text-slate-500">
            Need something that doesn&apos;t fit these packages? I also take on
            custom projects and short engagements.{" "}
            <Link
              href="/contact"
              className="font-medium text-slate-300 underline-offset-4 hover:underline"
            >
              Tell me about it →
            </Link>
          </p>
        </Container>
      </section>

      <CTA />
    </>
  );
}

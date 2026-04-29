import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import ContactForm from "@/components/contact-form";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description:
    "Get in touch to discuss a project, ask a question, or just say hi.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your project."
        description="Tell me a bit about what you're building and I'll reply within one business day. No obligation — just a conversation."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
            <div>
              <ContactForm />
            </div>

            <aside className="space-y-10">
              <div>
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Other ways to reach me
                </h3>
                <ul className="space-y-4 text-neutral-700">
                  <li className="flex items-start gap-3">
                    <Mail
                      size={18}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-neutral-900"
                    >
                      {siteConfig.email}
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <Github
                      size={18}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />
                    <Link
                      href={siteConfig.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-900"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <Linkedin
                      size={18}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />
                    <Link
                      href={siteConfig.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-900"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />
                    <span>{siteConfig.location}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Availability
                </h3>
                <p className="text-sm text-neutral-600">
                  {siteConfig.available
                    ? "Currently taking on part-time projects. Typical turnaround starts 1–2 weeks out."
                    : "Currently booked. I'll reply to inquiries and can schedule projects for the next open slot."}
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

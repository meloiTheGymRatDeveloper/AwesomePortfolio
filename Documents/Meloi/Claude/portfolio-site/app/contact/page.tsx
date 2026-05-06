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
    "Got a project in mind? Get in touch — I read every message and reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Got a project in mind?"
        description="Tell me about it — I read every message. No obligation, just a conversation about what you're building."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
            <div>
              <ContactForm />
            </div>

            <aside className="space-y-10">
              <div>
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-50">
                  Other ways to reach me
                </h3>
                <ul className="space-y-4 text-slate-400">
                  <li className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-slate-600" />
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-slate-50"
                    >
                      {siteConfig.email}
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <Github size={18} className="mt-0.5 shrink-0 text-slate-600" />
                    <Link
                      href={siteConfig.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-slate-50"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <Linkedin size={18} className="mt-0.5 shrink-0 text-slate-600" />
                    <Link
                      href={siteConfig.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-slate-50"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-slate-600" />
                    <span>{siteConfig.location}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-50">
                  Availability
                </h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                  </span>
                  <p className="text-sm text-slate-400">
                    {siteConfig.available
                      ? "Currently available for new projects."
                      : "Currently booked. Get in touch for the next open slot."}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

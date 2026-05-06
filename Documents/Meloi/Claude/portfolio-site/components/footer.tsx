import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Container from "./container";
import { siteConfig } from "@/content/site";

const socials = [
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
  { href: siteConfig.socials.github, label: "GitHub", Icon: Github },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-10 text-sm text-slate-500">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Meloi Magpantay. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {socials.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors hover:text-slate-50"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}

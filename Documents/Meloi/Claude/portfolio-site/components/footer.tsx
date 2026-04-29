import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Container from "./container";

const socials = [
  { href: "mailto:hello@example.com", label: "Email", Icon: Mail },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10 text-sm text-neutral-500">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Meloi Magpantay. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {socials.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors hover:text-neutral-900"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}

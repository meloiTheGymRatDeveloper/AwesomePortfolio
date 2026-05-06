import Link from "next/link";
import Container from "./container";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-tight text-slate-50 transition-colors hover:text-violet-400">
            Meloi
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">
            The Gym Rat Dev
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slate-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

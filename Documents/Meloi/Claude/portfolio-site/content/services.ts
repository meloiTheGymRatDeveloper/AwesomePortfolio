import { Layers, Globe, Terminal, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  startingPrice: string;
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Landing Pages",
    description:
      "Single-page marketing sites built for conversion. Fast, mobile-first, SEO-ready.",
    startingPrice: "From ₱22,000",
    Icon: Layers,
  },
  {
    title: "Full Websites",
    description:
      "5–10 page sites with CMS, blog, and contact forms. Perfect for small businesses and real estate agents.",
    startingPrice: "From ₱65,000",
    Icon: Globe,
  },
  {
    title: "Web Applications",
    description:
      "Custom dashboards, internal tools, and MVPs built with Next.js, Node.js, and MongoDB.",
    startingPrice: "From ₱135,000",
    Icon: Terminal,
  },
];

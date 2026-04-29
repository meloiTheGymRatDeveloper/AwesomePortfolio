/**
 * Central site configuration.
 * Edit values here to update metadata, contact info, and social links
 * across the entire site.
 */
export const siteConfig = {
  name: "Meloi Magpantay",
  shortName: "Meloi",
  role: "Freelance Web Developer",
  title: "Meloi Magpantay — Freelance Web Developer",
  description:
    "Freelance web developer building fast, modern websites and web apps with Next.js, React, Node.js, and MongoDB.",
  url: "https://meloi.dev", // TODO: replace with your actual domain on Day 7
  email: "hello@meloi.dev", // TODO: replace with your real forwarding address
  location: "Philippines",
  available: true,
  socials: {
    github: "https://github.com/meloi",
    linkedin: "https://www.linkedin.com/in/meloi",
    twitter: "", // optional, leave empty to hide
  },
} as const;

export type SiteConfig = typeof siteConfig;

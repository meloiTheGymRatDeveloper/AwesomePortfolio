export const siteConfig = {
  name: "Meloi Magpantay",
  shortName: "Meloi",
  role: "Freelance Web Developer",
  title: "Meloi The Gym Rat Dev — Freelance Web Developer",
  description:
    "Freelance web developer building fast, modern websites for real estate agents and small businesses in the Philippines.",
  url: "https://meloi.dev",
  email: "meloi.m.magpantay@gmail.com",
  location: "Philippines",
  available: true,
  socials: {
    github: "https://github.com/meloi",
    linkedin: "https://www.linkedin.com/in/meloi",
    twitter: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  year: number;
  client?: string;
  role?: string;
  duration?: string;
  liveUrl?: string;
  projectType?: "client" | "practice";
  story?: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "property-geek",
    title: "Property Geek",
    summary:
      "A professional real estate website for a licensed PRC broker with partnerships at AyalaLand, Greenfield, and Rockwell.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
    year: 2025,
    client: "Jireh Mamaclay",
    role: "Design & Development",
    duration: "3 weeks",
    liveUrl: "",
    projectType: "client",
    story: [
      {
        heading: "The problem",
        body: "A licensed real estate broker with premium partnerships — AyalaLand, Greenfield, and Rockwell — had no professional web presence. Every client lead came through word-of-mouth with nothing to land on, no listings to browse, and no way to verify credibility online.",
      },
      {
        heading: "The approach",
        body: "I built a fast, SEO-optimised landing site with property listings, an about section showcasing her credentials, and a contact form. The design prioritised trust — clean layout, clear calls to action, and a structure that could scale into a full listing platform in Phase 2.",
      },
      {
        heading: "The result",
        body: "A professional online presence that matches the quality of her developer partnerships. The site establishes credibility immediately and gives potential buyers a clear path to get in touch.",
      },
    ],
  },
  {
    slug: "natours",
    title: "Natours",
    summary:
      "A full-stack tour booking web app with authentication, Stripe payments, and a live deployment on Render.",
    stack: ["Node.js", "Express", "MongoDB", "Stripe"],
    year: 2024,
    role: "Developer",
    duration: "6 weeks",
    liveUrl: "",
    projectType: "practice",
    story: [
      {
        heading: "The project",
        body: "A full-stack tour booking web application built while completing Jonas Schmedtmann's Node.js course. The scope covers authentication, payments, REST API design, and production deployment — a deliberate exercise in backend fundamentals.",
      },
      {
        heading: "What I built",
        body: "User authentication with JWT, Stripe checkout for bookings, full CRUD for tours and reservations, an admin dashboard, email notifications via Nodemailer, and a live Render deployment with environment-based configuration.",
      },
      {
        heading: "What I learned",
        body: "Backend architecture, API security patterns, and what production deployment actually involves. These are the foundations I bring to every client web app I build — Natours is where I proved I could do it end to end.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

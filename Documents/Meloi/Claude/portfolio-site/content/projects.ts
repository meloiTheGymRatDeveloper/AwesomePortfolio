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
  /** Longer case study body. Each entry is a {heading, body} pair. */
  story?: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary:
      "A short one-liner describing the project, the client, and the outcome you delivered.",
    stack: ["Next.js", "Tailwind", "MongoDB"],
    year: 2025,
    client: "Client name",
    role: "Design & Development",
    duration: "3 weeks",
    liveUrl: "",
    story: [
      {
        heading: "The problem",
        body: "[Placeholder] Describe the client's situation before the project. What was broken, slow, or missing? Keep it to 2–4 sentences.",
      },
      {
        heading: "The approach",
        body: "[Placeholder] Walk through how you scoped and built the solution. Focus on the interesting decisions and trade-offs.",
      },
      {
        heading: "The result",
        body: "[Placeholder] Close with the outcome — metrics if you have them, qualitative impact if not. What changed for the client?",
      },
    ],
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary:
      "A short one-liner describing the project, the client, and the outcome you delivered.",
    stack: ["React", "Node.js", "Express"],
    year: 2025,
    client: "Client name",
    role: "Full-stack Development",
    duration: "5 weeks",
    liveUrl: "",
    story: [
      {
        heading: "The problem",
        body: "[Placeholder] Describe the client's situation before the project.",
      },
      {
        heading: "The approach",
        body: "[Placeholder] Walk through how you scoped and built the solution.",
      },
      {
        heading: "The result",
        body: "[Placeholder] Close with the outcome.",
      },
    ],
  },
  {
    slug: "project-three",
    title: "Project Three",
    summary:
      "A short one-liner describing the project, the client, and the outcome you delivered.",
    stack: ["Next.js", "TypeScript", "Stripe"],
    year: 2024,
    client: "Client name",
    role: "Full-stack Development",
    duration: "4 weeks",
    liveUrl: "",
    story: [
      {
        heading: "The problem",
        body: "[Placeholder] Describe the client's situation before the project.",
      },
      {
        heading: "The approach",
        body: "[Placeholder] Walk through how you scoped and built the solution.",
      },
      {
        heading: "The result",
        body: "[Placeholder] Close with the outcome.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const skills: Record<string, string[]> = {
  Frontend: [
    "React",
    "React Native",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "Next.js",
  ],
  Backend: ["Node.js", "MongoDB", "SQL", "REST APIs"],
  Testing: ["Playwright", "Appium", "Cucumber", "Test-Driven Development"],
  DevOps: [
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Linux",
    "ARM",
    "Sentry",
    "Datadog",
  ],
};

export const hobbies: string[] = [
  "Home Labbing",
  "Studying History",
  "Video Games",
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description: "A short placeholder description of what this project does.",
    tech: ["React", "TypeScript", "Tailwind"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Project Two",
    description: "Another placeholder project description goes right here.",
    tech: ["Node.js", "PostgreSQL"],
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Project Three",
    description: "A third placeholder project to fill out the list nicely.",
    tech: ["React Native", "REST API"],
    liveUrl: "#",
    featured: true,
  },
];

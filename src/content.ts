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
  impact?: string;
};

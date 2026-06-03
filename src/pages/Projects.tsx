import { useEffect, useState } from "react";
import type { Project } from "../content";
import { getProjects } from "../lib/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <section className="py-16">
      <h1 className="page-title">Projects</h1>
      <div className="mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

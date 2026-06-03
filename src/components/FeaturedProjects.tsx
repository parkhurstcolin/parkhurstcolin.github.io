import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../content";
import { getProjects } from "../lib/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects({ featured: true, limit: 3 }).then(setProjects);
  }, []);

  return (
    <section className="py-16">
      <SectionHeading
        number="01"
        title="Selected work"
        className="mb-2"
        action={
          <Link to="/projects" className="link-accent">
            all projects →
          </Link>
        }
      />
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

import { projects } from "../content";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
      <div className="mt-6 space-y-6">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

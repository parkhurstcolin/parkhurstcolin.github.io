import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../content";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("title, summary, tech_stack, live_url, repo_url, featured, impact")
      .eq("published", true)
      .order("sort_order")
      .then(({ data }) => {
        const rows = (data ?? []).map((row) => ({
          title: row.title,
          description: row.summary,
          tech: row.tech_stack,
          liveUrl: row.live_url,
          repoUrl: row.repo_url,
          featured: row.featured,
          impact: row.impact,
        }));
        setProjects(rows);
      });
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

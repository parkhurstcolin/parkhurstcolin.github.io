import type { Project } from "../content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid grid-cols-1 items-start gap-4 border-t border-line py-7 transition-[padding] hover:pl-2.5 sm:grid-cols-[1fr_auto] sm:gap-6">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
          <h3 className="font-display text-[22px] font-medium text-ink">
            {project.title}
          </h3>
          <span className="font-mono text-[11.5px] text-ink-faint">
            {project.tech.join(" · ")}
          </span>
        </div>
        <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
          {project.description}
        </p>
        {project.impact && (
          <p className="mt-2.5 inline-flex items-center gap-2 font-mono text-xs text-ink-soft">
            <span className="text-accent">→</span>
            {project.impact}
          </p>
        )}
      </div>
      <div className="flex gap-4 font-mono text-[12.5px] sm:justify-end">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            live ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="link-muted"
          >
            code ↗
          </a>
        )}
      </div>
    </article>
  );
}

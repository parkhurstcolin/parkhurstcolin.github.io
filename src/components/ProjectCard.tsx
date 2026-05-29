import type { Project } from "../content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-b border-gray-200 pb-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {project.title}
        </h3>
        <div className="flex shrink-0 gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Code
            </a>
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-700">{project.description}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

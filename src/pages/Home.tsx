import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { skills, hobbies } from "../content";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home() {
  return (
    <div className="grid gap-10 py-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Colin Parkhurst
        </h1>
        <p className="mt-2 text-xl text-gray-600">Software Engineer</p>
        <p className="mt-6 max-w-2xl text-lg text-gray-700">
          I build web applications and write about what I learn along the way.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            View Projects
          </Link>
          <a
            href="/colin-parkhurst-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-gray-300 px-5 py-2.5 font-medium text-gray-900 hover:bg-gray-50"
          >
            Resume
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://github.com/parkhurstcolin"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="rounded-full border border-gray-300 p-2.5 text-gray-600 hover:border-blue-600 hover:text-blue-600"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/colin-parkhurst-5a2542389/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="rounded-full border border-gray-300 p-2.5 text-gray-600 hover:border-blue-600 hover:text-blue-600"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href="https://leetcode.com/u/parkhurstcolin/"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
            title="LeetCode"
            className="rounded-full border border-gray-300 p-2.5 text-gray-600 hover:border-blue-600 hover:text-blue-600"
          >
            <SiLeetcode className="h-5 w-5" />
          </a>
          <a
            href="mailto:parkhurstcolin@gmail.com"
            aria-label="Email"
            title="Email"
            className="rounded-full border border-gray-300 p-2.5 text-gray-600 hover:border-blue-600 hover:text-blue-600"
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
        </div>

        <FeaturedProjects />
      </div>

      <aside className="space-y-8 lg:col-span-1">
        <img
          src="/colin-parkhurst-photo.jpg"
          alt="Colin Parkhurst"
          className="h-40 w-40 rounded-full object-cover"
        />

        <div>
          <h2 className="text-lg font-bold text-gray-900">Skills</h2>
          <div className="mt-4 space-y-4">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {group}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-800"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">Interests</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {hobbies.map((hobby) => (
              <li
                key={hobby}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-800"
              >
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

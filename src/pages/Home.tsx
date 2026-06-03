import { FaBriefcase, FaLocationDot } from "react-icons/fa6";
import { skills, hobbies } from "../content";
import FeaturedProjects from "../components/FeaturedProjects";
import RecentPosts from "../components/RecentPosts";
import SectionHeading from "../components/SectionHeading";

const primaryStack = [
  "React",
  "TypeScript",
  "Node.js",
  "React Native",
  "Tailwind CSS",
  "Docker",
];

export default function Home() {
  const moreCount = Object.values(skills).flat().length - primaryStack.length;

  return (
    <div className="py-16">
      <section className="grid items-center gap-12 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-accent">
            Software Engineer · Natick, MA
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,4.875rem)] font-medium leading-[0.96] tracking-[-0.02em] text-ink">
            Colin
            <br />
            Parkhurst
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            I build web applications{" "}
            <em className="font-display italic text-ink">&amp;</em> write about what
            I learn along the way.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5 font-mono text-[12.5px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <FaBriefcase className="h-3.5 w-3.5" />
              1+ yr experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaLocationDot className="h-3.5 w-3.5" />
              Natick, MA
            </span>
            <span className="inline-flex items-center gap-1.5 text-green">
              <span className="h-2 w-2 rounded-full bg-green" />
              Open to work
            </span>
          </div>
        </div>
        <div className="relative h-[200px] w-[168px] shrink-0 overflow-hidden rounded-2xl border border-line">
          <img
            src="/colin-parkhurst-photo.jpg"
            alt="Colin Parkhurst"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-2 rounded-xl border border-line/70" />
        </div>
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-6">
        <span className="label">Stack</span>
        <ul className="flex flex-wrap gap-2">
          {primaryStack.map((tech) => (
            <li
              key={tech}
              className="tag transition-colors hover:border-ink-faint hover:text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>
        <a href="#toolkit" className="link-accent">
          +{moreCount} more →
        </a>
      </div>

      <FeaturedProjects />

      <section id="toolkit" className="scroll-mt-20 py-16">
        <SectionHeading number="02" title="Toolkit" />
        <div className="grid gap-8 sm:grid-cols-2">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <h3 className="label">{group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="label">Interests</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {hobbies.map((hobby) => (
              <li key={hobby} className="tag">
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RecentPosts />
    </div>
  );
}

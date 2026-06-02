import { Link, NavLink, Outlet } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import Container from "./Container";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-ink underline underline-offset-[6px] decoration-1"
    : "link-muted";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-mono text-[13px] font-medium text-paper">
                cp
              </span>
              <span className="font-mono text-[13px] text-ink-soft">
                parkhurstcolin.github.io
              </span>
            </Link>
            <nav className="flex items-center gap-6 font-mono text-[13.5px]">
              <NavLink to="/" end className={navClass}>
                home
              </NavLink>
              <NavLink to="/blog" className={navClass}>
                blog
              </NavLink>
              <NavLink to="/projects" className={navClass}>
                projects
              </NavLink>
              <a
                href="/colin-parkhurst-resume.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 font-medium text-paper transition hover:-translate-y-px hover:opacity-90"
              >
                <FaDownload className="h-3 w-3" />
                Résumé
              </a>
            </nav>
          </div>
        </Container>
      </header>
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="border-t border-line">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 py-8 font-mono text-xs text-ink-faint">
            <span>© 2026 Colin Parkhurst</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/parkhurstcolin"
                target="_blank"
                rel="noreferrer"
                className="link-muted"
              >
                github
              </a>
              <a
                href="https://www.linkedin.com/in/colin-parkhurst-5a2542389/"
                target="_blank"
                rel="noreferrer"
                className="link-muted"
              >
                linkedin
              </a>
              <a
                href="https://leetcode.com/u/parkhurstcolin/"
                target="_blank"
                rel="noreferrer"
                className="link-muted"
              >
                leetcode
              </a>
              <a
                href="mailto:parkhurstcolin@gmail.com"
                className="link-muted"
              >
                email
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

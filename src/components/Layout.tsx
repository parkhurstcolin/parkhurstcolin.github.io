import { Link, NavLink, Outlet } from "react-router-dom";
import Container from "./Container";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-semibold text-blue-600" : "text-gray-600 hover:text-blue-600";

export default function Layout() {
  return (
    <>
      <header className="border-b border-gray-200">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-xl font-semibold text-gray-900">
              CP
            </Link>
            <nav className="flex gap-6">
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>
              <NavLink to="/blog" className={navClass}>
                Blog
              </NavLink>
              <NavLink to="/projects" className={navClass}>
                Projects
              </NavLink>
            </nav>
          </div>
        </Container>
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          Colin Parkhurst
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <Link to="/projects" className="text-gray-600 hover:text-gray-900">
            Projects
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-16">
      <h1 className="page-title">404 — Not found</h1>
      <p className="mt-2 text-ink-soft">That page doesn’t exist.</p>
      <Link to="/" className="link-accent mt-4 inline-block">
        ← back home
      </Link>
    </section>
  );
}

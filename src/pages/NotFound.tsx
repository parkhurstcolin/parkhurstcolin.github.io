import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-16">
      <h1 className="text-3xl font-bold text-gray-900">404 — Not found</h1>
      <p className="mt-2 text-gray-600">That page doesn’t exist.</p>
      <Link to="/" className="mt-4 inline-block text-gray-900 underline">
        Go home
      </Link>
    </section>
  );
}

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useSession } from "../lib/useAuth";
import AdminProjects from "../components/AdminProjects";
import AdminPosts from "../components/AdminPosts";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setSubmitting(false);
  }

  return (
    <section className="py-16">
      <h1 className="page-title">Admin</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-8 max-w-sm space-y-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          autoComplete="username"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          autoComplete="current-password"
          className="input"
        />
        {error && <p className="font-mono text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-ink px-4 py-2 font-medium text-paper transition hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </section>
  );
}

const tabClass = (active: boolean) =>
  active ? "border-b-2 border-ink pb-2 text-ink" : "link-muted pb-2";

function Dashboard() {
  const [tab, setTab] = useState<"projects" | "posts">("projects");
  return (
    <section className="py-16">
      <div className="flex items-baseline justify-between">
        <h1 className="page-title">Admin</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="link-muted font-mono text-[13px]"
        >
          sign out
        </button>
      </div>
      <div className="mt-8 flex gap-6 border-b border-line font-mono text-sm">
        <button
          onClick={() => setTab("projects")}
          className={tabClass(tab === "projects")}
        >
          projects
        </button>
        <button
          onClick={() => setTab("posts")}
          className={tabClass(tab === "posts")}
        >
          posts
        </button>
      </div>
      {tab === "projects" ? <AdminProjects /> : <AdminPosts />}
    </section>
  );
}

export default function Admin() {
  const { session, loading } = useSession();
  if (loading) return null;
  return session ? <Dashboard /> : <Login />;
}

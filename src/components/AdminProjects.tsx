import { useState } from "react";
import { useCrud } from "../lib/useCrud";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  tech_stack: string[];
  repo_url: string | null;
  live_url: string | null;
  impact: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
};

const emptyForm = {
  slug: "",
  title: "",
  summary: "",
  tech_stack: "",
  repo_url: "",
  live_url: "",
  impact: "",
  featured: false,
  published: false,
  sort_order: 0,
};

export default function AdminProjects() {
  const { rows, editingId, setEditingId, error, setError, saving, save, remove } =
    useCrud<ProjectRow>("projects", { column: "sort_order" });
  const [form, setForm] = useState(emptyForm);

  function startNew() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  }

  function startEdit(p: ProjectRow) {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      summary: p.summary ?? "",
      tech_stack: p.tech_stack.join(", "),
      repo_url: p.repo_url ?? "",
      live_url: p.live_url ?? "",
      impact: p.impact ?? "",
      featured: p.featured,
      published: p.published,
      sort_order: p.sort_order,
    });
    setError(null);
  }

  async function handleSubmit() {
    const ok = await save({
      slug: form.slug,
      title: form.title,
      summary: form.summary || null,
      tech_stack: form.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      repo_url: form.repo_url || null,
      live_url: form.live_url || null,
      impact: form.impact || null,
      featured: form.featured,
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
    });
    if (ok) startNew();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    if (editingId === id) startNew();
    await remove(id);
  }

  return (
    <div className="mt-10 space-y-10">
      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="label">Projects ({rows.length})</h2>
          <button onClick={startNew} className="link-accent">
            + new
          </button>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {rows.map((p) => (
            <li key={p.id} className="flex items-center justify-between py-3">
              <div className="flex items-baseline gap-3">
                <span className="w-5 shrink-0 font-mono text-xs tabular-nums text-ink-faint">
                  {p.sort_order}
                </span>
                <div>
                  <span className="font-medium text-ink">{p.title}</span>
                  <span className="ml-3 font-mono text-xs text-ink-faint">
                    {p.published ? "published" : "draft"}
                    {p.featured ? " · featured" : ""}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 font-mono text-[13px]">
                <button
                  onClick={() => startEdit(p)}
                  className="text-accent hover:underline"
                >
                  edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="link-muted">
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4 border-t border-line pt-8"
      >
        <h2 className="label">{editingId ? "Edit project" : "New project"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            className="input"
            placeholder="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="input"
            placeholder="slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>
        <input
          className="input"
          placeholder="summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />
        <input
          className="input"
          placeholder="tech (comma separated)"
          value={form.tech_stack}
          onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
        />
        <input
          className="input"
          placeholder="impact (one line)"
          value={form.impact}
          onChange={(e) => setForm({ ...form, impact: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            className="input"
            placeholder="live url"
            value={form.live_url}
            onChange={(e) => setForm({ ...form, live_url: e.target.value })}
          />
          <input
            className="input"
            placeholder="repo url"
            value={form.repo_url}
            onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
          />
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-sm text-ink-soft">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            published
          </label>
          <label className="flex items-center gap-2">
            order
            <input
              type="number"
              className="w-16 rounded-md border border-line bg-card px-2 py-1 text-ink outline-none focus:border-ink-faint"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
            />
          </label>
        </div>
        {error && <p className="font-mono text-xs text-red-600">{error}</p>}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-ink px-4 py-2 font-medium text-paper transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={startNew}
              className="link-muted font-mono text-[13px]"
            >
              cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

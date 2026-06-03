import { useState } from "react";
import type { PartialBlock } from "@blocknote/core";
import { useCrud } from "../lib/useCrud";
import { asBlocks } from "../lib/blocks";
import PostBodyEditor from "./PostBodyEditor";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: unknown;
  published: boolean;
  published_at: string | null;
};

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  published: false,
  published_at: null as string | null,
};

export default function AdminPosts() {
  const { rows, editingId, setEditingId, error, setError, saving, save, remove } =
    useCrud<PostRow>("posts", { column: "created_at", ascending: false });
  const [form, setForm] = useState(emptyForm);
  const [content, setContent] = useState<PartialBlock[] | undefined>(undefined);

  function startNew() {
    setEditingId(null);
    setForm(emptyForm);
    setContent(undefined);
    setError(null);
  }

  function startEdit(p: PostRow) {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      published: p.published,
      published_at: p.published_at,
    });
    setContent(asBlocks(p.content));
    setError(null);
  }

  async function handleSubmit() {
    const ok = await save({
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt || null,
      content: content ?? [],
      published: form.published,
      published_at: form.published
        ? (form.published_at ?? new Date().toISOString())
        : null,
    });
    if (ok) startNew();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    if (editingId === id) startNew();
    await remove(id);
  }

  return (
    <div className="mt-10 space-y-10">
      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="label">Posts ({rows.length})</h2>
          <button onClick={startNew} className="link-accent">
            + new
          </button>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {rows.map((p) => (
            <li key={p.id} className="flex items-center justify-between py-3">
              <div>
                <span className="font-medium text-ink">{p.title}</span>
                <span className="ml-3 font-mono text-xs text-ink-faint">
                  {p.published ? "published" : "draft"}
                </span>
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
        <h2 className="label">{editingId ? "Edit post" : "New post"}</h2>
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
          placeholder="excerpt (short blurb)"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        <PostBodyEditor
          key={editingId ?? "new"}
          initialContent={content}
          onChange={(blocks) => setContent(blocks)}
        />
        <label className="flex items-center gap-2 font-mono text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          published
        </label>
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

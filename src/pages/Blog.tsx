import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { formatDate } from "../lib/format";

type PostPreview = {
  slug: string;
  title: string;
  published_at: string | null;
};

export default function Blog() {
  const [posts, setPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select("slug, title, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  return (
    <section className="py-16">
      <h1 className="page-title">Blog</h1>
      <ul className="mt-8">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3"
          >
            <Link
              to={`/blog/${post.slug}`}
              className="text-lg text-ink-soft transition-colors hover:text-ink"
            >
              {post.title}
            </Link>
            {post.published_at && (
              <span className="shrink-0 font-mono text-xs text-ink-faint">
                {formatDate(post.published_at)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

type PostRow = {
  title: string;
  excerpt: string | null;
  content: unknown;
  published_at: string | null;
};

type Block = { type?: string; text?: string };

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("title, excerpt, content, published_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        setPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return null;

  if (!post) {
    return (
      <section className="py-16">
        <h1 className="page-title">Post not found</h1>
        <p className="mt-2 text-ink-soft">
          That post doesn’t exist or isn’t published.
        </p>
        <Link
          to="/blog"
          className="mt-4 inline-block font-mono text-[13px] text-accent hover:underline"
        >
          ← all posts
        </Link>
      </section>
    );
  }

  const blocks = Array.isArray(post.content) ? (post.content as Block[]) : [];

  return (
    <article className="py-16">
      <Link
        to="/blog"
        className="font-mono text-[13px] text-accent hover:underline"
      >
        ← all posts
      </Link>
      <h1 className="page-title mt-6">{post.title}</h1>
      {post.published_at && (
        <p className="mt-2 font-mono text-xs text-ink-faint">
          {new Date(post.published_at).toLocaleDateString()}
        </p>
      )}
      {post.excerpt && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
      )}
      <div className="mt-8 max-w-2xl space-y-4">
        {blocks.map((block, i) =>
          block.type === "heading" ? (
            <h2
              key={i}
              className="font-display text-2xl font-medium tracking-tight text-ink"
            >
              {block.text}
            </h2>
          ) : (
            <p key={i} className="leading-relaxed text-ink">
              {block.text}
            </p>
          ),
        )}
      </div>
    </article>
  );
}

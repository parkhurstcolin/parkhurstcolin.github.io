import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { asBlocks } from "../lib/blocks";
import { formatDate } from "../lib/format";
import PostBody from "../components/PostBody";

type PostRow = {
  title: string;
  excerpt: string | null;
  content: unknown;
  published_at: string | null;
};

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
        <Link to="/blog" className="link-accent mt-4 inline-block">
          ← all posts
        </Link>
      </section>
    );
  }

  const blocks = asBlocks(post.content);

  return (
    <article className="py-16">
      <Link to="/blog" className="link-accent">
        ← all posts
      </Link>
      <h1 className="page-title mt-6">{post.title}</h1>
      {post.published_at && (
        <p className="mt-2 font-mono text-xs text-ink-faint">
          {formatDate(post.published_at)}
        </p>
      )}
      {post.excerpt && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
      )}
      {blocks && (
        <div className="mt-8 max-w-md">
          <PostBody content={blocks} />
        </div>
      )}
    </article>
  );
}

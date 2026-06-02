import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SectionHeading from "./SectionHeading";

type PostPreview = {
  slug: string;
  title: string;
  excerpt: string | null;
};

export default function RecentPosts() {
  const [posts, setPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select("slug, title, excerpt")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3)
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16">
      <SectionHeading
        number="03"
        title="Writing"
        className="mb-2"
        action={
          <Link
            to="/blog"
            className="font-mono text-[13px] text-accent hover:underline"
          >
            all posts →
          </Link>
        }
      />
      <div>
        {posts.map((post) => (
          <article key={post.slug} className="border-t border-line py-6">
            <Link to={`/blog/${post.slug}`}>
              <h3 className="font-display text-[20px] font-medium text-ink transition-colors hover:text-accent">
                {post.title}
              </h3>
            </Link>
            {post.excerpt && (
              <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

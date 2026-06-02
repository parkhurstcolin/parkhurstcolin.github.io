import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

type PostPreview = {
  slug: string;
  title: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select("slug, title")
      .eq("published", true)
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  return (
    <section className="py-16">
      <h1 className="page-title">Blog</h1>
      <ul className="mt-8 space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="text-lg text-ink-soft transition-colors hover:text-ink"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

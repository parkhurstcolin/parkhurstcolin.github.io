import { useEffect, useState } from "react";
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
    <section className="py-12">
      <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
      <ul className="mt-6 space-y-3">
        {posts.map((post) => (
          <li key={post.slug} className="text-lg text-gray-700">
            {post.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

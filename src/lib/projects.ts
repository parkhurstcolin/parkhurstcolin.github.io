import { supabase } from "./supabase";
import type { Project } from "../content";

export async function getProjects(opts?: {
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> {
  let query = supabase
    .from("projects")
    .select("title, summary, tech_stack, live_url, repo_url, featured, impact")
    .eq("published", true)
    .order("sort_order");
  if (opts?.featured) query = query.eq("featured", true);
  if (opts?.limit) query = query.limit(opts.limit);

  const { data } = await query;
  return (data ?? []).map((row) => ({
    title: row.title,
    description: row.summary,
    tech: row.tech_stack,
    liveUrl: row.live_url,
    repoUrl: row.repo_url,
    featured: row.featured,
    impact: row.impact,
  }));
}

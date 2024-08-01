import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: 'Invalid or missing id parameter' }), { status: 400 });
  }
  const forumId = Number(id);

  // Consultar temas relevantes del foro
  const { data: relevantThreads, error } = await supabase
    .from("threads")
    .select("*")
    .eq('forum_id', forumId)
    .eq('relevance', true);

  if (error) {
    console.error("Error fetching relevant threads:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(relevantThreads), { status: 200 });
};

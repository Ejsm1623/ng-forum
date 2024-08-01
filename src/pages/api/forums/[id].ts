import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: 'Invalid or missing id parameter' }), { status: 400 });
  }
  const forumId = Number(id);

  const { data: forum, error } = await supabase
    .from("forums")
    .select("*")
    .eq('id', forumId)
    .single();

  if (error) {
    console.error("Error fetching forum:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(forum), { status: 200 });
};

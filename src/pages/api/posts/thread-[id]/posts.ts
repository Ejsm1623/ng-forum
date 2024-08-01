import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return new Response(
      JSON.stringify({ error: "Invalid or missing id parameter" }),
      { status: 400 }
    );
  }
  const threadId = Number(id);

  // Consulta para obtener todos los campos de posts y users
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      users(*)
    `)
    .eq('thread_id', threadId);

  if (error) {
    console.error("Error fetching posts:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(posts), { status: 200 });
};

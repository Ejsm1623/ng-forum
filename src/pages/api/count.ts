import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ params }) => {
  const { count: threadsCount, error: threadsError } = await supabase
    .from("threads")
    .select("*", { count: "exact" });

  if (threadsError) {
    return new Response(JSON.stringify({ error: threadsError.message }), {
      status: 500,
    });
  }

  // Obtener el conteo de registros en la tabla `posts`
  const { count: postsCount, error: postsError } = await supabase
    .from("posts")
    .select("*", { count: "exact" });

  if (postsError) {
    return new Response(JSON.stringify({ error: postsError.message }), {
      status: 500,
    });
  }
  // Responder con el tema encontrado
  return new Response(JSON.stringify({ postsCount, threadsCount }));
};

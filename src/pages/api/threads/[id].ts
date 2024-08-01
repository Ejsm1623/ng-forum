import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  // Validar el parámetro id
  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: 'Invalid or missing id parameter' }), { status: 400 });
  }
  
  const threadId = Number(id);

  // Consultar la tabla 'threads' por el ID dado
  const { data: thread, error } = await supabase
    .from("threads")
    .select("*")
    .eq('id', threadId)
    .single(); // Asegura que se obtiene un solo registro

  // Manejo de errores de la consulta
  if (error) {
    console.error("Error fetching thread:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Verifica si el registro existe
  if (!thread) {
    return new Response(JSON.stringify({ error: 'Thread not found' }), { status: 404 });
  }

  // Responder con el tema encontrado
  return new Response(JSON.stringify(thread), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

import { openAi, supabaseClient } from "@/utils";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export async function POST(req: Request) {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Search query is passed in request payload
  const { query } = await req.json();
  // OpenAI recommends replacing newlines with spaces for best results
  const input = query.replace(/\n/g, " ");

  // Generate a one-time embedding for the query itself
  const embeddingResponse = await openAi.createEmbedding({
    model: "text-embedding-ada-002",
    input,
  });

  const [{ embedding }] = embeddingResponse.data.data;

  // Ideally for context injection, documents are chunked into
  // smaller sections at earlier pre-processing/embedding step.
  const { data: documents, error: err } = await supabaseClient.rpc(
    "match_documents_new",
    {
      query_embedding: embedding,
      similarity_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: 10, // Choose the number of matches
    }
  );

  const songs: `${string} - ${string}`[] = documents.map(
    (x: { title: string; artist: string; content: string }) => {
      return `${x.title} - ${x.artist}`;
    }
  );

  //remove duplicates
  const uniqueSongs = [...new Set(songs)];
  console.log(uniqueSongs);

  return new Response(
    JSON.stringify({
      query,
      uniqueSongs,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

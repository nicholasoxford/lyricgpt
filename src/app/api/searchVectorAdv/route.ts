import GPT3Tokenizer from "gpt3-tokenizer";
import oneline from "oneline";
import { stripIndent } from "common-tags";
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
    "match_documents",
    {
      query_embedding: embedding,
      similarity_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: 10, // Choose the number of matches
    }
  );
  console.log(documents);
  const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
  let tokenCount = 0;
  let contextText = "";

  // Concat matched documents
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    const content = document.content;
    const encoded = tokenizer.encode(content);
    tokenCount += encoded.text.length;

    // Limit context to max 1500 tokens (configurable)
    if (tokenCount > 1500) {
      break;
    }

    contextText += `${content.trim()}\n---\n`;
  }

  const prompt = stripIndent`${oneline`
    You are a very enthusiastic Music genius who loves
    to help people figure out what song they are thinking! Given the following sections from our lyric
    database, answer the question using only that information. However remember how many 
    different meanings music can have! You are trained on rap genius' database. Think creatively, but do your best
    to provide the answer a human is looking for. `}

    Context sections:
    ${contextText}

    Question: """
    ${query}
    """

    The songs you are thinking of:
  `;

  // In production we should handle possible errors
  const completionResponse = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 512, // Choose the max allowed tokens in completion
    temperature: 0, // Set to 0 for deterministic results
  });

  return new Response(
    JSON.stringify({
      query,
      songs: completionResponse.data.choices[0].text
        ?.split("\n")
        .filter((x) => x.trim() != ""),
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

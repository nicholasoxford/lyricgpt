import { supabaseClient } from "@/utils";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export async function POST(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Search query is passed in request payload
  const { email } = await req.json();

  const { data, error: err2 } = await supabaseClient.from("email_list").insert([
    {
      email,
    },
  ]);
  console.log("err2", err2);
  return new Response(
    JSON.stringify({
      email,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

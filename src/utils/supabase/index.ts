import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.supabaseUrl ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";
export const supabaseClient = createClient(supabaseUrl, supabaseKey);

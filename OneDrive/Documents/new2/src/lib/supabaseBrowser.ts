import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

let supabaseBrowserInstance: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowser() {
  if (typeof window === "undefined") {
    throw new Error("Supabase browser client can only be used in the browser.");
  }

  if (!supabaseBrowserInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.");
    }

    supabaseBrowserInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseBrowserInstance;
}

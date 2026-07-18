"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      // Treat obvious placeholders as unconfigured
      const invalidPlaceholder = !siteKey || siteKey.includes("your_recaptcha") || siteKey.toUpperCase().includes("REPLACE");
      if (invalidPlaceholder) {
        setLoading(false);
        setError("reCAPTCHA is not configured on this site. Contact the site administrator to enable login protection.");
        return;
      }

      if (!(window as any).grecaptcha) {
        setLoading(false);
        setError("reCAPTCHA not loaded. Try again later.");
        return;
      }

      // Execute reCAPTCHA v3
      const token: string = await new Promise((resolve, reject) => {
        try {
          (window as any).grecaptcha.ready(() => {
            try {
              (window as any).grecaptcha.execute(siteKey, { action: "login" }).then((t: string) => resolve(t)).catch(reject);
            } catch (e) {
              reject(e);
            }
          });
        } catch (e) {
          reject(e);
        }
      });

      // Guard against empty token
      if (!token) {
        setLoading(false);
        setError("reCAPTCHA did not return a token. Please try again.");
        return;
      }

      // Verify on server: this endpoint also performs simple IP rate-limiting
      const verifyRes = await fetch("/api/admin/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const verifyJson = await verifyRes.json();
      if (!verifyRes.ok || !verifyJson.success) {
        setLoading(false);
        setError(verifyJson?.message || "reCAPTCHA verification failed.");
        return;
      }

      // Proceed with Supabase sign-in after successful verification
      const supabase = getSupabaseBrowser();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      setLoading(false);
      if (signInError) {
        setError(signInError.message || "Login failed. Please check your credentials.");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "An unexpected error occurred. Please try again.");
    }
  }

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    // Dynamically load reCAPTCHA script
    const id = "recaptcha-script";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-lg">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Login</p>
          <h1 className="mt-4 text-3xl font-semibold">Sign in to manage contacts</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {error ? <div className="rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

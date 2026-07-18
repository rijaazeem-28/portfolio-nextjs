"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

const navItems = [
  { title: "Dashboard", href: "/admin/dashboard" },
  { title: "Contact Queries", href: "/admin/contacts" },
];

export function AdminShell({ children, active }: { children: React.ReactNode; active: string }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      const supabase = getSupabaseBrowser();
      await supabase.auth.signOut();
    } finally {
      router.push("/admin/login");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Admin Panel</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage contact queries and ticket status.</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    active === item.href.split("/").pop()
                      ? "bg-cyan-500 text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}>
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70">
                {loggingOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}

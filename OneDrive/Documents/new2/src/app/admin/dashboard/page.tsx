import "dotenv/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";

async function requireAdmin() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (!supabaseUrl || !supabaseKey) {
    redirect("/admin/login");
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The setAll method was called from a Server Component
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const profile = await prisma.profile.findUnique({ where: { id: session.user.id } });
  if (!profile || profile.role !== "admin") {
    redirect("/admin/login");
  }

  return session.user.id;
}

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [totalContacts, pendingContacts, resolvedContacts, recentContacts] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "Pending" } }),
    prisma.contact.count({ where: { status: { in: ["Done", "Completed", "Resolved"] } } }),
    prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <AdminShell active="dashboard">
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total contacts</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{totalContacts}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">Pending / unresponded</p>
            <p className="mt-4 text-4xl font-semibold text-amber-600">{pendingContacts}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">Resolved / completed</p>
            <p className="mt-4 text-4xl font-semibold text-emerald-600">{resolvedContacts}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Recent contact queries</h2>
          <div className="mt-4 space-y-4">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">{contact.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{contact.email}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">{contact.status}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{contact.subject}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{contact.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

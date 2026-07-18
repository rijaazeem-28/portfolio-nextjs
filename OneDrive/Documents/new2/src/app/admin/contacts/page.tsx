import "dotenv/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContactQueriesTable, type ContactRow } from "@/components/admin/ContactQueriesTable";

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

export default async function AdminContactsPage() {
  await requireAdmin();
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });

  const serializedContacts: ContactRow[] = contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    subject: contact.subject,
    message: contact.message,
    status: contact.status,
    createdAt: contact.createdAt.toISOString(),
  }));

  return (
    <AdminShell active="contacts">
      <div className="space-y-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Contact queries</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">View and update the status of contact submissions.</p>
          </div>
        </div>
        <ContactQueriesTable contacts={serializedContacts} />
      </div>
    </AdminShell>
  );
}

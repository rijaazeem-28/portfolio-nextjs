import "dotenv/config";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const validStatuses = ["Pending", "Done", "Completed", "Resolved"];

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ message: "Authentication is not configured." }, { status: 500 });
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
          // The setAll method was called from a Route Handler
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
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({ where: { id: session.user.id } });
  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  const { id, status } = await request.json();
  if (typeof id !== "number" || !validStatuses.includes(status)) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  try {
    await prisma.contact.update({ where: { id }, data: { status } });
    return NextResponse.json({ message: "Status updated." });
  } catch (error) {
    return NextResponse.json({ message: "Unable to update status." }, { status: 500 });
  }
}

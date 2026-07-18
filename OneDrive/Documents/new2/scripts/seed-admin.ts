import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@rija-azeem.dev";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "AdminPassword123!";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env");
}

async function main() {
  const supabase = createClient(SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string, {
    auth: { persistSession: false },
  });

  // Fetch all users to check if admin already exists
  const { data: authData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    throw listError;
  }

  const existingUser = authData?.users?.find((user) => user.email === ADMIN_EMAIL);
  let adminUserId: string;

  if (existingUser) {
    console.log(`Admin user already exists: ${existingUser.id}`);
    adminUserId = existingUser.id;
  } else {
    const {
      data: { user },
      error: createError,
    } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { role: "admin" },
    });

    if (createError) {
      throw createError;
    }

    if (!user?.id) {
      throw new Error("Failed to create user - no ID returned");
    }

    console.log(`Created admin user: ${user.id}`);
    adminUserId = user.id;
  }

  // Upsert profile
  const { error: profileError } = await supabase.from("Profile").upsert(
    [{ id: adminUserId, email: ADMIN_EMAIL, role: "admin" }],
    { onConflict: "id" },
  );

  if (profileError) {
    throw profileError;
  }

  console.log("Seeded admin profile and linked it to Supabase Authentication.");
  console.log(`Sign in with ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

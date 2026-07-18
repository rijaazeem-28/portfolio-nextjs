This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase + Prisma Setup (Contact Form Persistence)

This project uses Prisma to persist Contact form submissions into a PostgreSQL database (for example Supabase).

Steps to connect and test:

1. Create a Supabase project at https://app.supabase.com and get the Postgres connection string from Project -> Settings -> Database -> Connection string.

2. Copy `.env.example` to `.env` and set `DATABASE_URL` with the Supabase connection string. Example:

```bash
cp .env.example .env
# edit .env and set DATABASE_URL to your Supabase connection string
```

3. Generate Prisma client (already included as a script):

```bash
npm run prisma:generate
```

4. Run the migration to create the `Contact` table in your database:

```bash
npm run prisma:migrate
```

If you prefer a direct CLI command:

```bash
npx prisma migrate dev --name init
```

5. Start the dev server and test the contact form:

```bash
npm run dev
# open http://localhost:3000 and submit the contact form
```

6. Verify entries in the Supabase table via the Supabase Dashboard -> Table Editor.

Notes:
- The API route `/api/contact` saves submissions to the `Contact` table and will optionally send an email if SMTP env vars are configured.
- Required env var: `DATABASE_URL`. Optional SMTP vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`.

## Admin authentication and dashboard

To enable the admin login flow, add these Supabase environment variables to `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=admin@rija-azeem.dev
ADMIN_PASSWORD=AdminPassword123!
```

Create the `profiles` table in Supabase if it does not already exist:

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id text PRIMARY KEY,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now()
);
```

Run the seed script locally to create the first admin user and profile:

```bash
npm install
npm run seed-admin
```

After seeding, open `/admin/login` and sign in with the seeded admin credentials. The admin interface includes Dashboard and Contact Queries pages, status updates, and logout.

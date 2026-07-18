import Link from "next/link";
import { siteConfig } from "@/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 px-6 py-12 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">Rija Azeem</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-cyan-500">
              {item.title}
            </Link>
          ))}
        </div>
        <p className="text-zinc-400">© {new Date().getFullYear()} Rija Azeem. All rights reserved.</p>
      </div>
    </footer>
  );
}

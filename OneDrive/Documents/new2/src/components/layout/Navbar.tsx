"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/constants/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navAnimation = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navAnimation}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="#home" className="font-semibold tracking-tight text-foreground">
          Rija<span className="text-cyan-500">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-500"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                }`}>
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-foreground shadow-sm transition hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-950/90 dark:text-zinc-100 dark:hover:border-zinc-500"
            onClick={() => setOpen((current) => !current)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="md:hidden"
          >
            <div className="space-y-1 border-t border-zinc-200 bg-background/95 px-6 py-4 backdrop-blur-xl dark:border-zinc-700">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-3xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-zinc-100 dark:hover:bg-white/5"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

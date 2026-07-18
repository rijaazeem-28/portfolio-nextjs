"use client";

import { useTheme } from "next-themes";
import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-foreground shadow-sm transition hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-950/90 dark:text-zinc-100 dark:hover:border-zinc-500"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {mounted && currentTheme === "dark" ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  );
}

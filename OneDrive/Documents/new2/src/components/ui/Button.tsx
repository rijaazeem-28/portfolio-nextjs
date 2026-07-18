import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";

  const variantStyles =
    variant === "secondary"
      ? "border border-zinc-200 bg-white/90 text-foreground shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950/90 dark:text-zinc-100 dark:hover:bg-zinc-900"
      : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-400";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}

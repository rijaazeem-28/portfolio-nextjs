import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Rija Azeem | Full Stack MERN Developer",
  description:
    "Rija Azeem is a Full Stack MERN Developer building modern, fast, and scalable web applications with a polished portfolio experience.",
  metadataBase: new URL("https://rija-azeem.dev"),
  alternates: {
    canonical: "/",
  },
  keywords: ["Full Stack Developer", "MERN", "Next.js", "React", "TypeScript", "Portfolio", "Web Developer"],
  openGraph: {
    title: "Rija Azeem | Full Stack MERN Developer",
    description:
      "A production-ready portfolio showcasing MERN development, modern UI, animations, and accessible SEO-first design.",
    type: "website",
    url: "https://rija-azeem.dev",
    siteName: "Rija Azeem Portfolio",
    images: [
      {
        url: "/favicon.ico",
        width: 48,
        height: 48,
        alt: "Rija Azeem Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rija Azeem | Full Stack MERN Developer",
    description:
      "A premium portfolio for a Full Stack MERN Developer with modern UI, performance, and SEO.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

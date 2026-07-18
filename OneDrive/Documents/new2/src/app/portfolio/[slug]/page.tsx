import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/constants/data";

interface PortfolioPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PortfolioPageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "Project details not found.",
    };
  }

  return {
    title: `${project.title} | Rija Azeem Portfolio`,
    description: project.description,
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function PortfolioPage({ params }: PortfolioPageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Project Detail</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{project.description}</p>
        </div>
        <Link href="/" className="rounded-full border border-zinc-200 bg-white/90 px-5 py-3 text-sm font-medium transition hover:border-cyan-300/20 hover:bg-cyan-50 dark:border-zinc-700 dark:bg-zinc-950/90 dark:hover:bg-zinc-900">
          Back to Home
        </Link>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70">
            <Image src={project.image} alt={project.title} width={1200} height={700} className="rounded-[1.75rem] object-cover" />
          </div>
          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70">
            <h2 className="text-2xl font-semibold text-foreground">Problem</h2>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">{project.problem}</p>
            <h2 className="text-2xl font-semibold text-foreground">Solution</h2>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">{project.solution}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70">
            <h2 className="text-2xl font-semibold text-foreground">Tech Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-500">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70">
            <h2 className="text-2xl font-semibold text-foreground">Challenges</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {project.challenges.map((challenge) => (
                <li key={challenge}>• {challenge}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70">
            <h2 className="text-2xl font-semibold text-foreground">Links</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link href={project.repoUrl} target="_blank" className="rounded-full bg-slate-100 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-cyan-50 dark:bg-white/5 dark:hover:bg-zinc-900">
                View Repository
              </Link>
              <Link href={project.liveUrl} target="_blank" className="rounded-full bg-cyan-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan-400">
                Visit Live Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

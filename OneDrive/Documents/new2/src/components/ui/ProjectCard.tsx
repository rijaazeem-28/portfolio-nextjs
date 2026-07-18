"use client";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/80 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition hover:border-cyan-300/20 dark:border-white/5 dark:bg-zinc-950/70"
    >
      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-zinc-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={project.featured}
        />
      </div>
      <div className="space-y-4 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-500">
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-full bg-zinc-900/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              Featured
            </span>
          )}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-zinc-600 dark:bg-white/5 dark:text-zinc-300">
              {item}
            </span>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-medium transition hover:border-cyan-300/20 hover:bg-cyan-50 dark:border-zinc-700 dark:bg-zinc-950/90 dark:hover:bg-zinc-900"
          >
            <GitBranch size={16} /> GitHub
          </Link>
          <Link
            href={project.liveUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-medium transition hover:border-cyan-300/20 hover:bg-cyan-50 dark:border-zinc-700 dark:bg-zinc-950/90 dark:hover:bg-zinc-900"
          >
            <ExternalLink size={16} /> Live Demo
          </Link>
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-blue-400"
          >
            Details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

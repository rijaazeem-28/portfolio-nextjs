"use client";

import { useMemo, useState } from "react";
import { projects, projectCategories } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function PortfolioSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof projectCategories[number]>("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = filter === "All" || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || project.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <section id="portfolio" className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="Portfolio" description="Showcasing polished applications and full-stack systems." />
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/80 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === category
                    ? "bg-cyan-500 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects"
              className="min-w-0 flex-1 rounded-full border border-zinc-200 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
            />
          </div>
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          {filteredProjects.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-white/80 p-10 text-center text-zinc-600 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70 dark:text-zinc-300">
              No projects match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

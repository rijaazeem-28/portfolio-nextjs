"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = ["All", "Frontend", "Backend", "Database", "Tools"] as const;

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");

  const filteredSkills = useMemo(
    () => (activeCategory === "All" ? skills : skills.filter((skill) => skill.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section id="skills" className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="Skills" description="Technical strengths and modern development tools." />
        <div className="flex flex-wrap gap-3 rounded-full bg-zinc-950/5 p-2 dark:bg-white/5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-cyan-500 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ y: -6 }}
              className="rounded-[2rem] border border-white/10 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition hover:border-cyan-300/20 dark:border-white/5 dark:bg-zinc-950/70"
            >
              <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{skill.level} proficiency</p>
              <span className="mt-5 inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-500">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

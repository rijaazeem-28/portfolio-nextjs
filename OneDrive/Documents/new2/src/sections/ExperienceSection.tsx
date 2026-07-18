"use client";

import { motion } from "framer-motion";
import { experience } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="Experience" description="A timeline of projects, internships, and freelance milestones." />
        <div className="grid gap-6">
          {experience.map((item) => (
            <motion.article
              key={item.year}
              whileHover={{ x: 4 }}
              className="group rounded-[2rem] border border-white/10 bg-white/80 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition hover:border-cyan-300/20 dark:border-white/5 dark:bg-zinc-950/70"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-3xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-semibold">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.subtitle}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

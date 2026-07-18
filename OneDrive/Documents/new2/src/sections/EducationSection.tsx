"use client";

import { motion } from "framer-motion";
import { education } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EducationSection() {
  return (
    <section id="education" className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="Education" description="Academic highlights and professional coursework." />
        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((item) => (
            <motion.article
              key={item.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-white/10 bg-white/80 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">{item.year}</p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

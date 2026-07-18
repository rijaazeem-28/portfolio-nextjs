"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionCard } from "@/components/ui/SectionCard";

const aboutStats = [
  { label: "Projects Completed", value: "25+" },
  { label: "Technologies", value: "20+" },
  { label: "Learning Journey", value: "Ongoing" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/15 to-transparent blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="About" description="Crafting scalable digital products with clarity and performance." />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <SectionCard title="Professional Introduction">
              <p>
                I am a passionate Full Stack MERN Developer who enjoys building modern, responsive and scalable web applications. My work combines clean code, thoughtful UX, and high performance.
              </p>
              <p className="mt-4">
                From landing pages to full-stack systems, I focus on delivering projects that feel polished and work reliably across devices.
              </p>
            </SectionCard>
            <SectionCard title="Career Journey">
              <ul className="space-y-4">
                <li>
                  <strong>2024:</strong> Full Stack MERN Developer delivering client projects with modern stacks.
                </li>
                <li>
                  <strong>2023:</strong> Software Engineering Intern building internal dashboards and reusable UI systems.
                </li>
                <li>
                  <strong>2022:</strong> Junior Web Developer creating responsive marketing sites for agencies.
                </li>
              </ul>
            </SectionCard>
          </div>
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {aboutStats.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[1.75rem] border border-white/10 bg-white/80 p-6 text-center shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70"
                >
                  <p className="text-3xl font-semibold text-foreground">{item.value}</p>
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{item.label}</p>
                </motion.div>
              ))}
            </div>
            <SectionCard title="Education & Goals">
              <p>
                Pursuing a B.Sc. in Computer Science while building real-world web applications and refining my systems design skills.
              </p>
              <p className="mt-4">
                My goal is to create scalable products that feel fast, accessible, and polished for every user.
              </p>
            </SectionCard>
          </div>
        </div>
      </div>
    </section>
  );
}

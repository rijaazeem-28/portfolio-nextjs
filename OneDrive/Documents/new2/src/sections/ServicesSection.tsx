"use client";

import { motion } from "framer-motion";
import { services } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="Services" description="Modern development services tailored for startups and businesses." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -8 }}
              className="rounded-[2rem] border border-white/10 bg-white/80 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition hover:border-cyan-300/20 dark:border-white/5 dark:bg-zinc-950/70"
            >
              <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useTypingText } from "@/hooks/useTypingText";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const typed = useTypingText("Building Modern, Fast & Scalable Web Applications.", 80);

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20 sm:pt-28 lg:pt-32">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute right-[-120px] top-28 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute left-[-100px] top-48 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:px-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-500 ring-1 ring-cyan-500/10">
            Full Stack MERN Developer
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I’m <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Rija Azeem</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-zinc-600 dark:text-zinc-300">
            {typed}
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            I am a passionate Full Stack MERN Developer who enjoys building modern, responsive and scalable web applications.
            I love solving problems, learning new technologies and transforming ideas into high-quality digital experiences.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="#portfolio">
              <Button>View Portfolio</Button>
            </Link>
            <Link href="/resume.pdf" target="_blank" className="inline-flex">
              <Button variant="secondary">Download Resume</Button>
            </Link>
            <Link href="#contact" className="inline-flex">
              <Button variant="secondary">Contact Me</Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <a href="https://github.com/rija-azeem" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-white/5">
              <FaGithub size={18} /> GitHub
            </a>
            <a href="https://linkedin.com/in/rija-azeem" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-white/5">
              <FaLinkedin size={18} /> LinkedIn
            </a>
            <a href="https://instagram.com/rija.azeem" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-white/5">
              <FaInstagram size={18} /> Instagram
            </a>
            <a href="mailto:hello@rija-azeem.dev" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-white/5">
              <Mail size={18} /> Email
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="relative h-[420px] w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white to-slate-100 shadow-2xl shadow-slate-900/5 dark:from-zinc-950 dark:to-zinc-900 dark:border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,211,255,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_40%)]" />
            <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute right-10 bottom-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="rounded-3xl border border-white/10 bg-white/80 px-6 py-4 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:bg-zinc-950/80">
                <p className="text-sm uppercase tracking-[0.32em] text-zinc-500 dark:text-zinc-400">Featured project</p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">Premium Experience</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Intuitive motion, fast performance, and a polished interface built for recruiters and clients.
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 text-left text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-3">
                <div>
                  <p className="font-semibold text-foreground">Projects</p>
                  <p>6+</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Experience</p>
                  <p>3 Years</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Clients</p>
                  <p>Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContactFormValues } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(3, "Please enter a subject."),
  message: z.string().min(10, "Please share more details."),
});

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setServerMessage("Message sent successfully. I will reply soon.");
      reset();
    } catch (error) {
      setStatus("error");
      setServerMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="Contact" description="Send a professional message and start a new project." />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-[2rem] border border-white/10 bg-white/80 p-10 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70"
          >
            <h3 className="text-2xl font-semibold text-foreground">Let’s build something great.</h3>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Whether you need a product website, a full-stack system, or an API integration, I’m ready to help.
            </p>
            <div className="mt-8 space-y-5 text-sm text-zinc-600 dark:text-zinc-300">
              <p>
                <strong>Email:</strong> rijaazeem2828@gmail.com
              </p>
              <p>
                <strong>Location:</strong> Lahore, Pakistan
              </p>
              <p>
                <strong>Availability:</strong> Open for freelance and contract work.
              </p>
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[2rem] border border-white/10 bg-white/80 p-10 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-foreground">
                <span>Name</span>
                <input
                  {...register("name")}
                  className="w-full rounded-3xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
                  placeholder="Your name"
                />
                {errors.name && <span className="text-xs text-rose-500">{errors.name.message}</span>}
              </label>
              <label className="space-y-2 text-sm text-foreground">
                <span>Email</span>
                <input
                  {...register("email")}
                  className="w-full rounded-3xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
                  placeholder="Your email"
                />
                {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
              </label>
              <label className="space-y-2 text-sm text-foreground">
                <span>Phone (optional)</span>
                <input
                  {...register("phone")}
                  className="w-full rounded-3xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
                  placeholder="Phone or WhatsApp number"
                />
                {errors.phone && <span className="text-xs text-rose-500">{errors.phone.message}</span>}
              </label>
            </div>
            <label className="mt-5 space-y-2 text-sm text-foreground">
              <span>Subject</span>
              <input
                {...register("subject")}
                className="w-full rounded-3xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
                placeholder="Project subject"
              />
              {errors.subject && <span className="text-xs text-rose-500">{errors.subject.message}</span>}
            </label>
            <label className="mt-5 space-y-2 text-sm text-foreground">
              <span>Message</span>
              <textarea
                {...register("message")}
                rows={6}
                className="w-full rounded-[1.75rem] border border-zinc-200 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
                placeholder="Tell me about your project"
              />
              {errors.message && <span className="text-xs text-rose-500">{errors.message.message}</span>}
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {serverMessage && (
              <div className={`mt-5 rounded-3xl border px-4 py-4 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
                {serverMessage}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

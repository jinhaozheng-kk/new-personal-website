"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

const projects = [
  {
    no: "P-01",
    title: "Accessibility & Usability Scoring Pipeline",
    stack: "Python · Data Pipeline · Multi-source",
    desc: "Dual-stream accessibility/usability scoring pipeline for an industry client — multi-source loading, field normalisation, rule parsing, scoring at participant/cohort/task/project granularity with auditable CSV outputs.",
    accent: "#7df9ff",
  },
  {
    no: "P-02",
    title: "ZhiJiao AI Education Platform",
    stack: "AI Product Architecture · K12 · RAG",
    desc: "End-to-end architecture for a K12 AI EdTech platform: student loop (AI tutoring → error analysis → adaptive drills), teacher tooling (one-click exams, tiered homework), layered system design with RAG retrieval, prompt management and model routing.",
    accent: "#ff2d92",
  },
  {
    no: "P-03",
    title: "AI News Video Maker",
    stack: "Python · LLM Workflow · TTS",
    desc: "Self-built end-to-end automation: news ingestion → content filtering → Chinese script generation → speech synthesis → video composition. Config-driven, reusable, built fast with agentic coding.",
    accent: "#c8ff00",
  },
  {
    no: "P-04",
    title: "CIFAR-10 / ResNet9 Classifier",
    stack: "PyTorch · ResNet · GPU Training",
    desc: "Image classification with a hand-built ResNet9 — residual blocks, batch norm, data augmentation, training-curve analysis on GPU.",
    accent: "#8b5cf6",
  },
  {
    no: "P-05",
    title: "RVC Voice Conversion — Local Inference",
    stack: "PyTorch · CUDA · OSS Reproduction",
    desc: "Reproduced an open-source voice-conversion project on Windows + NVIDIA: CUDA/dependency configuration, issue-driven debugging, full local inference chain.",
    accent: "#7df9ff",
  },
  {
    no: "P-06",
    title: "Distributed Music Recommender",
    stack: "Recommender Systems · Distributed Arch",
    desc: "Undergraduate thesis: distributed recommendation system for music content delivery — data flow, module decomposition, engineering delivery. Plus: fuzzy-PID sensor calibration system (software copyright, provincial 2nd prize).",
    accent: "#ff2d92",
  },
];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-14">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-acid">
            04 / selected work
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">
            Projects that <span className="gradient-text">shipped</span>
          </h2>
        </Reveal>

        <div className="mt-16">
          {projects.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.04} direction="skew">
              <motion.div
                data-hover
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === i ? null : i)}
                className="group relative cursor-none border-b border-white/10 py-7 md:py-8"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span
                      className="font-mono text-xs"
                      style={{ color: p.accent }}
                    >
                      {p.no}
                    </span>
                    <motion.h3
                      animate={{
                        x: active === i ? 18 : 0,
                        color: active === i ? p.accent : "#ece8f4",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="font-display text-xl font-bold md:text-3xl"
                    >
                      {p.title}
                    </motion.h3>
                  </div>
                  <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-widest text-white/35 md:block">
                    {p.stack}
                  </span>
                </div>

                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pt-4 font-mono text-sm leading-7 text-white/60 md:pl-[4.5rem]">
                        {p.desc}
                      </p>
                      <p className="pt-2 font-mono text-[11px] uppercase tracking-widest text-white/35 md:hidden">
                        {p.stack}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* hover accent bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px"
                  style={{ background: p.accent }}
                  animate={{ width: active === i ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-white/35">
            also: diabetes tri-class prediction · world bank economic structure
            viz · nba player multi-class analysis · voice chatbot (ASR/NLP/GUI)
          </p>
        </Reveal>
      </div>
    </section>
  );
}

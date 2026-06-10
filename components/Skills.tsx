"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const groups = [
  {
    tag: "AI / Agentic Coding",
    color: "text-neon border-neon/40",
    items: ["Codex", "Claude Code", "Skills", "Subagents", "AI Workflows", "Prompt Engineering", "RAG"],
  },
  {
    tag: "ML / Data",
    color: "text-magenta border-magenta/40",
    items: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "CNN / ResNet", "Feature Engineering", "Model Evaluation"],
  },
  {
    tag: "Web / Engineering",
    color: "text-violet border-violet/40",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Git / GitHub", "CUDA", "Jupyter", "Local Deployment"],
  },
  {
    tag: "Craft",
    color: "text-acid border-acid/40",
    items: ["Open-source Reproduction", "Issue Analysis", "Minimal Repro", "Debugging", "Tech Docs"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-14">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-magenta">
            02 / arsenal
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">
            Tools I <span className="text-stroke-neon">bend</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-12">
          {groups.map((g, gi) => (
            <Reveal key={g.tag} direction={gi % 2 === 0 ? "left" : "right"} delay={gi * 0.05}>
              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <span className={`h-fit w-fit border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] ${g.color}`}>
                  {g.tag}
                </span>
                <div className="flex flex-wrap gap-3">
                  {g.items.map((item, i) => (
                    <motion.span
                      key={item}
                      data-hover
                      initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 260,
                        damping: 14,
                      }}
                      whileHover={{
                        scale: 1.12,
                        rotate: i % 2 ? 2 : -2,
                        backgroundColor: "rgba(125,249,255,0.08)",
                      }}
                      className="border border-white/15 px-4 py-2 font-display text-sm font-medium text-white/80"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

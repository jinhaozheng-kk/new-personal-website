"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xGhost = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-32 md:py-44">
      {/* giant ghost text drifting at its own speed */}
      <motion.div
        style={{ x: xGhost }}
        className="pointer-events-none absolute top-8 whitespace-nowrap font-display text-[18vw] font-bold leading-none text-white/[0.04]"
        aria-hidden
      >
        ABOUT — ABOUT — ABOUT
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.4fr] md:px-14">
        <Reveal direction="left">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-neon">
            01 / profile
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            Human in the loop,{" "}
            <span className="gradient-text">agents in the stack.</span>
          </h2>
        </Reveal>

        <div className="space-y-6 font-mono text-sm leading-7 text-white/65 md:text-[15px] md:leading-8">
          <Reveal direction="right" delay={0.1}>
            <p>
              Master of Data Science at the University of Sydney (ML / Data
              Science track), B.Eng in Computer Science. Solid foundations in
              Python, machine learning, deep learning and data analysis — I run
              the full loop from data cleaning and feature engineering to model
              training, evaluation and interpretation.
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.2}>
            <p>
              I work at the intersection of{" "}
              <span className="text-neon">AI agents and engineering
              productivity</span>: Codex, Claude Code, Skills and subagents for
              codebase comprehension, task decomposition, cross-file
              refactoring, bug hunting and automated documentation — turning
              large-model capability into shipping speed.
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.3}>
            <p>
              Beyond models: web app construction with Next.js / TypeScript,
              open-source reproduction, CUDA environment debugging, plus product
              requirement analysis and B2B collaboration experience.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                ["MDS", "USYD · ML/DS"],
                ["B.Eng", "Computer Science"],
                ["SYD", "based · open to work"],
              ].map(([big, small]) => (
                <div
                  key={big}
                  data-hover
                  className="group border border-white/10 p-4 transition-colors hover:border-magenta/60"
                >
                  <div className="font-display text-2xl font-bold text-white group-hover:text-magenta md:text-3xl">
                    {big}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                    {small}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

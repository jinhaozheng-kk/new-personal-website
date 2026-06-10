"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const items = [
  {
    period: "2023.06 — 2023.10",
    role: "Product Manager Intern",
    org: "Huaxin Communication Technology",
    desc: "Market & competitor research feeding product decisions; collected B2B reseller feedback and drove 6 product optimisations — 3 with verified positive user response.",
  },
  {
    period: "2022.07 — 2022.09",
    role: "Content Operations Intern",
    org: "Yueqing Municipal Government, Wenzhou",
    desc: "Structured analysis of public-sentiment big-data material — keyword extraction across township publicity feeds; internal data-analysis tooling and cross-department workflows.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-14">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-violet">
            03 / trajectory
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">
            Where I&apos;ve <span className="text-stroke">been</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-8 md:pl-14">
          {/* growing timeline line */}
          <div className="absolute left-2 top-0 h-full w-px bg-white/10 md:left-4" />
          <motion.div
            style={{ height: lineH }}
            className="absolute left-2 top-0 w-px bg-gradient-to-b from-neon via-violet to-magenta md:left-4"
          />

          <div className="space-y-16">
            {items.map((item, i) => (
              <Reveal key={item.role} direction={i % 2 === 0 ? "right" : "left"}>
                <div className="relative">
                  <span className="absolute -left-[2.05rem] top-2 h-2.5 w-2.5 rounded-full bg-neon shadow-[0_0_12px_#7df9ff] md:-left-[3.55rem]" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-magenta">{item.org}</p>
                  <p className="mt-3 max-w-2xl font-mono text-sm leading-7 text-white/60">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FluidScene = dynamic(() => import("./FluidScene"), { ssr: false });

const letters = "JINHAO".split("");
const letters2 = "ZHENG".split("");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // non-linear scroll mappings — different curves per layer
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const yChip = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden" id="top">
      <motion.div style={{ scale }} className="absolute inset-0">
        <FluidScene />
      </motion.div>

      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050208_95%)]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-14"
      >
        {/* top bar */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Sydney, AU — 33.86°S
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="pulse-glow rounded-full border border-neon/40 px-3 py-1 text-neon"
          >
            ● open to work
          </motion.span>
        </div>

        {/* center title */}
        <motion.div style={{ y: yTitle }} className="select-none">
          <h1 className="font-display font-bold leading-[0.85]">
            <span className="block overflow-hidden text-[16vw] md:text-[11vw]">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%", rotate: 8 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.06,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden text-[16vw] md:text-[11vw]">
              {letters2.map((l, i) => (
                <motion.span
                  key={i}
                  className="text-stroke inline-block"
                  initial={{ y: "110%", rotate: -8 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.06,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-white/60 md:text-base"
          >
            <span className="gradient-text font-bold">AI Application Engineer</span>{" "}
            / ML Engineer / Data Scientist — Master of Data Science @ University
            of Sydney. Turning large-model capability into real engineering
            velocity.
          </motion.p>
        </motion.div>

        {/* bottom bar */}
        <motion.div
          style={{ y: yChip }}
          className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/40"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            scroll to dissolve ↓
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex gap-4"
          >
            <a
              href="https://github.com/jinhaozheng-kk"
              target="_blank"
              rel="noreferrer"
              className="glitch text-neon"
            >
              GitHub
            </a>
            <a href="mailto:jinhaozheng80@gmail.com" className="glitch text-magenta">
              Email
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

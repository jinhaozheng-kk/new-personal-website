"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-44">
      {/* fluid gradient pool */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/10 blur-[120px]" />
        <div className="absolute left-1/4 top-1/3 h-[30vw] w-[30vw] rounded-full bg-magenta/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[25vw] w-[25vw] rounded-full bg-neon/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center md:px-14">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-neon">
            05 / transmission
          </p>
        </Reveal>

        <Reveal direction="skew" delay={0.1}>
          <h2 className="mt-6 font-display text-[13vw] font-bold leading-[0.9] md:text-[8vw]">
            LET&apos;S <span className="gradient-text">BUILD</span>
            <br />
            <span className="text-stroke">SOMETHING</span>
          </h2>
        </Reveal>

        <Reveal delay={0.25}>
          <motion.a
            href="mailto:jinhaozheng80@gmail.com"
            data-hover
            whileHover={{ scale: 1.06, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 16 }}
            className="mt-12 inline-block border border-neon/50 bg-neon/5 px-10 py-5 font-display text-lg font-bold text-neon backdrop-blur transition-colors hover:bg-neon/15 md:text-xl"
          >
            jinhaozheng80@gmail.com ↗
          </motion.a>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-white/45">
            <a
              data-hover
              className="glitch transition-colors hover:text-neon"
              href="https://github.com/jinhaozheng-kk"
              target="_blank"
              rel="noreferrer"
            >
              github / jinhaozheng-kk
            </a>
            <span className="text-magenta">✦</span>
            <span>+61 0432 649 266</span>
            <span className="text-magenta">✦</span>
            <span>sydney, australia</span>
          </div>
        </Reveal>
      </div>

      <footer className="relative mt-28 border-t border-white/10 pt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
        © {new Date().getFullYear()} jinhao zheng — designed in the fluid, built
        with agents
      </footer>
    </section>
  );
}

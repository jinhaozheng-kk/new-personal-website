"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  ["about", "#about"],
  ["skills", "#skills"],
  ["work", "#projects"],
  ["contact", "#contact"],
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-neon via-violet to-magenta"
      />
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-6 top-5 z-[70] flex gap-5 font-mono text-[11px] uppercase tracking-[0.25em] md:right-14"
      >
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            data-hover
            className="glitch text-white/50 transition-colors hover:text-neon"
          >
            {label}
          </a>
        ))}
      </motion.nav>
    </>
  );
}

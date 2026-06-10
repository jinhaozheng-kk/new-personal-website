"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/** Scroll-triggered reveal with a non-linear spring overshoot. */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "skew";
  className?: string;
}) {
  const variants = {
    up: { hidden: { opacity: 0, y: 80 }, show: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -90, rotate: -2 }, show: { opacity: 1, x: 0, rotate: 0 } },
    right: { hidden: { opacity: 0, x: 90, rotate: 2 }, show: { opacity: 1, x: 0, rotate: 0 } },
    skew: {
      hidden: { opacity: 0, y: 60, skewY: 6, scale: 0.96 },
      show: { opacity: 1, y: 0, skewY: 0, scale: 1 },
    },
  }[direction];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{
        delay,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

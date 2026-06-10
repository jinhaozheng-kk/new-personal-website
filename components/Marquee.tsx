"use client";

const items = [
  "PYTHON",
  "PYTORCH",
  "NEXT.JS",
  "CLAUDE CODE",
  "CODEX",
  "TYPESCRIPT",
  "SCIKIT-LEARN",
  "AI AGENTS",
  "CUDA",
  "TAILWIND",
  "PANDAS",
  "LLM WORKFLOWS",
];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink/60 py-3 backdrop-blur">
      <div
        className={`flex w-max whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="mx-6 font-display text-sm font-bold uppercase tracking-[0.35em] text-white/30"
          >
            {item} <span className="mx-4 text-magenta">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

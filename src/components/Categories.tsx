"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const CATEGORIES = [
  {
    id: "sub18",
    label: "SUB-18",
    subtitle: "A BASE DO TOURO",
    description:
      "Formação técnica e identidade desde cedo. Forjamos atletas que carregam o escudo com a mesma intensidade.",
    accent: "red" as const,
    footLabel: "FORMAÇÃO",
  },
  {
    id: "principal",
    label: "PRINCIPAL",
    subtitle: "A ELITE DO TOURO",
    description:
      "O time adulto que representa o clube nas principais competições. Quadra curta, jogo alto.",
    accent: "gold" as const,
    footLabel: "COMPETIÇÃO",
  },
];

export function Categories() {
  return (
    <section
      id="categorias"
      className="relative w-full bg-ink py-24 md:py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex items-center justify-between mb-12">
          <SectionLabel number="§ 04" title="CATEGORIAS" index="IV / VII" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="font-display leading-[0.88] tracking-brutal text-[14vw] md:text-[8.5vw] mb-12 md:mb-16"
        >
          <span className="text-bone">DUAS </span>
          <span className="text-outline">FRENTES.</span>
        </motion.h2>

        {/* Duas cards massivas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => {
            const isRed = cat.accent === "red";
            return (
              <motion.article
                key={cat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative group border overflow-hidden ${
                  isRed ? "border-bull/40" : "border-gold/40"
                } bg-ink-soft min-h-[520px] p-8 md:p-10 flex flex-col`}
              >
                {/* Mancha de fundo grande */}
                <div
                  aria-hidden
                  className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
                    isRed ? "bg-bull/25" : "bg-gold/15"
                  } opacity-60 group-hover:opacity-100`}
                />

                {/* Top header */}
                <div className="relative flex items-center justify-between font-mono text-[10px] tracking-editorial text-bone/50 mb-6">
                  <span>0{i + 1} / 02</span>
                  <span>{cat.footLabel}</span>
                </div>

                {/* Escudo SVG custom */}
                <div className="relative mb-8">
                  <svg
                    viewBox="0 0 120 140"
                    className={`h-28 w-auto ${
                      isRed ? "text-bull" : "text-gold"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M60 6 L110 24 L110 78 C 110 108, 84 130, 60 138 C 36 130, 10 108, 10 78 L 10 24 Z" />
                    <path
                      d="M60 30 L85 42 L85 78 C 85 92, 74 106, 60 112 C 46 106, 35 92, 35 78 L 35 42 Z"
                      opacity="0.35"
                    />
                    {/* Estrela ao centro */}
                    <path
                      d="M60 58 L64 70 L77 70 L67 78 L71 90 L60 82 L49 90 L53 78 L43 70 L56 70 Z"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>

                {/* Label gigante */}
                <h3
                  className={`font-display leading-[0.85] tracking-brutal text-[18vw] md:text-[7.5vw] ${
                    isRed ? "text-bull" : "text-gold"
                  }`}
                >
                  {cat.label}
                </h3>
                <p className="mt-3 font-mono text-[11px] tracking-editorial text-bone/70">
                  {cat.subtitle}
                </p>

                <p className="mt-6 text-sm md:text-base text-bone/70 leading-relaxed max-w-md">
                  {cat.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

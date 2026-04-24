"use client";

import { motion } from "framer-motion";
import { sponsors } from "@/data/sponsors";
import { SectionLabel } from "./SectionLabel";

/**
 * Patrocinadores. Marquee duplo em direções opostas criando tensão visual.
 * Cada "logo" é um cartela monocromática — placeholder até logos reais serem fornecidos.
 */
export function Sponsors() {
  // Duplica os itens para loop sem costura
  const row1 = [...sponsors, ...sponsors];
  const row2 = [...sponsors.slice().reverse(), ...sponsors.slice().reverse()];

  return (
    <section className="relative w-full bg-ink py-24 md:py-32 overflow-hidden border-y border-gold/15">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8 mb-12">
        <div className="flex items-center justify-between mb-10">
          <SectionLabel number="§ 07" title="PARCEIROS" index="VII / VII" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="font-display leading-[0.88] tracking-brutal text-[14vw] md:text-[8.5vw]"
        >
          <span className="text-bone">NOSSOS </span>
          <span className="text-gold">PARCEIROS.</span>
        </motion.h2>
      </div>

      {/* Row 1 */}
      <div className="relative w-full overflow-hidden" aria-hidden>
        <div className="marquee-track flex min-w-max animate-marquee-slow">
          {row1.map((s, i) => (
            <SponsorCard key={`r1-${i}`} sponsor={s} />
          ))}
        </div>
      </div>

      {/* Row 2 — direção oposta */}
      <div className="relative w-full overflow-hidden mt-6" aria-hidden>
        <div className="marquee-track flex min-w-max animate-marquee-reverse">
          {row2.map((s, i) => (
            <SponsorCard key={`r2-${i}`} sponsor={s} variant="outline" />
          ))}
        </div>
      </div>

      {/* CTA "seja patrocinador" */}
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 border border-gold/30 p-8 md:p-12"
        >
          <div className="max-w-lg">
            <div className="font-mono text-[10px] tracking-editorial text-gold mb-3">
              OPORTUNIDADE
            </div>
            <h3 className="font-display text-4xl md:text-5xl leading-[0.95] text-bone">
              VISTA O <span className="text-gold">TOURO</span>.
            </h3>
            <p className="mt-4 text-sm md:text-base text-bone/70 leading-relaxed">
              Associe sua marca à nova força do futsal catarinense. Sua
              identidade em quadra, na torcida e nas redes.
            </p>
          </div>
          <a
            href="mailto:apobullfc@gmail.com?subject=Patrocínio"
            className="group relative inline-flex shrink-0"
          >
            <span className="absolute inset-0 bg-gold translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
            <span className="relative inline-flex items-center gap-4 bg-ink border border-gold px-8 py-4 font-mono text-xs tracking-editorial text-gold group-hover:text-ink group-hover:bg-gold transition-colors">
              <span>SEJA UM PATROCINADOR</span>
              <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                <path
                  d="M0 5 L26 5 M22 1 L26 5 L22 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function SponsorCard({
  sponsor,
  variant = "solid",
}: {
  sponsor: { name: string; kind: string; logo?: string };
  variant?: "solid" | "outline";
}) {
  return (
    <div
      className="mx-3 flex items-center justify-center min-w-[200px] md:min-w-[240px] h-28 px-6"
      title={`${sponsor.name} — PARCEIRO ${sponsor.kind}`}
    >
      {sponsor.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          loading="lazy"
          draggable={false}
          style={{ mixBlendMode: "lighten" }}
          className={`max-h-24 w-auto max-w-[220px] object-contain select-none transition-opacity duration-300 ${
            variant === "solid" ? "opacity-90 hover:opacity-100" : "opacity-70 hover:opacity-100"
          }`}
        />
      ) : (
        <div className="font-display text-2xl leading-none text-bone tracking-wide">
          {sponsor.name}
        </div>
      )}
    </div>
  );
}

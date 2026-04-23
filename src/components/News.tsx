"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { news } from "@/data/news";
import { SectionLabel } from "./SectionLabel";

/**
 * Seção Novidades. Carrossel horizontal com snap nativo (scroll-snap).
 * Cards menores → mais notícias visíveis por vez. Setas no topo controlam
 * o scroll programático com `scrollBy`.
 */
export function News() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Atualiza estado dos botões conforme o scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanPrev(scrollLeft > 4);
      setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    // Rola aproximadamente um card + gap por clique
    const amount = el.clientWidth * 0.72;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section
      id="novidades"
      className="relative w-full bg-ink py-24 md:py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex items-center justify-between mb-12">
          <SectionLabel number="§ 06" title="NOVIDADES" index="VI / VII" />
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] tracking-editorial text-bone/60 hover:text-gold transition-colors"
          >
            TODAS AS NOTÍCIAS
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
              <path
                d="M0 4 L18 4 M14 0 L18 4 L14 8"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </a>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="font-display leading-[0.88] tracking-brutal text-[14vw] md:text-[8.5vw]"
          >
            <span className="text-bone">ÚLTIMAS </span>
            <span className="text-bull">DO TOURO.</span>
          </motion.h2>

          {/* Controles do carrossel + contador */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-editorial text-bone/40 mr-2">
              {String(news.length).padStart(2, "0")} notícias
            </span>
            <CarouselButton
              label="Anterior"
              disabled={!canPrev}
              onClick={() => scrollByAmount("left")}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M16 5 L1 5 M5 1 L1 5 L5 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </CarouselButton>
            <CarouselButton
              label="Próxima"
              disabled={!canNext}
              onClick={() => scrollByAmount("right")}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M0 5 L15 5 M11 1 L15 5 L11 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </CarouselButton>
          </div>
        </div>
      </div>

      {/* Track do carrossel — com sangramento lateral para o efeito "próximos vem dali" */}
      <div
        ref={trackRef}
        className="relative mx-auto max-w-[1400px] px-4 md:px-8 flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {news.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative snap-start flex-none w-[270px] sm:w-[300px] md:w-[320px] bg-ink-soft border border-gold/15 overflow-hidden hover:border-bull/50 transition-colors duration-500"
          >
            {/* Barra vermelha no topo (hover) */}
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-bull group-hover:w-full transition-all duration-700 z-20" />

            {/* Capa */}
            <div className="relative aspect-[3/4] overflow-hidden bg-ink">
              {item.cover ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.cover}
                    alt={item.title}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full ${
                      item.coverFit === "contain"
                        ? "object-contain p-5"
                        : "object-cover"
                    } transition-transform duration-700 group-hover:scale-[1.03]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70 pointer-events-none" />
                </>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(204,0,0,0.4) 0%, rgba(10,10,10,1) 60%), radial-gradient(circle at 30% 40%, rgba(201,168,76,0.2) 0%, transparent 50%)",
                  }}
                />
              )}

              {/* Date badge */}
              <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur px-2.5 py-1 font-mono text-[9px] tracking-editorial text-gold border border-gold/30 z-10">
                {item.date}
              </div>

              {/* Category badge */}
              <div className="absolute top-3 right-3 bg-bull/90 px-2.5 py-1 font-mono text-[9px] tracking-editorial text-bone z-10">
                {item.category}
              </div>

              {/* Número da matéria */}
              <div className="absolute bottom-1 right-3 font-display text-[80px] leading-[0.8] text-bone/15 pointer-events-none group-hover:text-bone/25 transition-colors duration-500 z-10">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Corpo */}
            <div className="p-4 md:p-5">
              <div className="font-mono text-[9px] tracking-editorial text-bone/50 mb-2">
                {item.tag}
              </div>

              <h3 className="font-display text-xl md:text-2xl leading-[0.95] text-bone mb-3 group-hover:text-gold transition-colors duration-500">
                {item.title}
              </h3>

              <p className="text-xs text-bone/65 leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-gold/10">
                <span className="font-mono text-[9px] tracking-editorial text-bone/40">
                  APOBULL / {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] tracking-editorial text-gold/70 group-hover:text-bull transition-colors flex items-center gap-1.5">
                  LER
                  <svg width="12" height="6" viewBox="0 0 14 6" fill="none">
                    <path
                      d="M0 3 L12 3 M9 0 L12 3 L9 6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </motion.article>
        ))}

        {/* Espaço extra ao final para dar respiro no snap do último card */}
        <div className="flex-none w-1 md:w-4" aria-hidden />
      </div>
    </section>
  );
}

function CarouselButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border border-gold/30 text-bone hover:bg-bull hover:border-bull hover:text-bone transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-bone disabled:hover:border-gold/30"
    >
      {children}
    </button>
  );
}

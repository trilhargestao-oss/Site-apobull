"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery } from "@/data/gallery";
import { SectionLabel } from "./SectionLabel";

/**
 * Masonry "quebrada" com tamanhos variados + lightbox full-screen.
 * Imagens em grayscale com overlay duotone no hover.
 */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? 0 : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? 0 : (i - 1 + gallery.length) % gallery.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const sizeClass = (s: (typeof gallery)[number]["size"]) => {
    switch (s) {
      case "tall":
        return "row-span-2";
      case "wide":
        return "col-span-2";
      case "lg":
        return "row-span-2 col-span-2";
      default:
        return "";
    }
  };

  const current = openIndex !== null ? gallery[openIndex] : null;

  return (
    <section
      id="galeria"
      className="relative w-full bg-ink-soft py-24 md:py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex items-center justify-between mb-12">
          <SectionLabel number="§ 05" title="GALERIA" index="V / VII" />
          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-editorial text-bone/40">
            <span>{String(gallery.length).padStart(2, "0")} FRAMES</span>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="font-display leading-[0.88] tracking-brutal text-[14vw] md:text-[8.5vw] mb-16"
        >
          <span className="text-bone">MOMENTOS </span>
          <span className="text-gold">QUE MARCAM.</span>
        </motion.h2>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4 [grid-auto-flow:dense]">
          {gallery.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden bg-ink border border-gold/10 ${sizeClass(
                item.size
              )}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="duotone absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay vermelho no hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-bull/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />

              {/* Caption reveal */}
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-editorial text-bone">
                  <span className="text-gold">#{String(i + 1).padStart(2, "0")}</span>
                  <span>APOBULL FC</span>
                </div>
                <div className="mt-2 text-xs md:text-sm text-bone leading-snug">
                  {item.caption}
                </div>
              </div>

              {/* Corner marker */}
              <div className="absolute top-3 right-3 font-mono text-[9px] tracking-editorial text-bone/40 group-hover:text-gold transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex flex-col"
            onClick={() => setOpenIndex(null)}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20 font-mono text-[11px] tracking-editorial text-bone/70">
              <span>
                <span className="text-gold">{String(openIndex + 1).padStart(2, "0")}</span>
                {" / "}
                {String(gallery.length).padStart(2, "0")}
              </span>
              <span className="hidden md:inline">APOBULL FC — GALERIA</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex(null);
                }}
                className="flex items-center gap-2 hover:text-bull transition-colors"
                aria-label="Fechar"
              >
                <span>FECHAR</span>
                <span>✕</span>
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative">
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.caption}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-full max-w-full object-contain duotone"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex(
                    (openIndex - 1 + gallery.length) % gallery.length
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 flex items-center justify-center text-bone hover:bg-bull hover:border-bull transition-colors"
                aria-label="Anterior"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((openIndex + 1) % gallery.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 flex items-center justify-center text-bone hover:bg-bull hover:border-bull transition-colors"
                aria-label="Próxima"
              >
                →
              </button>
            </div>

            {/* Bottom caption */}
            <div className="px-6 py-5 border-t border-gold/20 font-mono text-xs tracking-editorial text-bone/80">
              <span className="text-gold mr-3">
                #{String(openIndex + 1).padStart(2, "0")}
              </span>
              {current.caption}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

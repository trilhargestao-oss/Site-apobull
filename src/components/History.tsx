"use client";

import { motion } from "framer-motion";
import { history } from "@/data/history";
import { SectionLabel } from "./SectionLabel";

/**
 * Seção "DOIS CLUBES. UMA ALMA." — layout editorial com três marcos,
 * entrada animada em stagger conforme o viewport. Fundo com bleed
 * vermelho sutil vindo do canto inferior direito.
 */
export function History() {
  return (
    <section
      id="historia"
      className="relative min-h-screen w-full bg-ink py-24 md:py-32 overflow-hidden"
    >
      {/* Bleed vermelho radial */}
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(204,0,0,0.22) 0%, rgba(204,0,0,0) 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex items-center justify-between mb-16">
          <SectionLabel number="§ 02" title="HISTÓRIA" index="II / VII" />
          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-editorial text-bone/40">
            <span>EST.</span>
            <span className="font-display text-2xl text-gold leading-none">2026</span>
          </div>
        </div>

        {/* Headline monumental */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="mb-20 md:mb-28"
        >
          <h2 className="font-display leading-[0.88] tracking-brutal text-[14vw] md:text-[9vw]">
            <span className="block text-bone">DOIS CLUBES.</span>
            <span className="block">
              <span className="text-bull">UMA</span>{" "}
              <span className="text-gold">ALMA.</span>
            </span>
          </h2>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-bone/70 leading-relaxed">
            O Apobull nasceu da fusão entre o{" "}
            <span className="text-bone">Red Bull Cedro</span> e o{" "}
            <span className="text-bone">Apokapse</span>, dois times que marcaram
            o futsal de São José do Cedro. Unidos, somos mais fortes.
          </p>
        </motion.div>

        {/* Timeline horizontal */}
        <div className="relative">
          {/* Linha conectora */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {history.map((marker, i) => (
              <motion.article
                key={marker.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Nó na timeline */}
                <div className="hidden md:flex relative h-24 items-center justify-center">
                  <div
                    className={`h-4 w-4 rotate-45 ${
                      marker.accent === "red"
                        ? "bg-bull"
                        : marker.accent === "gold"
                        ? "bg-gold"
                        : "bg-bone"
                    } shadow-[0_0_0_6px_rgba(10,10,10,1),0_0_0_7px_rgba(201,168,76,0.3)]`}
                  />
                </div>

                <div className="md:pt-4 relative">
                  <div className="flex items-baseline gap-3 font-mono text-[10px] tracking-editorial text-bone/50 mb-3">
                    <span className="text-gold">0{i + 1}</span>
                    <span>{marker.era}</span>
                  </div>

                  <div className="font-display text-5xl md:text-6xl text-gold leading-none mb-3">
                    {marker.year}
                  </div>

                  {marker.clubs ? (
                    <div className="mb-2">
                      {marker.clubs.map((c, idx) => (
                        <h3
                          key={c}
                          className={`font-display text-3xl md:text-4xl leading-[0.95] ${
                            idx === 0 ? "text-bull" : "text-bone"
                          }`}
                        >
                          {c}
                        </h3>
                      ))}
                    </div>
                  ) : (
                    <h3
                      className={`font-display text-3xl md:text-4xl leading-tight mb-2 ${
                        marker.accent === "red"
                          ? "text-bull"
                          : marker.accent === "gold"
                          ? "text-gold"
                          : "text-bone"
                      }`}
                    >
                      {marker.title}
                    </h3>
                  )}

                  <p className="text-sm text-bone/60 italic mb-4">
                    {marker.subtitle}
                  </p>

                  <div className="h-px w-12 bg-bull/60 mb-4" />

                  <p className="text-sm text-bone/75 leading-relaxed max-w-xs">
                    {marker.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Badge final — bleed de clubes fundadores */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-24 md:mt-32 flex flex-wrap items-center justify-center gap-8 md:gap-16 font-mono text-[11px] tracking-editorial text-bone/50"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-bull" />
            <span>RED BULL CEDRO</span>
          </div>
          <span className="font-display text-3xl text-gold leading-none">+</span>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-bone" />
            <span>APOKAPSE</span>
          </div>
          <span className="font-display text-3xl text-gold leading-none">=</span>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-bone">APOBULL FC</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

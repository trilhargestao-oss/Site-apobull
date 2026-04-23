"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HeroBullVideo } from "./HeroBullVideo";
import { Particles } from "./Particles";
import { Ticker } from "./Ticker";

const TICKER_ITEMS = [
  "O TOURO VESTE ASAS",
  "APOBULL FC — EST. 2026",
  "R. JORGE LACERDA, 1100 — CENTRO — SJC / SC",
  "FUTSAL",
  "RED BULL CEDRO × APOKAPSE",
  "DOIS CLUBES · UMA ALMA",
  "26°27′03″S · 53°29′36″W",
];

/**
 * Seção Hero. Layout editorial com corner labels, logo animado,
 * tipografia monumental "O TOURO / VESTE ASAS" e CTA âncora.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Altura do "trilho" de scroll do hero. Mais alto = animação do touro
  // mais lenta / mais tempo pinado antes de liberar para a próxima seção.
  // 250vh dá ~150vh de scroll com o hero travado (sticky), tempo suficiente
  // para o vídeo do touro rodar de ponta a ponta sem parecer corrido.
  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[250vh] w-full bg-ink"
    >
      {/*
        Container sticky — ocupa 100vh e fica pinado no topo da viewport
        enquanto o usuário rola pelos 250vh da section. Toda a UI do hero
        (partículas, ticker, logo, headline, CTA, scroll indicator) vive aqui.
        Quando o pin se solta, a próxima seção (História) aparece.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
      {/* Textura de grama ao fundo (overlay muito escuro) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 4px), radial-gradient(ellipse at center, rgba(204,0,0,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Campo de partículas */}
      <Particles />

      {/* Ticker superior, logo abaixo do header */}
      <div className="absolute top-[72px] inset-x-0 border-y border-gold/15 bg-ink/60 backdrop-blur-sm py-2.5 z-20">
        <Ticker items={TICKER_ITEMS} />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex-1 flex items-center pt-[140px] pb-20">
        <div className="w-full mx-auto max-w-[1400px] px-4 md:px-8 grid grid-cols-12 gap-6 items-center">

          {/* Coluna esquerda — meta info editorial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden md:flex col-span-2 flex-col gap-8 font-mono text-[10px] tracking-editorial text-bone/60 uppercase"
          >
            <div>
              <div className="text-gold mb-2">§ 01</div>
              <div>Hero</div>
              <div className="text-bone/40 mt-1">I / VII</div>
            </div>
            <div>
              <div className="text-gold mb-2">SEDE</div>
              <div>R. JORGE LACERDA, 1100</div>
              <div>ED. DR. NEME</div>
              <div className="text-bone/40 mt-1">CENTRO / SJC — SC</div>
            </div>
            <div>
              <div className="text-gold mb-2">COORD.</div>
              <div>26°27′03″ S</div>
              <div>53°29′36″ W</div>
            </div>
          </motion.div>

          {/* Coluna central — logo + headline */}
          <div className="col-span-12 md:col-span-8 flex flex-col items-center text-center">
            <HeroBullVideo
              targetRef={sectionRef}
              width={220}
              className="md:hidden"
            />
            <HeroBullVideo
              targetRef={sectionRef}
              width={320}
              className="hidden md:block"
            />

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display mt-8 md:mt-10 leading-[0.82] tracking-brutal"
            >
              <span className="block text-[18vw] md:text-[11vw] text-bone">
                O TOURO
              </span>
              <span className="block text-[18vw] md:text-[11vw]">
                <span className="text-bone">VESTE </span>
                <span className="text-outline">ASAS</span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-8 flex items-center gap-4 font-mono text-xs tracking-editorial text-bone/80"
            >
              <span className="h-px w-8 bg-gold" />
              <span>SÃO JOSÉ DO CEDRO</span>
              <span className="text-bull">·</span>
              <span>SC</span>
              <span className="text-bull">·</span>
              <span>FUTSAL</span>
              <span className="h-px w-8 bg-gold" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mt-12"
            >
              <a href="#historia" className="group relative inline-flex">
                <span className="absolute inset-0 bg-bull translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                <span className="relative inline-flex items-center gap-4 bg-ink border border-gold/50 px-8 py-4 font-mono text-xs tracking-editorial text-bone group-hover:border-bull group-hover:text-bone transition-colors">
                  <span>CONHEÇA O CLUBE</span>
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

          {/* Coluna direita — escudo de detalhe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden md:flex col-span-2 flex-col items-end gap-8 font-mono text-[10px] tracking-editorial text-bone/60 uppercase text-right"
          >
            <div>
              <div className="text-gold mb-2">TEMPORADA</div>
              <div className="text-bone">2026</div>
            </div>
            <div>
              <div className="text-gold mb-2">FORMATO</div>
              <div>FUTSAL</div>
              <div>ADULTO + BASE</div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl text-bull leading-none">
                02
              </span>
              <span className="text-bone/50">clubes<br/>fundadores</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-12 z-20 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] tracking-editorial text-bone/60 [writing-mode:vertical-rl] rotate-180">
          SCROLL
        </span>
        <div className="relative h-16 w-px bg-gold/30 overflow-hidden">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold animate-scroll-dot" />
        </div>
      </motion.div>

      {/* Borda inferior dourada hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    </section>
  );
}

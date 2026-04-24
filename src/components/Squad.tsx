"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, players, type Category, type Player } from "@/data/players";
import { coachesByCategory, type Coach } from "@/data/coaches";
import { SectionLabel } from "./SectionLabel";

/**
 * Seção Elenco. Tabs SUB 18 / LIVRE, comissão técnica em destaque,
 * grid de jogadores com placeholders quando o slot está em aberto.
 */
export function Squad() {
  const [active, setActive] = useState<Category>("SUB 18");

  // Categorias que ainda não foram reveladas publicamente: aba fica travada
  // com selo "EM BREVE". Liberar aqui assim que o elenco for anunciado.
  const LOCKED: Category[] = ["LIVRE"];

  const filtered = useMemo(
    () => players.filter((p) => p.category === active && !p.hidden),
    [active]
  );

  return (
    <section
      id="elenco"
      className="relative min-h-screen w-full bg-ink-soft py-24 md:py-32 overflow-hidden"
    >
      {/* Grain vertical local */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Header editorial + contador dinâmico */}
        <div className="flex items-center justify-between mb-12">
          <SectionLabel number="§ 03" title="ELENCO" index="III / VII" />
          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-editorial text-bone/40">
            <span>ATLETAS</span>
            <motion.span
              key={filtered.length}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl text-gold leading-none"
            >
              {String(filtered.length).padStart(2, "0")}
            </motion.span>
          </div>
        </div>

        {/* Headline */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="font-display leading-[0.88] tracking-brutal text-[14vw] md:text-[8.5vw]"
          >
            <span className="text-bone">NOSSO </span>
            <span className="text-bull">ELENCO</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-md text-sm text-bone/65 leading-relaxed font-mono tracking-wide"
          >
            <span className="text-gold">→</span> Atletas que representam a
            nova fase do clube. Sub 18 formando a base; Livre liderando em
            quadra.
          </motion.p>
        </div>

        {/* TABS — filtro de categoria */}
        <div
          role="tablist"
          aria-label="Filtro de categoria"
          className="flex flex-wrap items-center gap-3 mb-14"
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const isLocked = LOCKED.includes(cat);
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                aria-disabled={isLocked}
                disabled={isLocked}
                onClick={() => !isLocked && setActive(cat)}
                className={`relative font-mono text-xs tracking-editorial px-7 py-3.5 transition-colors duration-300 ${
                  isLocked
                    ? "bg-transparent text-bone/30 border border-gold/15 cursor-not-allowed"
                    : isActive
                    ? "bg-bull text-bone border border-bull"
                    : "bg-transparent text-gold border border-gold hover:bg-gold/10"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {cat}
                  {isLocked && (
                    <span className="font-mono text-[9px] tracking-editorial text-gold/60 border border-gold/30 px-1.5 py-0.5">
                      EM BREVE
                    </span>
                  )}
                </span>
                {isActive && !isLocked && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute -bottom-px left-0 right-0 h-px bg-bone"
                  />
                )}
              </button>
            );
          })}

          <div className="ml-auto font-mono text-[10px] tracking-editorial text-bone/40 hidden md:block">
            EXIBINDO{" "}
            <span className="text-gold">
              {String(filtered.length).padStart(2, "0")}
            </span>{" "}
            {filtered.length === 1 ? "ATLETA" : "ATLETAS"}
          </div>
        </div>

        {/* COMISSÃO TÉCNICA — varia por categoria */}
        <CoachingStaff category={active} />

        {/* GRID DE JOGADORES — carrossel scroll-snap no mobile, grid no desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.map((p, i) => (
              <PlayerCard key={p.id} player={p} index={i} />
            ))}
            {/* respiro extra no fim do snap mobile */}
            <div className="flex-none w-1 md:hidden" aria-hidden />
          </motion.div>
        </AnimatePresence>

        {/* CTA desabilitado */}
        <div className="mt-16 flex justify-center">
          <div className="group relative" title="Em breve">
            <button
              disabled
              className="inline-flex items-center gap-4 border border-gold/30 bg-ink/50 px-8 py-4 font-mono text-xs tracking-editorial text-bone/40 cursor-not-allowed"
            >
              <span>VER ELENCO COMPLETO</span>
              <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                <path
                  d="M0 5 L26 5 M22 1 L26 5 L22 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gold text-ink font-mono text-[10px] tracking-editorial px-3 py-1.5 pointer-events-none whitespace-nowrap">
              EM BREVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* COMISSÃO TÉCNICA — subseção própria */
/* ---------------------------------- */
function CoachingStaff({ category }: { category: Category }) {
  const list = coachesByCategory[category];
  // Grid adaptativo no desktop: mantém colunas harmônicas para 3 ou 4 cards.
  // No mobile, a linha vira carrossel horizontal com scroll-snap.
  const gridCols =
    list.length === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-3";

  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-5">
        <span className="h-px flex-1 bg-gold/20" />
        <span className="font-mono text-[10px] tracking-editorial text-gold">
          COMISSÃO TÉCNICA
        </span>
        <span className="h-px flex-1 bg-gold/20" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`flex md:grid ${gridCols} gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {list.map((c, i) => (
            <CoachCard key={c.id} coach={c} index={i} />
          ))}
          <div className="flex-none w-1 md:hidden" aria-hidden />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CoachCard({ coach: c, index: i }: { coach: Coach; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative border border-gold/40 bg-ink/70 hover:border-gold transition-colors overflow-hidden flex flex-col snap-start flex-none w-[70%] sm:w-[50%] md:w-auto"
    >
      {/* Foto — duotone que ganha cor no hover */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-raised">
        {c.photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.photo}
              alt={c.name}
              loading="lazy"
              draggable={false}
              style={{ objectPosition: c.focal ?? "center 28%" }}
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.04] transition-all duration-700 ease-out select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/75 pointer-events-none" />
          </>
        ) : (
          // Fallback silhueta quando placeholder
          <div className="absolute inset-0 flex items-end justify-center pb-6">
            <svg
              viewBox="0 0 100 140"
              className="h-[65%] w-auto text-bone/10 group-hover:text-bone/20 transition-colors"
              fill="currentColor"
            >
              <circle cx="50" cy="38" r="18" />
              <path d="M18 140 C 18 100, 34 78, 50 78 C 66 78, 82 100, 82 140 Z" />
            </svg>
          </div>
        )}

        {/* Index marker canto superior */}
        <div className="absolute top-3 left-3 font-mono text-[10px] tracking-editorial text-gold/80 z-10">
          0{i + 1}
        </div>
        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-editorial text-bone/50 z-10">
          APOBULL
        </div>

        {/* Selo placeholder */}
        {c.placeholder && (
          <div className="absolute bottom-3 right-3 z-10 font-mono text-[10px] tracking-editorial text-gold/60 border border-gold/30 px-2 py-1">
            A DEFINIR
          </div>
        )}
      </div>

      {/* Nome + role */}
      <div className="p-4 md:p-5 border-t border-gold/15 bg-ink">
        <div
          className={`font-mono text-[10px] tracking-editorial ${
            c.placeholder ? "text-gold/50" : "text-gold"
          }`}
        >
          {c.role}
        </div>
        <div
          className={`font-display text-xl md:text-2xl leading-[1.05] mt-1.5 ${
            c.placeholder ? "text-bone/40" : "text-bone group-hover:text-gold"
          } transition-colors`}
        >
          {c.name.toUpperCase()}
        </div>
      </div>

      {/* Linha dourada hover no topo */}
      <span className="absolute top-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-500" />
    </motion.article>
  );
}

/* ---------------------------------- */
/* PLAYER CARD                         */
/* ---------------------------------- */
function PlayerCard({ player: p, index: i }: { player: Player; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: (i % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`card-lift relative bg-ink border group cursor-pointer snap-start flex-none w-[82%] sm:w-[65%] md:w-auto ${
        p.placeholder ? "border-gold/10" : "border-gold/20"
      }`}
    >
      {/* Header do card */}
      <div className="flex items-center justify-between border-b border-gold/15 px-5 py-3 font-mono text-[10px] tracking-editorial text-bone/60">
        <span className={p.placeholder ? "text-gold/50" : "text-gold"}>
          {p.position}
        </span>
        <span>{p.category}</span>
      </div>

      {/* Body */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-ink-raised to-ink">
        {/* Foto do jogador (quando há) — duotone editorial que ganha cor no hover */}
        {p.photo && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.photo}
              alt={p.name}
              loading="lazy"
              draggable={false}
              style={{ objectPosition: p.focal ?? "center 30%" }}
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.04] transition-all duration-700 ease-out select-none"
            />
            {/* Overlay vermelho multiply só aparece em hover */}
            <div className="absolute inset-0 bg-bull/0 group-hover:bg-bull/15 mix-blend-multiply transition-colors duration-700 pointer-events-none" />
            {/* Gradient para legibilidade dos cantos (número + badges) */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-ink/25 to-ink/70 pointer-events-none" />
          </>
        )}

        {/* Silhueta — só quando NÃO há foto */}
        {!p.photo && (
          <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
            <svg
              viewBox="0 0 100 140"
              className={`h-[70%] w-auto transition-colors duration-500 ${
                p.placeholder
                  ? "text-bone/5 group-hover:text-bone/10"
                  : "text-bone/10 group-hover:text-bone/20"
              }`}
              fill="currentColor"
            >
              <circle cx="50" cy="28" r="16" />
              <path d="M20 140 C 20 100, 35 78, 50 78 C 65 78, 80 100, 80 140 Z" />
            </svg>
          </div>
        )}

        {/* Número gigante — em cima de tudo (foto ou silhueta) */}
        {p.placeholder ? (
          <div className="absolute top-4 left-4 font-display text-6xl leading-none text-bone/25 pointer-events-none select-none z-10">
            —
          </div>
        ) : p.number !== undefined ? (
          <div className="absolute top-2 left-4 font-display text-[120px] md:text-[140px] leading-[0.8] text-bull drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:text-bone transition-colors duration-500 pointer-events-none select-none z-10 mix-blend-screen">
            {p.number}
          </div>
        ) : null}

        {/* Stripes decorativas laterais */}
        <div className="absolute inset-y-0 right-0 flex z-10 pointer-events-none">
          <div className="w-px bg-gold/20" />
          <div className="w-4" />
          <div className="w-px bg-gold/10" />
        </div>

        {/* Badge pé preferido */}
        {!p.placeholder && p.foot && (
          <div className="absolute top-3 right-4 z-10 font-mono text-[10px] tracking-editorial text-gold/80 flex items-center gap-1">
            <span className="h-px w-3 bg-gold/50" />
            PÉ {p.foot}
          </div>
        )}

        {/* Selo "AGUARDANDO" nos placeholders */}
        {p.placeholder && (
          <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] tracking-editorial text-gold/50 border border-gold/30 px-2 py-1">
            AGUARDANDO
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gold/15">
        <div className="flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            <h3
              className={`font-display text-2xl md:text-[26px] leading-none transition-colors ${
                p.placeholder
                  ? "text-bone/40"
                  : "text-gold group-hover:text-bone"
              }`}
            >
              {p.placeholder
                ? "EM BREVE"
                : p.nickname ?? p.name.split(" ")[0].toUpperCase()}
            </h3>
            {!p.placeholder && (
              <p className="mt-1 font-mono text-[10px] tracking-editorial text-bone/50 truncate">
                {p.name.toUpperCase()}
              </p>
            )}
          </div>
          <div className="font-mono text-[10px] tracking-editorial text-bone/40 shrink-0">
            {p.placeholder ? "A DEFINIR" : p.since ? `DESDE ${p.since}` : ""}
          </div>
        </div>
      </div>

      {/* Linha hover */}
      <span className="absolute top-0 left-0 h-px w-0 bg-bull group-hover:w-full transition-all duration-500" />
    </motion.article>
  );
}

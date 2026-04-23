"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { BullLogo } from "./BullLogo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#historia", label: "HISTÓRIA" },
  { href: "#elenco", label: "ELENCO" },
  { href: "#categorias", label: "CATEGORIAS" },
  { href: "#galeria", label: "GALERIA" },
  { href: "#novidades", label: "NOVIDADES" },
];

/**
 * Header fixo com ticker superior. Ao rolar, ganha fundo sólido e borda inferior dourada.
 * No mobile, vira drawer lateral.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    // Previne scroll do body quando o menu mobile está aberto
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-gold/20"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 flex items-center justify-between h-[72px]">
        {/* Logo + wordmark */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="relative">
            <BullLogo size={40} animate={false} />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-2xl text-bone tracking-wide">
              APOBULL
            </span>
            <span className="font-mono text-[9px] tracking-editorial text-gold/80 mt-0.5">
              FC — EST. 2026
            </span>
          </div>
        </a>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-mono text-[11px] tracking-editorial text-bone/75 hover:text-bone transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-bull transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Instagram CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/apobull_fc"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-bull hover:bg-bull-deep text-bone font-mono text-[11px] tracking-editorial px-4 py-2.5 transition-colors"
          >
            <InstagramGlyph />
            <span>INSTAGRAM</span>
          </a>

          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center border border-gold/30"
          >
            <span
              className={cn(
                "absolute h-px w-5 bg-bone transition-all",
                open ? "rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-5 bg-bone transition-all",
                open ? "-rotate-45" : "translate-y-1.5"
              )}
            />
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed top-[72px] right-0 bottom-0 w-[min(360px,85vw)] bg-ink-soft border-l border-gold/25 z-40 p-8 flex flex-col"
          >
            <nav className="flex flex-col gap-2 mt-4">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="group flex items-baseline justify-between border-b border-gold/15 py-4"
                >
                  <span className="font-display text-3xl text-bone group-hover:text-bull transition-colors">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-gold/60">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <a
              href="https://instagram.com/apobull_fc"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-bull text-bone font-mono text-xs tracking-editorial px-4 py-4"
            >
              <InstagramGlyph />
              INSTAGRAM
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}

function InstagramGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

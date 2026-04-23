"use client";

import { motion } from "framer-motion";

// Mensagem pré-preenchida ao clicar em "COMPRAR CAMISA".
// URL-encoded para caber no link do WhatsApp.
const WHATSAPP_NUMBER = "5549984141102";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Vim pelo site do APOBULL FC e quero comprar a camisa oficial 2026."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/**
 * Banner promocional da camisa oficial. Foto chapada em fullscreen editorial,
 * headline monumental + CTA para WhatsApp (ação direta de compra).
 */
export function JerseyBanner() {
  return (
    <section
      id="camisa"
      className="relative w-full bg-ink overflow-hidden"
      aria-label="Camisa oficial 2026"
    >
      {/* Fundo — foto da camisa com versão dedicada para mobile / desktop.
          <picture> troca a origem conforme o breakpoint (<768px = mobile). */}
      <div className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/camisa-2026-mobile.jpg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/camisa-2026-desktop.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-top md:object-[center_top]"
          />
        </picture>
        {/* Vinheta escura para legibilidade do texto.
            Desktop: gradiente horizontal (texto à esquerda).
            Mobile: gradiente vertical (texto embaixo). */}
        <div
          aria-hidden
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.62) 45%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.92) 100%)",
          }}
        />
        {/* Hairline vermelha no topo, assinatura do clube */}
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-bull to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8 min-h-[640px] md:min-h-[640px] flex items-end md:items-center py-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-editorial text-gold mb-6">
            <span className="h-px w-10 bg-gold" />
            <span>CAMISA OFICIAL · TEMPORADA 2026</span>
          </div>

          {/* Headline monumental */}
          <h2 className="font-display leading-[0.88] tracking-brutal text-[14vw] md:text-[5.5vw]">
            <span className="block text-bone">VISTA</span>
            <span className="block">
              <span className="text-bone">O </span>
              <span className="text-bull">TOURO.</span>
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm md:text-base text-bone/75 leading-relaxed">
            Camisa 2026 do Apobull FC disponível em edição limitada. Encomende
            agora pelo WhatsApp e garanta a sua antes do esgotamento.
          </p>

          {/* CTA principal — WhatsApp */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex"
            >
              <span className="absolute inset-0 bg-gold translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
              <span className="relative inline-flex items-center gap-3 bg-bull hover:bg-bull-deep text-bone border border-bull px-8 py-4 font-mono text-xs tracking-editorial transition-colors">
                <WhatsGlyph />
                <span>COMPRAR CAMISA</span>
                <svg
                  width="28"
                  height="10"
                  viewBox="0 0 28 10"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M0 5 L26 5 M22 1 L26 5 L22 9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </span>
            </a>

            <span className="font-mono text-[10px] tracking-editorial text-bone/50">
              ATENDIMENTO DIRETO · (49) 98414-1102
            </span>
          </div>
        </motion.div>
      </div>

      {/* Hairline dourada no rodapé */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
    </section>
  );
}

function WhatsGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.52 3.48A11.8 11.8 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.22-1.63a11.94 11.94 0 0 0 5.83 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.19-1.24-6.2-3.5-8.42Zm-8.46 18.4h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.7.97.99-3.6-.24-.37a9.93 9.93 0 1 1 18.38-5.32c0 5.49-4.47 9.92-9.99 9.92Zm5.48-7.43c-.3-.15-1.78-.88-2.05-.98-.28-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.14 9.14 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.08-.8.38-.27.3-1.04 1.01-1.04 2.46s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.09 4.48 1.78.77 2.48.84 3.37.7.54-.08 1.78-.72 2.04-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

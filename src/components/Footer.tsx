"use client";

import { motion } from "framer-motion";
import { BullLogo } from "./BullLogo";

/**
 * Footer com wordmark APOBULL monumental ocupando largura total,
 * links sociais, créditos e coordenadas.
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-ink border-t border-gold overflow-hidden">
      {/* Top grid */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo + tagline */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <BullLogo size={72} animate={false} />
            <div>
              <div className="font-display text-3xl text-bone leading-none">
                APOBULL FC
              </div>
              <div className="mt-2 font-mono text-[11px] tracking-editorial text-gold/80">
                O TOURO VESTE ASAS.
              </div>
            </div>
            <p className="text-sm text-bone/60 leading-relaxed max-w-sm">
              Clube de futsal nascido da fusão entre Red Bull Cedro e Apokapse.
              São José do Cedro, Santa Catarina.
            </p>
          </div>

          {/* Navegação */}
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-editorial text-gold mb-4">
              NAVEGUE
            </div>
            <ul className="flex flex-col gap-3">
              {[
                ["#historia", "HISTÓRIA"],
                ["#elenco", "ELENCO"],
                ["#categorias", "CATEGORIAS"],
                ["#galeria", "GALERIA"],
                ["#novidades", "NOVIDADES"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-display text-2xl text-bone hover:text-bull transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] tracking-editorial text-gold mb-4">
              CONECTE-SE
            </div>
            <ul className="flex flex-col gap-3 mb-8">
              <li>
                <a
                  href="https://instagram.com/apobull_fc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3"
                >
                  <span className="font-display text-2xl text-bone group-hover:text-bull transition-colors">
                    INSTAGRAM
                  </span>
                  <span className="font-mono text-[10px] tracking-editorial text-bone/50">
                    @apobull_fc
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5549984141102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3"
                >
                  <span className="font-display text-2xl text-bone group-hover:text-bull transition-colors">
                    WHATSAPP
                  </span>
                  <span className="font-mono text-[10px] tracking-editorial text-bone/50">
                    (49) 98414-1102
                  </span>
                </a>
              </li>
            </ul>

            <div className="border-t border-gold/15 pt-5 font-mono text-[10px] tracking-editorial text-bone/50 space-y-0.5">
              <div className="text-bone/70">R. JORGE LACERDA, 1100</div>
              <div>ED. DR. NEME</div>
              <div>CENTRO — SÃO JOSÉ DO CEDRO / SC</div>
              <div className="text-gold/70 mt-1.5">26°27′03″S · 53°29′36″W</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wordmark monumental */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display leading-[0.8] tracking-brutal text-bone text-[30vw] md:text-[22vw] text-center -mb-[2vw]"
        >
          APOBULL
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/20 bg-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-editorial text-bone/40">
          <div>© 2026 APOBULL FC — TODOS OS DIREITOS RESERVADOS.</div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>SEDE</span>
            <span className="text-gold">◆</span>
            <span>R. JORGE LACERDA, 1100</span>
            <span className="text-gold">◆</span>
            <span>ED. DR. NEME</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BullLogoProps {
  size?: number;
  animate?: boolean;
  className?: string;
  /**
   * Força usar apenas o SVG fallback, ignorando /logo.png.
   * Útil em lugares onde queremos controle total sobre as asas (hero).
   */
  fallbackOnly?: boolean;
  /**
   * Ativa comportamento cinemático no scroll: o touro faz uma rotação 360°
   * suave, aproxima-se (scale) e as asas batem continuamente.
   * Aplicar apenas na instância do Hero — nos demais pontos (header/footer)
   * deixa-se desligado para não competir com o resto da UI.
   */
  scrollReact?: boolean;
}

/**
 * Escudo do APOBULL. Três camadas sobrepostas de transform:
 *   1) entrada (scale/opacity/blur)
 *   2) scroll-driven (rotateY 360°, scale, translateY, rotateZ leve)
 *   3) wing-flap contínuo (scaleY + rotateX em loop sutil)
 *
 * Framer Motion compõe transforms de elementos aninhados, então as três
 * camadas multiplicam-se em CSS sem conflito.
 */
export function BullLogo({
  size = 220,
  animate = true,
  className,
  fallbackOnly = false,
  scrollReact = false,
}: BullLogoProps) {
  const [pngFailed, setPngFailed] = useState(false);
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const showFallback = fallbackOnly || pngFailed;
  const scrollFx = scrollReact && !reduce;

  // Progresso do scroll enquanto o logo atravessa a viewport.
  // 0 = topo do logo toca a base da viewport · 1 = base do logo toca o topo.
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Uma volta completa, suave e distribuída em todo o scroll do hero.
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  // Aproximação cinematográfica — cresce até tomar quase toda a tela
  // (pico ~3.5× no final do scroll) e em seguida sai de quadro.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [1, 2.2, 3.5, 3.2]
  );
  // Parallax vertical: empurra o touro para cima enquanto cresce, como
  // se viesse em direção à câmera a partir do fundo.
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -30, -90]);
  // Tilt lateral acompanha a rotação para dar peso 3D.
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, -5, 5]);

  const entry = {
    hidden: { scale: 0.6, opacity: 0, filter: "blur(12px)" },
    visible: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Bater de asas — keyframes assimétricos e bem mais pronunciados
  // para ficar visíveis mesmo após o zoom cinematográfico.
  // scaleY < 1 comprime (wing down), > 1 estica (wing up);
  // rotateX dá profundidade, simulando o voo em direção à câmera.
  const wingFlap = scrollFx
    ? {
        scaleY: [1, 0.86, 1.04, 0.82, 1],
        rotateX: [0, 10, -2, -8, 0],
      }
    : undefined;

  const wingFlapTransition = scrollFx
    ? {
        duration: 1.9,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }
    : undefined;

  // Asas do SVG (apenas fallback) — batidas individuais por asa.
  const wingLeft = reduce
    ? {}
    : {
        animate: {
          rotateY: [0, -18, 0, -10, 0],
          transition: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.4,
          },
        },
      };
  const wingRight = reduce
    ? {}
    : {
        animate: {
          rotateY: [0, 18, 0, 10, 0],
          transition: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.4,
          },
        },
      };

  return (
    // Camada 1 · entrada
    <motion.div
      className={cn("relative inline-block", className)}
      style={{
        width: size,
        height: size,
        perspective: scrollFx ? 1400 : undefined,
      }}
      variants={animate ? entry : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Camada 2 · scroll-driven 3D transforms */}
      <motion.div
        ref={scrollRef}
        className="relative w-full h-full"
        style={
          scrollFx
            ? {
                rotateY,
                scale,
                y,
                rotateZ,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
            : undefined
        }
      >
        {/* Camada 3 · wing-flap contínuo */}
        <motion.div
          className="relative w-full h-full"
          animate={wingFlap}
          transition={wingFlapTransition}
          style={
            scrollFx
              ? {
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }
              : undefined
          }
        >
          {/* Glow aurora vermelho atrás do escudo */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(204,0,0,0.6) 0%, rgba(204,0,0,0) 60%)",
            }}
          />

          {!showFallback && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/logo.png"
              alt="APOBULL FC"
              width={size}
              height={size}
              className="block w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(204,0,0,0.35)] select-none"
              draggable={false}
              onError={() => setPngFailed(true)}
            />
          )}

          {showFallback && (
            <svg
              viewBox="0 0 240 240"
              width={size}
              height={size}
              className="block w-full h-full drop-shadow-[0_10px_40px_rgba(204,0,0,0.35)]"
              aria-label="APOBULL FC"
            >
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8CE85" />
                  <stop offset="100%" stopColor="#C9A84C" />
                </linearGradient>
                <linearGradient id="bullGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E30000" />
                  <stop offset="100%" stopColor="#8A0000" />
                </linearGradient>
              </defs>

              {/* Estrela */}
              <motion.g
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <path
                  d="M120 18 L127 36 L146 36 L131 48 L137 66 L120 55 L103 66 L109 48 L94 36 L113 36 Z"
                  fill="url(#goldGrad)"
                  stroke="#C9A84C"
                  strokeWidth="0.8"
                />
              </motion.g>

              {/* Asa esquerda */}
              <motion.g
                style={{
                  transformOrigin: "100px 120px",
                  transformBox: "fill-box",
                }}
                {...wingLeft}
              >
                <path
                  d="M104 92 C 70 88, 38 108, 20 130 C 40 124, 56 122, 70 126 C 50 134, 34 150, 26 170 C 50 156, 74 148, 96 148 L 104 120 Z"
                  fill="url(#bullGrad)"
                  stroke="#8A0000"
                  strokeWidth="1"
                />
              </motion.g>

              {/* Asa direita */}
              <motion.g
                style={{
                  transformOrigin: "140px 120px",
                  transformBox: "fill-box",
                }}
                {...wingRight}
              >
                <path
                  d="M136 92 C 170 88, 202 108, 220 130 C 200 124, 184 122, 170 126 C 190 134, 206 150, 214 170 C 190 156, 166 148, 144 148 L 136 120 Z"
                  fill="url(#bullGrad)"
                  stroke="#8A0000"
                  strokeWidth="1"
                />
              </motion.g>

              {/* Cabeça */}
              <g>
                <path
                  d="M88 92 C 76 80, 72 72, 76 66 C 84 72, 94 82, 100 92 Z"
                  fill="url(#bullGrad)"
                  stroke="#8A0000"
                  strokeWidth="1"
                />
                <path
                  d="M152 92 C 164 80, 168 72, 164 66 C 156 72, 146 82, 140 92 Z"
                  fill="url(#bullGrad)"
                  stroke="#8A0000"
                  strokeWidth="1"
                />
                <path
                  d="M120 94 C 104 94, 90 104, 88 122 C 86 140, 96 158, 108 170 C 114 176, 118 180, 120 182 C 122 180, 126 176, 132 170 C 144 158, 154 140, 152 122 C 150 104, 136 94, 120 94 Z"
                  fill="url(#bullGrad)"
                  stroke="#8A0000"
                  strokeWidth="1.2"
                />
                <path
                  d="M104 128 L 114 128 L 112 134 L 106 134 Z"
                  fill="#F5F1E8"
                />
                <path
                  d="M126 128 L 136 128 L 134 134 L 128 134 Z"
                  fill="#F5F1E8"
                />
                <ellipse
                  cx="120"
                  cy="158"
                  rx="10"
                  ry="6"
                  fill="#0A0A0A"
                  opacity="0.55"
                />
                <circle cx="116" cy="158" r="1.4" fill="#F5F1E8" />
                <circle cx="124" cy="158" r="1.4" fill="#F5F1E8" />
                <circle
                  cx="120"
                  cy="166"
                  r="3.5"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                />
              </g>

              <g>
                <path id="arcPath" d="M 40 210 Q 120 240 200 210" fill="none" />
                <text
                  fill="url(#goldGrad)"
                  fontFamily="var(--font-display), Impact, sans-serif"
                  fontSize="20"
                  letterSpacing="6"
                  textAnchor="middle"
                >
                  <textPath href="#arcPath" startOffset="50%">
                    APOBULL
                  </textPath>
                </text>
              </g>
            </svg>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

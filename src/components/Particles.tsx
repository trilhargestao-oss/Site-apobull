"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

/**
 * Campo de partículas em canvas: pequenas brasas vermelhas e douradas
 * que sobem levemente com wobble. Leve (~40 partículas) e respeita prefers-reduced-motion.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(DPR, DPR);
    };

    const makeParticle = (): Particle => {
      const isGold = Math.random() < 0.35;
      const maxLife = 260 + Math.random() * 340;
      return {
        x: Math.random() * width,
        y: height + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.2 + Math.random() * 0.6),
        size: 0.6 + Math.random() * 2.2,
        color: isGold ? "201,168,76" : "204,0,0",
        life: 0,
        maxLife,
      };
    };

    resize();
    const particles: Particle[] = Array.from({ length: 50 }, makeParticle);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const tick = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.life += 1;
        // Wobble horizontal suave
        p.x += p.vx + Math.sin((t * 0.001 + p.y * 0.01) * 1.2) * 0.25;
        p.y += p.vy;

        const fade =
          p.life < 40
            ? p.life / 40
            : p.life > p.maxLife - 60
            ? Math.max(0, (p.maxLife - p.life) / 60)
            : 1;

        const alpha = 0.65 * fade;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color},${alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life > p.maxLife || p.y < -10) {
          Object.assign(p, makeParticle());
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

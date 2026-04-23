"use client";

import { cn } from "@/lib/utils";

interface TickerProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "normal";
}

/**
 * Marquee infinito horizontal. Duplica o array para permitir loop sem costura.
 * Pausa ao hover (regra global .marquee-track:hover).
 */
export function Ticker({ items, className, reverse, speed = "normal" }: TickerProps) {
  const animClass =
    speed === "slow"
      ? reverse
        ? "animate-marquee-reverse"
        : "animate-marquee-slow"
      : reverse
      ? "animate-marquee-reverse"
      : "animate-marquee";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className={cn("marquee-track flex min-w-max", animClass)}>
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6 text-xs tracking-editorial font-mono uppercase"
          >
            <span className="text-bone/80">{item}</span>
            <span className="text-bull">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

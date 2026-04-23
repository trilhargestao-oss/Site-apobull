"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: string; // "§ 02"
  title: string; // "HISTÓRIA"
  index?: string; // "II / VII"
  className?: string;
  align?: "left" | "right";
}

/**
 * Label editorial que aparece no topo de cada seção.
 * Inspirado em legenda de revista — número, nome curto, contador de página.
 */
export function SectionLabel({
  number,
  title,
  index,
  className,
  align = "left",
}: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "flex items-center gap-4 font-mono text-[10px] md:text-[11px] uppercase tracking-editorial text-bone/70",
        align === "right" && "justify-end",
        className
      )}
    >
      <span className="text-gold">{number}</span>
      <span className="h-px w-8 bg-gold/40" />
      <span className="text-bone">{title}</span>
      {index && (
        <>
          <span className="h-px w-8 bg-gold/40" />
          <span className="text-bone/50">{index}</span>
        </>
      )}
    </motion.div>
  );
}

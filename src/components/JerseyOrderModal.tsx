"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SIZES = ["PP", "P", "M", "G", "GG", "XGG"] as const;
type Size = (typeof SIZES)[number];

interface JerseyItem {
  size: Size | null;
  name: string;
  number: string;
  skip: boolean;
}

const WHATSAPP_NUMBER = "5549984141102";
const UNIT_PRICE = 70;

const emptyItem = (): JerseyItem => ({
  size: null,
  name: "",
  number: "",
  skip: false,
});

interface JerseyOrderModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal de pedido de camisa. Cada camisa do pedido tem o seu próprio tamanho
 * + nome/número (ou "sem personalização" individual). Ao enviar, gera uma
 * mensagem formatada e abre o WhatsApp com ela pronta.
 */
export function JerseyOrderModal({ open, onClose }: JerseyOrderModalProps) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState<JerseyItem[]>([emptyItem()]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{
    name?: boolean;
    sizes?: boolean[];
  }>({});

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setErrors({});
  }, [open]);

  // Sincroniza o array de itens com a quantidade. Aumentou? Preenche com
  // slots vazios. Diminuiu? Corta o excesso preservando os que já existiam.
  useEffect(() => {
    setItems((prev) => {
      if (qty === prev.length) return prev;
      if (qty > prev.length) {
        return [
          ...prev,
          ...Array.from({ length: qty - prev.length }, emptyItem),
        ];
      }
      return prev.slice(0, qty);
    });
  }, [qty]);

  const incQty = () => setQty((q) => Math.min(q + 1, 50));
  const decQty = () => setQty((q) => Math.max(q - 1, 1));

  const patchItem = (i: number, patch: Partial<JerseyItem>) => {
    setItems((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c))
    );
  };

  const handleSubmit = () => {
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = true;
    const sizeErrors = items.map((it) => it.size == null);
    if (sizeErrors.some(Boolean)) nextErrors.sizes = sizeErrors;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const total = UNIT_PRICE * qty;

    const describeItem = (it: JerseyItem) => {
      const persona = it.skip
        ? "Sem personalização"
        : `Nome: ${it.name.toUpperCase().trim() || "—"} / Nº ${
            it.number || "—"
          }`;
      return `Tam ${it.size} | ${persona}`;
    };

    // Com 1 camisa → linhas separadas de Tam + Personalização (formato clássico).
    // Com >1 → bloco unificado listando cada camisa.
    const itemsBlock =
      items.length === 1
        ? `👕 *Tam:* ${items[0].size}
📦 *Qtd:* 1
✏️ *Personalização:* ${
            items[0].skip
              ? "Sem personalização"
              : `Nome: ${
                  items[0].name.toUpperCase().trim() || "—"
                } / Número: ${items[0].number || "—"}`
          }`
        : `📦 *Qtd:* ${qty}
👕 *Itens:*
${items.map((it, i) => `   • Camisa ${i + 1}: ${describeItem(it)}`).join("\n")}`;

    const obsText = notes.trim() || "Nenhuma";

    const msg = `🐂 *MEU PEDIDO - APOBULL FC*

👤 *Nome:* ${name.trim()}
${itemsBlock}
💬 *Obs:* ${obsText}

💰 *Total estimado:* R$ ${total},00

Aguardo confirmação para efetuar o pagamento! 🤝`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/90 md:bg-ink/85 md:backdrop-blur-sm p-0 md:p-6"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="jersey-order-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:max-w-lg bg-ink-soft border border-gold/40 max-h-[90vh] overflow-y-auto md:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              aria-hidden
              className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-bull to-transparent"
            />

            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 pt-6 md:pt-8 pb-3 md:pb-4 border-b border-gold/15">
              <div>
                <div className="font-mono text-[10px] tracking-editorial text-gold mb-1">
                  § PEDIDO DE CAMISA
                </div>
                <h3
                  id="jersey-order-title"
                  className="font-display text-2xl md:text-4xl leading-none tracking-brutal text-bone"
                >
                  VISTA O <span className="text-bull">TOURO</span>.
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="shrink-0 w-10 h-10 flex items-center justify-center border border-gold/30 text-bone hover:bg-bull hover:border-bull hover:text-bone transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1 L13 13 M13 1 L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 md:px-8 py-5 md:py-6 space-y-5 md:space-y-7">
              {/* NOME */}
              <Field
                label="NOME COMPLETO"
                required
                error={errors.name ? "Informe seu nome" : undefined}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome aqui"
                  className={inputClass(!!errors.name)}
                />
              </Field>

              {/* QUANTIDADE — dita quantos blocos de camisa aparecem abaixo */}
              <Field label="QUANTIDADE DE CAMISAS">
                <div className="flex items-stretch w-36 border border-gold/25">
                  <button
                    type="button"
                    onClick={decQty}
                    aria-label="Diminuir"
                    disabled={qty <= 1}
                    className="w-12 h-12 flex items-center justify-center text-gold hover:bg-bull hover:text-bone transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
                  >
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <path d="M0 1 L14 1" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                  <div className="flex-1 flex items-center justify-center font-display text-2xl text-bone border-x border-gold/20">
                    {qty}
                  </div>
                  <button
                    type="button"
                    onClick={incQty}
                    aria-label="Aumentar"
                    className="w-12 h-12 flex items-center justify-center text-gold hover:bg-bull hover:text-bone transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 0 L7 14 M0 7 L14 7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </button>
                </div>
              </Field>

              {/* UM BLOCO POR CAMISA — tamanho + personalização individual */}
              <div className="space-y-5">
                {items.map((it, i) => (
                  <JerseyItemBlock
                    key={i}
                    item={it}
                    index={i}
                    total={items.length}
                    sizeError={errors.sizes?.[i] ?? false}
                    onChange={(patch) => patchItem(i, patch)}
                  />
                ))}
              </div>

              {/* OBSERVAÇÕES */}
              <Field label="OBSERVAÇÕES (OPCIONAL)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Algum detalhe adicional do pedido?"
                  rows={3}
                  className={`${inputClass(false)} resize-none`}
                />
              </Field>

              {/* Total estimado */}
              <div className="flex items-center justify-between border-t border-gold/15 pt-4">
                <span className="font-mono text-[10px] tracking-editorial text-bone/50">
                  TOTAL ESTIMADO
                </span>
                <span className="font-display text-3xl text-gold leading-none">
                  R$ {UNIT_PRICE * qty},00
                </span>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="px-5 md:px-8 pb-6 md:pb-8 pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="group relative inline-flex w-full"
              >
                <span className="absolute inset-0 bg-gold translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                <span className="relative inline-flex w-full items-center justify-center gap-3 bg-bull hover:bg-bull-deep text-bone border border-bull px-8 py-4 font-mono text-xs tracking-editorial transition-colors">
                  <WhatsGlyph />
                  <span>ENVIAR PEDIDO</span>
                  <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                    <path
                      d="M0 5 L26 5 M22 1 L26 5 L22 9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                </span>
              </button>
              <p className="mt-3 text-center font-mono text-[10px] tracking-editorial text-bone/40">
                AO ENVIAR, O WHATSAPP ABRE COM A MENSAGEM PRONTA.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------- subcomponentes --------------------------- */

function JerseyItemBlock({
  item,
  index,
  total,
  sizeError,
  onChange,
}: {
  item: JerseyItem;
  index: number;
  total: number;
  sizeError: boolean;
  onChange: (patch: Partial<JerseyItem>) => void;
}) {
  const headingLabel =
    total === 1 ? "DETALHES DA CAMISA" : `CAMISA ${index + 1}`;

  return (
    <div className="border border-gold/25 bg-ink/40 p-3.5 md:p-5">
      <div className="flex items-center gap-3 mb-3 md:mb-4">
        <span className="font-display text-lg text-gold leading-none">
          {total === 1 ? "§" : `0${index + 1}`}
        </span>
        <span className="font-mono text-[11px] tracking-editorial text-gold">
          {headingLabel}
        </span>
        {item.skip && (
          <span className="ml-auto font-mono text-[10px] tracking-editorial text-bone/50">
            SEM NOME/NÚMERO
          </span>
        )}
      </div>

      {/* TAMANHO — cada camisa tem o seu */}
      <Field
        label="TAMANHO"
        required
        error={sizeError ? "Selecione um tamanho" : undefined}
      >
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {SIZES.map((s) => {
            const isActive = item.size === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ size: s })}
                className={`relative h-11 md:h-12 font-display text-lg md:text-xl tracking-wide transition-all ${
                  isActive
                    ? "bg-bull text-bone border border-gold"
                    : "bg-ink border border-gold/20 text-bone/70 hover:border-gold/50 hover:text-bone"
                }`}
                aria-pressed={isActive}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Field>

      {/* PERSONALIZAÇÃO */}
      <div
        className={`mt-5 grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-3 ${
          item.skip ? "pointer-events-none select-none opacity-50" : ""
        }`}
      >
        <Field label="NOME NA CAMISA (MÁX 12)">
          <input
            type="text"
            value={item.name}
            onChange={(e) =>
              onChange({ name: e.target.value.slice(0, 12).toUpperCase() })
            }
            maxLength={12}
            placeholder="EX: GHENO"
            disabled={item.skip}
            className={`${inputClass(false)} disabled:opacity-40`}
          />
        </Field>
        <Field label="NÚMERO">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={99}
            value={item.number}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "");
              const n = v === "" ? "" : String(Math.min(99, parseInt(v, 10)));
              onChange({ number: n });
            }}
            placeholder="10"
            disabled={item.skip}
            className={`${inputClass(false)} disabled:opacity-40`}
          />
        </Field>
      </div>

      <button
        type="button"
        onClick={() => onChange({ skip: !item.skip })}
        className="mt-4 w-full border border-gold/20 hover:border-gold/60 hover:bg-gold/5 transition-colors py-2.5 font-mono text-[10px] tracking-editorial text-bone/70 hover:text-bone"
      >
        {item.skip
          ? "QUERO PERSONALIZAR ESTA CAMISA"
          : "NÃO QUERO NOME NEM NÚMERO"}
      </button>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-editorial text-gold mb-2.5 flex items-center gap-2">
        {label}
        {required && <span className="text-bull">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block font-mono text-[10px] tracking-editorial text-bull">
          {error}
        </span>
      )}
    </label>
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

function inputClass(hasError: boolean) {
  return `w-full bg-ink border text-bone font-mono text-sm tracking-wide px-4 py-3 placeholder:text-bone/30 focus:outline-none focus:border-gold transition-colors ${
    hasError ? "border-bull/70" : "border-gold/25"
  }`;
}

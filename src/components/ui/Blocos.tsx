"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { Pergunta } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Tag } from "./Button";
import { Plus } from "./icons";

/** Abertura das paginas internas: painel roxo com arcos, titulo grande e texto. */
export function PageHero({
  eyebrow,
  titulo,
  destaque,
  texto,
  children,
}: {
  eyebrow?: string;
  titulo: string;
  destaque?: string;
  texto?: string;
  children?: ReactNode;
}) {
  return (
    <section className="pt-2">
      <div data-dark className="panel bg-roxo pt-[150px] pb-16 text-white md:pt-[190px] md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[40%] left-1/2 aspect-square w-[130%] -translate-x-1/2 rounded-full border border-white/10" />
          <div className="absolute -top-[15%] left-1/2 aspect-square w-[90%] -translate-x-1/2 rounded-full border border-white/10" />
          <div className="absolute -top-[420px] -right-[420px] size-[1000px] bg-[radial-gradient(closest-side,rgb(124_107_208/0.5),transparent)]" />
          <div className="absolute -bottom-64 -left-64 size-[700px] bg-[radial-gradient(closest-side,rgb(0_172_200/0.22),transparent)]" />
        </div>
        <div className="container-page relative flex flex-col items-center text-center">
          {eyebrow && (
            <motion.p
              className="flex items-center gap-4 font-display text-[0.75rem] font-light tracking-[0.28em] text-white/90 uppercase md:text-[0.875rem]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: ease.out, delay: 0.1 }}
            >
              <span aria-hidden className="h-px w-8 bg-white/40 max-sm:hidden" />
              {eyebrow}
              <span aria-hidden className="h-px w-8 bg-white/40 max-sm:hidden" />
            </motion.p>
          )}
          <Words
            as="h1"
            eager
            delay={0.2}
            className="display mt-5 max-w-[980px] text-[clamp(2rem,5vw,4.25rem)]"
            parts={
              destaque
                ? [titulo, "\n\n", { text: destaque, className: "mt-[0.5em] text-[0.58em] font-light text-ciano-200" }]
                : [titulo]
            }
          />
          {texto && (
            <motion.p
              className="mt-6 max-w-[680px] text-[1.0625rem] leading-relaxed text-white/90 md:text-[1.125rem]"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: ease.out, delay: 0.6 }}
            >
              {texto}
            </motion.p>
          )}
          {children && (
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: ease.out, delay: 0.8 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Cabecalho de secao: etiqueta opcional, titulo animado e texto. */
export function Titulo({
  tag,
  titulo,
  texto,
  as = "h2",
  centro = false,
  escuro = false,
  className = "",
}: {
  tag?: string;
  titulo: string;
  texto?: ReactNode;
  as?: "h2" | "h3";
  centro?: boolean;
  escuro?: boolean;
  className?: string;
}) {
  return (
    <div className={`${centro ? "mx-auto flex max-w-[820px] flex-col items-center text-center" : "max-w-[820px]"} ${className}`}>
      {tag && (
        <FadeUp>
          <Tag tone={escuro ? "dark" : "light"} className="mb-6">
            {tag}
          </Tag>
        </FadeUp>
      )}
      <Words
        as={as}
        className={`display ${as === "h2" ? "text-display" : "text-title"} ${escuro ? "text-white" : "text-ink"}`}
        parts={[titulo]}
      />
      {texto && (
        <FadeUp delay={0.1}>
          <p className={`mt-4 ${escuro ? "text-white/85" : "text-mute"}`}>{texto}</p>
        </FadeUp>
      )}
    </div>
  );
}

/**
 * Tabela que vira cartoes no celular: o cabecalho some e cada dado leva o proprio rotulo.
 * A primeira coluna e o titulo do cartao.
 */
export function Tabela({ colunas, linhas }: { colunas: string[]; linhas: ReactNode[][] }) {
  return (
    <FadeUp>
      <div className="no-scrollbar rounded-panel border border-line bg-white max-md:overflow-hidden md:overflow-x-auto">
        <table className="w-full border-collapse text-left text-[0.9375rem] max-md:block md:min-w-[760px]">
          <thead className="max-md:hidden">
            <tr className="bg-roxo text-white">
              {colunas.map((c) => (
                <th key={c} scope="col" className="px-5 py-4 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-md:block">
            {linhas.map((linha, i) => (
              <tr
                key={i}
                className="border-t border-line transition-colors duration-300 first:border-0 hover:bg-paper max-md:block max-md:px-5 max-md:py-5"
              >
                {linha.map((cel, n) =>
                  n === 0 ? (
                    <th
                      key={n}
                      scope="row"
                      className="px-5 py-4 text-left font-semibold text-ink max-md:block max-md:px-0 max-md:pt-0 max-md:pb-2 max-md:text-[1.0625rem]"
                    >
                      {cel}
                    </th>
                  ) : (
                    <td
                      key={n}
                      data-label={colunas[n]}
                      className="px-5 py-4 text-mute max-md:flex max-md:justify-between max-md:gap-6 max-md:border-t max-md:border-line/70 max-md:px-0 max-md:py-2 max-md:text-right max-md:text-[0.875rem] max-md:before:shrink-0 max-md:before:text-left max-md:before:text-mute/80 max-md:before:content-[attr(data-label)]"
                    >
                      <span className="max-md:text-ink">{cel}</span>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FadeUp>
  );
}

/** Perguntas em sanfona numerada. As respostas ficam sempre no HTML; so a altura anima. */
export function Sanfona({ itens, inicio = 0, aberta = 0 }: { itens: Pergunta[]; inicio?: number; aberta?: number | null }) {
  const [open, setOpen] = useState<number | null>(aberta);
  return (
    <motion.div
      className="flex flex-col gap-2.5"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ staggerChildren: 0.05 }}
    >
      {itens.map((item, i) => {
        const on = open === i;
        const n = String(inicio + i + 1).padStart(2, "0");
        return (
          <motion.div
            key={item.q}
            className={`rounded-card bg-white transition-shadow duration-500 ${on ? "shadow-[0_20px_50px_rgb(63_47_128/0.1)]" : ""}`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
            }}
          >
            <h3>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full cursor-pointer items-center gap-4 p-5 text-left md:gap-5 md:px-7 md:py-6"
              >
                <span className="text-[1.0625rem] text-mute/70 tabular-nums">/{n}</span>
                <span className="display flex-1 text-[1.0625rem] leading-snug text-ink md:text-[1.1875rem]">{item.q}</span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full text-white transition-all duration-500 ease-out-expo ${
                    on ? "rotate-[135deg] bg-ciano-700" : "bg-ink"
                  }`}
                >
                  <Plus size={16} strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <motion.div
              className="overflow-hidden"
              inert={!on}
              initial={false}
              animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <p className="px-5 pb-6 text-[0.9375rem] text-mute md:pr-20 md:pl-[4.6rem]">{item.a}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/** Lista com marcadores de "certo". */
export function Lista({ itens, escuro = false, numerada = false }: { itens: readonly string[]; escuro?: boolean; numerada?: boolean }) {
  return (
    <motion.ul
      className="flex flex-col"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ staggerChildren: 0.08 }}
    >
      {itens.map((item, i) => (
        <motion.li
          key={item}
          className={`flex gap-4 border-t py-4 text-[1rem] leading-snug first:border-0 ${
            escuro ? "border-white/12 text-white/90" : "border-line text-ink"
          }`}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
          }}
        >
          <span
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold ${
              escuro ? "bg-ciano-200 text-ink" : "bg-roxo text-white"
            }`}
          >
            {numerada ? i + 1 : "✓"}
          </span>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Passos numerados: um aberto por vez. Avanca sozinho ate a pessoa escolher um. Os textos
 * ficam sempre no HTML (na sanfona do celular); o painel do desktop repete so o ativo.
 */
export function Passos({ itens }: { itens: readonly { titulo: string; texto: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -25% 0px" });
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!inView || !auto || reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % itens.length), 4200);
    return () => clearInterval(t);
  }, [inView, auto, reduced, itens.length]);

  const cols = itens.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <div ref={ref}>
      <ol className={`relative grid gap-2 lg:gap-4 ${cols}`}>
        <div aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-line lg:block">
          <motion.div
            className="h-full origin-left bg-roxo"
            animate={{ scaleX: i / (itens.length - 1) }}
            transition={{ duration: 0.8, ease: ease.out }}
          />
        </div>
        {itens.map((p, n) => {
          const on = n === i;
          const done = n <= i;
          return (
            <li key={p.titulo} className="relative">
              <button
                type="button"
                aria-expanded={on}
                onClick={() => {
                  setAuto(false);
                  setI(n);
                }}
                className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl p-2 text-left max-lg:bg-paper lg:flex-col lg:p-0 lg:text-center"
              >
                <span
                  className={`display relative z-10 grid size-14 shrink-0 place-items-center rounded-full text-[1.25rem] ring-8 ring-white transition-all duration-500 ease-out-expo max-lg:ring-paper ${
                    on
                      ? "scale-110 bg-roxo text-white shadow-[0_12px_30px_rgb(63_47_128/0.4)]"
                      : done
                        ? "bg-roxo text-white"
                        : "bg-lilas text-roxo group-hover:bg-roxo group-hover:text-white"
                  }`}
                >
                  {n + 1}
                  {on && auto && !reduced && (
                    <svg aria-hidden viewBox="0 0 60 60" className="absolute -inset-1.5 -rotate-90">
                      <motion.circle
                        cx="30"
                        cy="30"
                        r="28.5"
                        fill="none"
                        stroke="var(--color-ciano)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4.2, ease: "linear" }}
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`display text-[1.0625rem] leading-snug transition-colors duration-300 lg:mt-3 lg:px-2 ${
                    on ? "text-ink" : "text-mute group-hover:text-ink"
                  }`}
                >
                  {p.titulo}
                </span>
              </button>
              <motion.div
                className="overflow-hidden lg:hidden"
                inert={!on}
                initial={false}
                animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                transition={{ duration: 0.45, ease: ease.out }}
              >
                <p className="pt-3 pr-2 pb-4 pl-[5.5rem] text-[0.9375rem] text-mute">{p.texto}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>

      <div aria-hidden className="relative mt-10 hidden min-h-[190px] overflow-hidden rounded-panel bg-paper p-10 lg:block">
        {/* Sem animacao de saida: a troca nunca deixa o painel vazio. */}
          <motion.div
            key={i}
            className="grid grid-cols-[auto_1fr] items-center gap-10"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: ease.out }}
          >
            <span className="display text-[6.5rem] leading-none text-roxo/15 tabular-nums">0{i + 1}</span>
            <div className="max-w-[720px]">
              <p className="display text-title text-ink">{itens[i].titulo}</p>
              <p className="mt-2 text-[1.0625rem] text-mute">{itens[i].texto}</p>
            </div>
          </motion.div>
      </div>
    </div>
  );
}

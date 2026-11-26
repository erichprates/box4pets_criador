"use client";

import { motion } from "framer-motion";
import { links, planos, precosComplementares } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { Counter } from "../motion/Counter";
import { FadeUp } from "../motion/FadeUp";
import { Tabela, Titulo } from "../ui/Blocos";
import { SplitButton } from "../ui/Button";
import { Check } from "../ui/icons";

/** Tres faixas de preco por quantidade. A do meio, mais pedida, vem em destaque. */
export function Planos() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <motion.div
          className="grid items-stretch gap-5 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.12 }}
        >
          {planos.map((p) => {
            const dark = !!p.selo;
            const valor = Number(p.preco.replace(/\D/g, ""));
            return (
              <motion.article
                key={p.faixa}
                {...(dark ? { "data-dark": true } : {})}
                className={`relative flex flex-col gap-5 overflow-hidden rounded-panel p-8 md:p-9 ${
                  dark
                    ? "bg-roxo text-white shadow-[0_30px_70px_rgb(63_47_128/0.35)] lg:-my-4"
                    : "border border-line bg-white text-ink"
                }`}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  show: { opacity: 1, y: 0, transition: { duration: 1, ease: ease.out } },
                }}
              >
                {dark && (
                  <div aria-hidden className="absolute -top-40 -right-40 size-[420px] bg-[radial-gradient(closest-side,rgb(124_107_208/0.6),transparent)]" />
                )}
                <p className="relative flex flex-wrap items-center gap-2 text-[0.9375rem] font-semibold">
                  {p.faixa}
                  {p.selo && (
                    <span className="rounded-full bg-ciano-200 px-2.5 py-0.5 text-[0.75rem] text-ink">{p.selo}</span>
                  )}
                </p>
                <p className={`display relative text-[4rem] leading-none ${dark ? "text-white" : "text-roxo"}`}>
                  R$ <Counter value={valor} />
                  <span className={`ml-1 text-[1.125rem] font-normal ${dark ? "text-white/70" : "text-mute"}`}>/kit</span>
                </p>
                <p className={`relative text-[0.9375rem] font-medium ${dark ? "text-ciano-200" : "text-ciano-700"}`}>{p.linha}</p>
                {p.texto && <p className={`relative ${dark ? "text-white/85" : "text-mute"}`}>{p.texto}</p>}
                {p.itens && (
                  <ul className="relative flex flex-col text-[0.9375rem]">
                    {p.itens.map((item) => (
                      <li key={item} className="flex gap-3 border-t border-line py-2.5 first:border-0">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lilas text-roxo">
                          <Check size={12} strokeWidth={2.6} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <SplitButton
                  href={p.cta.href}
                  variant={dark ? "light" : "primary"}
                  className="relative mt-auto w-full justify-between"
                >
                  {p.cta.label}
                </SplitButton>
              </motion.article>
            );
          })}
        </motion.div>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-12 max-w-[760px] text-center text-mute">
            Compre os kits de uma vez e use quando quiser. Vai pedir mais de 3 kits? Diga a quantidade no WhatsApp e
            já aplicamos o desconto.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export function PrecosComplementares() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <Titulo titulo="Testes complementares" className="mb-10" />
        <Tabela
          colunas={["Teste", "Preço", "Ação"]}
          linhas={precosComplementares.map((t) => [
            t.teste,
            <strong key="p" className="font-semibold whitespace-nowrap text-ink">
              {t.preco}
            </strong>,
            <a
              key="a"
              href={t.href}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-10 items-center rounded-full bg-roxo px-4 text-[0.875rem] font-medium text-white transition-colors hover:bg-roxo-700"
            >
              {t.acao}
            </a>,
          ])}
        />
      </div>
    </section>
  );
}


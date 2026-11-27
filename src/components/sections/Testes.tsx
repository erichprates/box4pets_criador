"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  coleta,
  comoEscolher,
  comparativo,
  complementares,
  links,
  painelDestaques,
  statusLaudo,
  testes,
} from "@/content/site";
import { asset } from "@/lib/base";
import { ease, viewport } from "@/lib/motion";
import { Counter } from "../motion/Counter";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Lista, Tabela, Titulo } from "../ui/Blocos";
import { Rich, SplitButton } from "../ui/Button";
import { Caixa } from "../ui/Caixa";
import { BlocoProduto, ComparativoLinhas } from "./Loja";

/** Como escolher: quatro perguntas a esquerda, a resposta grande a direita. */
export function ComoEscolher() {
  const [i, setI] = useState(0);
  return (
    <section data-dark className="panel bg-ink py-24 text-white md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-72 -left-72 size-[900px] bg-[radial-gradient(closest-side,rgb(63_47_128/0.75),transparent)]" />
        <div className="absolute -right-72 -bottom-40 size-[760px] bg-[radial-gradient(closest-side,rgb(0_172_200/0.2),transparent)]" />
      </div>
      <div className="container-page relative">
        <Titulo titulo="Como escolher" escuro className="mb-10 md:mb-14" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div role="tablist" aria-label="Sua situação" className="flex flex-col gap-2">
            {comoEscolher.map((item, n) => {
              const on = n === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setI(n)}
                  className={`relative flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors duration-300 ${
                    on ? "text-ink" : "bg-white/[0.07] text-white hover:bg-white/[0.12]"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="escolher-ativa"
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-white"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <span className={`relative text-[0.8125rem] tabular-nums ${on ? "text-roxo" : "text-ciano-200"}`}>/0{n + 1}</span>
                  <span className="display relative flex-1 text-[1.0625rem] leading-snug md:text-[1.1875rem]">{item.q}</span>
                </button>
              );
            })}
          </div>
          {/* As quatro respostas ocupam a mesma celula: altura fixa e tudo no HTML. */}
          <div role="tabpanel" className="grid rounded-panel border border-white/12 bg-white/[0.06] p-7 md:py-6 md:pr-6 md:pl-11">
            {comoEscolher.map((item, n) => {
              const on = n === i;
              return (
                <motion.div
                  key={item.q}
                  aria-hidden={!on}
                  className={`col-start-1 row-start-1 flex items-center gap-6 max-sm:flex-col-reverse max-sm:items-start ${on ? "" : "pointer-events-none invisible"}`}
                  initial={false}
                  animate={on ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  transition={{ duration: on ? 0.5 : 0, ease: ease.out }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ciano-200 uppercase">Nossa indicação</p>
                    <p className="display mt-3 text-[1.25rem] leading-snug md:text-[1.5rem]">{item.a}</p>
                    <Link
                      href={`/testes/${item.produto}`}
                      tabIndex={on ? 0 : -1}
                      className="group/ver mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ciano-200"
                    >
                      <span className="border-b border-ciano-200/40 pb-0.5 transition-colors group-hover/ver:border-ciano-200">Ver produto</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover/ver:translate-x-1">→</span>
                    </Link>
                  </div>
                  {/* A caixa do produto indicado, flutuando ao lado do texto. */}
                  <motion.div
                    className="relative aspect-square w-[42%] shrink-0 max-sm:w-[56%] max-sm:self-center"
                    initial={false}
                    animate={on ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -8 }}
                    transition={{ duration: on ? 0.8 : 0, ease: ease.out }}
                  >
                    <Caixa id={item.produto} nome={testes.find((t) => t.id === item.produto)!.nome} solta className="absolute inset-0 scale-[1.4]" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const tons = {
  livre: { chip: "bg-[#dff5e8] text-[#0f6b3a]", ponto: "bg-[#19a35a]" },
  portador: { chip: "bg-[#fdf0d2] text-[#8a5a00]", ponto: "bg-[#e0a100]" },
  risco: { chip: "bg-[#fde3dc] text-[#9b2c14]", ponto: "bg-[#d9482b]" },
} as const;

/** Como e o laudo: os tres status e um celular com a lista de condicoes. */
export function Laudo() {
  const linhas = [
    ["Atrofia progressiva de retina", "livre"],
    ["Mielopatia degenerativa", "portador"],
    ["Hiperuricosúria", "livre"],
    ["MDR1: sensibilidade a fármacos", "livre"],
    ["Lipofuscinose ceroide neuronal", "risco"],
    ["Albinismo (SLC45A2)", "livre"],
  ] as const;
  return (
    <section className="panel grad-soft py-24 md:py-32">
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <Titulo titulo="Como é o laudo" texto="Cada resultado aparece em linguagem simples, com três status possíveis:" />
          <motion.div
            className="mt-8 flex flex-col gap-3"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ staggerChildren: 0.12 }}
          >
            {statusLaudo.map((s) => (
              <motion.div
                key={s.selo}
                className="flex flex-col gap-3 rounded-card border border-white bg-white/80 p-5 sm:flex-row sm:items-center sm:gap-5 md:p-6"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.out } },
                }}
              >
                <span className={`flex w-fit shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.875rem] font-semibold sm:w-[118px] ${tons[s.tom].chip}`}>
                  <span className={`size-2 rounded-full ${tons[s.tom].ponto}`} />
                  {s.selo}
                </span>
                <p className="text-[0.9375rem] text-mute">
                  <Rich text={s.texto} />
                </p>
              </motion.div>
            ))}
          </motion.div>
          <FadeUp delay={0.1}>
            <SplitButton href={links.pendente} variant="ghost" external={false} className="mt-7">
              Ver exemplo de laudo (PDF)
            </SplitButton>
          </FadeUp>
        </div>

        {/* Celular ilustrativo com o laudo: os nomes das condicoes sao so exemplo de tela. */}
        <FadeUp delay={0.15}>
          <div
            role="img"
            aria-label="Tela do app mostrando o laudo de um cão: lista de condições com os selos Livre, Portador e Em risco"
            className="relative mx-auto w-full max-w-[360px]"
          >
            {/* Brilho aqua atras e um segundo vidro inclinado, para dar profundidade. */}
            <span aria-hidden className="absolute -inset-10 bg-[radial-gradient(closest-side,rgb(96_199_207/0.45),transparent)]" />
            <span aria-hidden className="absolute inset-0 translate-x-5 translate-y-4 rotate-6 rounded-[32px] border border-white bg-white/35 backdrop-blur" />
            {/* Vidro com contorno em degrade (aqua para roxo), sem moldura escura. */}
            <div className="relative rounded-[32px] bg-gradient-to-br from-ciano-200 via-white to-roxo-400 p-[1.5px] shadow-[0_40px_90px_rgb(63_47_128/0.28)]">
            <div className="overflow-hidden rounded-[30.5px] bg-white/80 backdrop-blur-xl">
              <div className="relative overflow-hidden bg-gradient-to-br from-roxo via-roxo-400 to-ciano px-6 pt-7 pb-6 text-white">
                <span aria-hidden className="absolute -top-16 -right-10 size-44 rounded-full bg-white/15" />
                <p className="relative text-[0.6875rem] tracking-[0.14em] text-white/80 uppercase">Painel Saúde</p>
                <p className="display relative mt-1 text-[1.375rem]">Laudo do animal</p>
              </div>
              <motion.ul
                className="flex flex-col px-5 py-3"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              >
                {linhas.map(([nome, tom]) => (
                  <motion.li
                    key={nome}
                    className="flex items-center justify-between gap-3 border-b border-line py-3 text-[0.8125rem] text-ink last:border-0"
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: ease.out } },
                    }}
                  >
                    {nome}
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${tons[tom].chip}`}>
                      {statusLaudo.find((s) => s.tom === tom)!.selo}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/** Por que fazer uma vez so + coleta, com o video da coleta. */
export function Coleta() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Titulo titulo="Por que fazer uma vez só" />
          <FadeUp delay={0.1}>
            <p className="mt-4 text-[1.1875rem] leading-[1.5] text-ink md:text-[1.375rem]">
              O DNA do cão não muda ao longo da vida. Um único teste, feito ainda filhote ou antes da primeira
              cobertura, vale para toda a vida reprodutiva dele.
            </p>
          </FadeUp>
          <Words as="h3" className="display mt-12 text-title text-ink" parts={["Coleta"]} />
          <div className="mt-3">
            <Lista itens={coleta} numerada />
          </div>
          <FadeUp delay={0.1}>
            <p className="mt-5 rounded-2xl bg-lilas p-5 text-[0.9375rem] text-ink">
              <strong className="font-semibold">Garantia de recoleta:</strong> se a amostra não tiver DNA suficiente,
              enviamos um novo kit sem custo.
            </p>
          </FadeUp>
        </div>
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-panel bg-ink md:aspect-[16/12] lg:aspect-[4/5]"
          initial={{ clipPath: "inset(10% 10% 10% 10% round 28px)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 1.3, ease: ease.out }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={asset("/media/hero-coleta.jpg")}
            aria-label="Passo a passo da coleta com swab"
            className="size-full object-cover"
          >
            <source src={asset("/media/hero-coleta-mobile.mp4")} type="video/mp4" media="(max-width: 767px)" />
            <source src={asset("/media/hero-coleta.mp4")} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}

/** As opcoes lado a lado, em linhas. */
export function Comparativo() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Titulo titulo="As opções lado a lado" className="mb-10" />
        <ComparativoLinhas />
      </div>
    </section>
  );
}

/** Painel Saude: o produto principal, com a caixa e a compra. */
export function PainelSaude() {
  return (
    <section className="panel bg-paper py-24 md:py-32">
      <div className="container-page">
        <BlocoProduto id="painel" destaque />
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-[820px] text-center text-[0.9375rem] text-mute">
            Compre os kits de uma vez e use quando quiser. Vai pedir mais de 3 kits? Diga a quantidade no WhatsApp e
            já aplicamos o desconto. Cria raça merle? Pergunte também pelo Teste Merle detalhado.{" "}
            <a href={links.pendente} className="font-semibold text-roxo underline decoration-roxo/30 underline-offset-4">
              Ver a lista completa de doenças →
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/** Testes complementares: um bloco de produto para cada, alternando o lado da caixa. */
export function Complementares() {
  return (
    <section className="panel bg-paper py-24 md:py-32">
      <div className="container-page">
        <Titulo titulo="Testes complementares" className="mb-12 md:mb-16" />
        {/* Cartoes compactos: aqui nao se compra, cada um leva para a pagina do produto. */}
        <motion.ul
          className="grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.1 }}
        >
          {complementares.map((c) => (
            <motion.li
              key={c.id}
              className="group flex flex-col rounded-card border border-line bg-white p-3 transition-shadow duration-500 hover:shadow-[0_24px_50px_rgb(63_47_128/0.14)]"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
              }}
            >
              <Link
                href={`/testes/${c.id}`}
                aria-label={`Ver ${c.nome}`}
                className="relative block aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Caixa
                  id={c.id}
                  nome={c.nome}
                  className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                <h3 className="display text-[1.375rem] leading-snug text-ink">{c.nome}</h3>
                <p className="mt-2 line-clamp-3 text-[0.9375rem] text-mute">{c.texto}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <p className="display text-[1.375rem] leading-none text-ink">{c.preco.replace(" por teste", "")}</p>
                  <Link
                    href={`/testes/${c.id}`}
                    className="group/ver relative flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-roxo px-4 text-[0.9375rem] font-medium text-white"
                  >
                    <span aria-hidden className="absolute inset-0 translate-y-[101%] bg-ink transition-transform duration-500 ease-out-expo group-hover/ver:translate-y-0" />
                    <span className="relative">Ver produto</span>
                    <span aria-hidden className="relative transition-transform duration-300 group-hover/ver:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

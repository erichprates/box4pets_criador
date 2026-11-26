"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  coleta,
  comoEscolher,
  comparativo,
  complementares,
  links,
  painelDestaques,
  statusLaudo,
} from "@/content/site";
import { asset } from "@/lib/base";
import { ease, viewport } from "@/lib/motion";
import { Counter } from "../motion/Counter";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Lista, Tabela, Titulo } from "../ui/Blocos";
import { Rich, SplitButton } from "../ui/Button";
import { Check, Icon } from "../ui/icons";

/** As opcoes lado a lado: tabela no desktop, cartoes no celular. */
export function Comparativo() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Titulo titulo="As opções lado a lado" className="mb-10" />
        <Tabela
          colunas={["Teste", "O que avalia", "Espécies", "Quem realiza", "Preço"]}
          linhas={comparativo.map((c) => [
            <span key="t" className="flex flex-wrap items-center gap-2">
              {c.teste}
              {c.recomendado && (
                <span className="rounded-full bg-ciano px-2 py-0.5 text-[0.6875rem] font-semibold text-ink">Recomendado</span>
              )}
            </span>,
            c.avalia,
            c.especies,
            c.realiza,
            <span key="p" className="whitespace-nowrap">
              <strong className="font-semibold text-ink">{c.preco}</strong>
              {c.nota && <span className="block text-[0.8125rem] whitespace-normal text-mute">{c.nota}</span>}
            </span>,
          ])}
        />
      </div>
    </section>
  );
}

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
          <div role="tabpanel" className="grid rounded-panel border border-white/12 bg-white/[0.06] p-7 md:p-11">
            {comoEscolher.map((item, n) => {
              const on = n === i;
              return (
                <motion.div
                  key={item.q}
                  aria-hidden={!on}
                  className={`col-start-1 row-start-1 flex flex-col justify-center ${on ? "" : "pointer-events-none invisible"}`}
                  initial={false}
                  animate={on ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  transition={{ duration: on ? 0.5 : 0, ease: ease.out }}
                >
                  <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ciano-200 uppercase">Nossa indicação</p>
                  <p className="display mt-3 text-[1.375rem] leading-snug md:text-[1.75rem]">{item.a}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Painel Saude: descricao + cartao de preco. */
export function PainelSaude() {
  return (
    <section id="painel" className="py-24 md:py-36">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Titulo tag="Produto principal" titulo="Painel Saúde" />
          <FadeUp delay={0.1}>
            <p className="mt-5 text-[1.1875rem] leading-[1.5] text-ink md:text-[1.375rem]">
              O Painel Saúde avalia 220 doenças genéticas em cães e 39 doenças e variantes em gatos, incluindo as
              recomendadas para a raça do seu animal.
            </p>
          </FadeUp>
          <motion.ul
            className="mt-8 grid gap-3 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ staggerChildren: 0.08 }}
          >
            {painelDestaques.map((d) => (
              <motion.li
                key={d}
                className="flex items-center gap-3 rounded-2xl bg-paper p-4 text-[0.9375rem] font-medium text-ink"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
                }}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-roxo text-white">
                  <Check size={14} strokeWidth={2.6} />
                </span>
                {d}
              </motion.li>
            ))}
          </motion.ul>
          <FadeUp delay={0.15}>
            <a
              href={links.pendente}
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-roxo underline decoration-roxo/30 underline-offset-4 hover:decoration-roxo"
            >
              Ver a lista completa de doenças →
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div data-dark className="relative overflow-hidden rounded-panel bg-roxo p-8 text-white shadow-[0_30px_70px_rgb(63_47_128/0.35)] md:p-10">
            <div aria-hidden className="absolute -top-40 -right-40 size-[420px] bg-[radial-gradient(closest-side,rgb(124_107_208/0.6),transparent)]" />
            <p className="relative text-[0.8125rem] font-semibold tracking-[0.1em] text-ciano-200 uppercase">Painel Saúde · 1 animal</p>
            <p className="display relative mt-3 text-[4.5rem] leading-none">
              R$ <Counter value={619} />
            </p>
            <p className="relative mt-3 text-white/80">em até 6x sem juros · frete grátis</p>
            <ul className="relative mt-6 flex flex-col text-[0.9375rem]">
              <li className="flex justify-between gap-4 border-t border-white/15 py-3">
                <span>por kit acima de 3 kits</span>
                <strong className="font-semibold text-ciano-200">R$ 529</strong>
              </li>
              <li className="flex justify-between gap-4 border-t border-white/15 py-3">
                <span>por kit acima de 10 kits</span>
                <strong className="font-semibold text-ciano-200">R$ 489</strong>
              </li>
            </ul>
            <SplitButton href={links.pedir} variant="light" className="relative mt-6 w-full justify-between">
              Pedir pelo WhatsApp
            </SplitButton>
            <p className="relative mt-4 text-[0.875rem] text-white/70">
              Cria raça merle? Pergunte também pelo Teste Merle detalhado.
            </p>
          </div>
        </FadeUp>
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
            aria-label="Celular mostrando o laudo de um cão: lista de condições com os selos Livre, Portador e Em risco"
            className="mx-auto w-full max-w-[330px] rounded-[44px] bg-ink p-3 shadow-[0_40px_90px_rgb(27_18_61/0.35)]"
          >
            <div className="overflow-hidden rounded-[34px] bg-white">
              <div className="bg-roxo px-5 pt-8 pb-5 text-white">
                <p className="text-[0.6875rem] tracking-[0.14em] text-ciano-200 uppercase">Painel Saúde</p>
                <p className="display mt-1 text-[1.25rem]">Laudo do animal</p>
              </div>
              <motion.ul
                className="flex flex-col px-4 py-3"
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

/** Testes complementares: tres blocos com foto, alternando o lado. */
export function Complementares() {
  return (
    <section className="panel bg-paper py-24 md:py-32">
      <div className="container-page">
        <Titulo titulo="Testes complementares" className="mb-12 md:mb-16" />
        <div className="flex flex-col gap-5">
          {complementares.map((c, i) => (
            <FadeUp key={c.id}>
              <article
                id={c.id}
                className="group grid scroll-mt-28 gap-2.5 rounded-panel bg-white p-2.5 lg:grid-cols-[0.8fr_1fr]"
              >
                <div className={`grad-card relative min-h-[240px] overflow-hidden rounded-[20px] ${i % 2 ? "lg:order-2" : ""}`}>
                  {c.foto && (
                    <Image
                      src={c.foto}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 480px, 92vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-105"
                    />
                  )}
                  <span className="absolute bottom-4 left-4 grid size-12 place-items-center rounded-full bg-roxo text-white">
                    <Icon name={c.icon} size={22} />
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-5 md:p-9">
                  <h3 className="display text-title text-ink">{c.nome}</h3>
                  <p className="text-mute">{c.texto}</p>
                  <p className="display mt-auto pt-2 text-[2rem] leading-none text-roxo">{c.preco}</p>
                  <SplitButton href={c.cta.href} className="w-fit max-sm:w-full max-sm:justify-between max-sm:whitespace-normal">
                    {c.cta.label}
                  </SplitButton>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

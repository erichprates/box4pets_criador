"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { links, ninhadaHome, passos, porque, selos, testes } from "@/content/site";
import { asset } from "@/lib/base";
import { ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Lista, Titulo } from "../ui/Blocos";
import { Pagamento, SplitButton, Tag } from "../ui/Button";
import { Icon } from "../ui/icons";
import { Vitrine } from "./Loja";

/** Faixa de selos que corre sem parar, logo abaixo do hero. */
export function Selos() {
  const itens = [...selos, ...selos];
  return (
    <section aria-label="Garantias" className="overflow-hidden border-b border-line py-6">
      <div
        className="animate-marquee flex w-max gap-10"
        style={{ ["--marquee-duration" as string]: "38s" }}
      >
        {itens.map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= selos.length}
            className="flex shrink-0 items-center gap-3 text-[0.9375rem] font-medium text-ink"
          >
            <span className="grid size-9 place-items-center rounded-full bg-lilas text-roxo">
              <Icon name={s.icon} size={18} />
            </span>
            {s.texto}
          </span>
        ))}
      </div>
    </section>
  );
}

/** Por que testar: titulo e quatro cards com foto. */
export function PorQue() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-page">
        <Titulo tag="Por que testar" titulo="Decisões de acasalamento com dados e estratégia para garantir saúde" />
        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.1 }}
        >
          {porque.map((item) => (
            <motion.article
              key={item.titulo}
              className="group flex min-w-0 flex-col rounded-card border border-line bg-white p-2.5 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.14)]"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: ease.out } },
              }}
            >
              <div className="grad-card relative h-52 overflow-hidden rounded-[14px]">
                {item.foto && (
                  <>
                    <Image
                      src={item.foto}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                  </>
                )}
                <span className="absolute bottom-3 left-3 grid size-12 place-items-center rounded-full bg-roxo text-white shadow-[0_10px_24px_rgb(63_47_128/0.35)] transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
                  <Icon name={item.icon} size={22} />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4 pt-5">
                <h3 className="display text-[1.25rem] leading-snug text-ink">{item.titulo}</h3>
                <p className="text-[0.9375rem] text-mute">{item.texto}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Escolha o seu teste, em formato de loja: cada teste e um produto, com foto, preco,
 * quantidade e compra pelo WhatsApp. No Painel Saude o preco por kit cai conforme a quantidade.
 */
export function Escolha() {
  return (
    <section id="loja" className="panel bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeUp>
              <Tag>Escolha o seu teste</Tag>
            </FadeUp>
            <Words
              className="display mt-6 max-w-[820px] text-[clamp(1.9rem,3.4vw,3rem)] text-ink"
              parts={[
                "Comece pelo Painel Saúde.",
                { text: "Complete com o que o seu programa precisa.", className: "text-roxo-400" },
              ]}
            />
          </div>
          <FadeUp delay={0.1}>
            <Pagamento />
          </FadeUp>
        </div>

        <div className="mt-12">
          <Vitrine itens={testes} />
        </div>

        <FadeUp delay={0.1}>
          <p className="mt-8 text-center text-[0.9375rem] text-mute">
            Painel Saúde: R$ 619 por kit. Acima de 3 kits, R$ 529 cada; acima de 10, R$ 489 cada.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/** Video vertical em formato de stories: toca em loop so enquanto esta na tela. */
function Story({ nome, alt, distance, className }: { nome: string; alt: string; distance: number; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "10% 0px 10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView, reduced]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
      <motion.div
        className="relative aspect-[9/16] overflow-hidden rounded-[26px] bg-cover bg-center shadow-[0_40px_90px_rgb(0_0_0/0.45)] ring-1 ring-white/15"
        style={{ backgroundImage: `url(${asset(`/media/${nome}.jpg`)})` }}
        initial={{ clipPath: "inset(100% 0% 0% 0% round 26px)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 26px)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.3, ease: ease.inOut }}
      >
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className="size-full object-cover"
          src={asset(`/media/${nome}.mp4`)}
        />
        <div aria-hidden className="absolute inset-x-3 top-3">
          <span className="block h-[3px] overflow-hidden rounded-full bg-white/35">
            {inView && !reduced && (
              <motion.span
                className="block h-full origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              />
            )}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Ninhada Testada na home: painel escuro com texto, dois pontos e os videos em stories. */
export function NinhadaHome() {
  return (
    <section data-dark className="panel bg-ink py-24 text-white md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-72 -left-72 size-[900px] bg-[radial-gradient(closest-side,rgb(63_47_128/0.75),transparent)]" />
        <div className="absolute -right-72 -bottom-40 size-[760px] bg-[radial-gradient(closest-side,rgb(0_172_200/0.2),transparent)]" />
      </div>
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.2fr_auto] lg:gap-20">
        <div>
          <FadeUp>
            <Tag tone="dark">{ninhadaHome.tag}</Tag>
          </FadeUp>
          <Words
            className="display mt-6 text-display"
            parts={[ninhadaHome.titulo, { text: ninhadaHome.destaque, className: "text-ciano-200" }]}
          />
          <FadeUp delay={0.1}>
            <p className="mt-5 max-w-[580px] text-[1.0625rem] text-white/85">{ninhadaHome.texto}</p>
          </FadeUp>
          <div className="mt-6 max-w-[520px]">
            <Lista itens={ninhadaHome.itens} escuro />
          </div>
          <FadeUp delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <SplitButton href={links.ninhada} variant="light">
                Solicite uma cotação para testar a família toda
              </SplitButton>
              <SplitButton href="/programa-criador#ninhada" variant="outline" external={false}>
                Como funciona
              </SplitButton>
            </div>
          </FadeUp>
        </div>
        <div className="flex justify-center gap-4 lg:justify-end">
          <Story nome="story-brincando" alt="Dois cães brincando no gramado" distance={30} className="w-[44%] max-w-[230px] lg:mt-16" />
          <Story nome="story-canil" alt="Criadora fazendo carinho em um cão no canil" distance={-30} className="w-[44%] max-w-[230px] lg:mb-16" />
        </div>
      </div>
    </section>
  );
}

/** Tela do app desenhada no site (o protótipo pede "TELA", nao foto). */
function TelaApp({ tipo }: { tipo: "cadastro" | "laudo" }) {
  return (
    <div className="grad-soft absolute inset-0 grid place-items-center overflow-hidden">
      <span aria-hidden className="absolute aspect-square w-[90%] rounded-full border border-white/80" />
      <div className="relative w-[56%] rounded-[18px] bg-gradient-to-br from-ciano-200 via-white to-roxo-400 p-[1.5px] shadow-[0_20px_44px_rgb(63_47_128/0.25)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5">
        <div className="overflow-hidden rounded-[16.5px] bg-white/85 backdrop-blur">
          <div className="bg-gradient-to-br from-roxo via-roxo-400 to-ciano px-3.5 py-3 text-white">
            <p className="text-[0.5rem] tracking-[0.14em] text-white/80 uppercase">Box4Pets</p>
            <p className="display text-[0.8125rem] leading-tight">{tipo === "cadastro" ? "Cadastro do animal" : "Laudo"}</p>
          </div>
          {tipo === "cadastro" ? (
            <div className="flex flex-col gap-1.5 p-3">
              {["Nome", "Espécie", "Código do kit"].map((c, n) => (
                <div key={c}>
                  <p className="text-[0.5rem] font-semibold text-mute">{c}</p>
                  <span className="mt-1 flex h-5 items-center rounded-md border border-line bg-paper px-1.5">
                    <span className="h-1.5 rounded-full bg-ink/20" style={{ width: `${[55, 30, 45, 65][n]}%` }} />
                  </span>
                </div>
              ))}
              <span className="mt-1 grid h-6 place-items-center rounded-md bg-roxo text-[0.5625rem] font-semibold text-white">
                Ativar kit
              </span>
            </div>
          ) : (
            <ul className="flex flex-col px-3.5 py-2">
              {(["Normal", "Portador", "Normal", "Normal"] as const).map((st, n) => (
                <li key={n} className="flex items-center justify-between gap-2 border-b border-line py-2 last:border-0">
                  <span className="h-1.5 rounded-full bg-ink/20" style={{ width: `${[52, 40, 58, 34, 46][n]}%` }} />
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[0.5rem] font-semibold ${
                      st === "Normal" ? "bg-[#dff5e8] text-[#0f6b3a]" : "bg-[#fdf0d2] text-[#8a5a00]"
                    }`}
                  >
                    {st}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/** Imagem de cada passo, na ordem do protótipo: foto, tela, foto, tela. */
const midiaPassos: ({ foto: string; alt: string } | { tela: "cadastro" | "laudo"; alt: string })[] = [
  { foto: "/media/kit.jpg", alt: "Kit aberto, com a caixa, os swabs e o envelope" },
  { tela: "cadastro", alt: "Tela do app Box4Pets no cadastro do animal" },
  { foto: "/media/coleta.jpg", alt: "Mão passando o swab na bochecha de um cão" },
  { tela: "laudo", alt: "Tela do app com o laudo, mostrando os status Normal e Portador" },
];

/** Como funciona: quatro passos, cada um com sua imagem, ligados por uma linha que se desenha. */
export function ComoFunciona() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.3"] });
  return (
    <section className="py-24 md:py-36">
      <div className="container-page">
        <Titulo tag="Passo a passo" titulo="Como funciona" className="mb-14 md:mb-20" />
        <motion.ol
          ref={ref}
          className="relative grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.14 }}
        >
          {passos.map((p, n) => {
            const m = midiaPassos[n];
            return (
              <motion.li
                key={p.titulo}
                className="group flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
                }}
              >
                <div role="img" aria-label={m.alt} className="relative aspect-[4/3.3] overflow-hidden rounded-card bg-paper">
                  {"foto" in m ? (
                    <Image
                      src={m.foto}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
                    />
                  ) : (
                    <TelaApp tipo={m.tela} />
                  )}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="display grid size-11 shrink-0 place-items-center rounded-full bg-roxo text-[1rem] text-white transition-transform duration-500 ease-out-expo group-hover:scale-110">
                    {n + 1}
                  </span>
                  {/* Linha ate o proximo passo (so no desktop). */}
                  {n < passos.length - 1 && (
                    <span className="hidden h-px flex-1 overflow-hidden bg-line lg:block">
                      <motion.span
                        className="block h-full origin-left bg-roxo"
                        style={{ scaleX: useTransform(scrollYProgress, [n * 0.25, n * 0.25 + 0.35], [0, 1]) }}
                      />
                    </span>
                  )}
                </div>
                <h3 className="display mt-4 text-[1.3125rem] leading-snug text-ink">{p.titulo}</h3>
                <p className="mt-2 text-[0.9375rem] text-mute">{p.texto}</p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}

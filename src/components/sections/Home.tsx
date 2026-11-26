"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { links, ninhadaHome, porque, selos, testes, type Teste } from "@/content/site";
import { asset } from "@/lib/base";
import { ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Lista, Titulo } from "../ui/Blocos";
import { SplitButton, Tag } from "../ui/Button";
import { Icon } from "../ui/icons";

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

function CardTeste({ item, n, pin }: { item: Teste; n: number; pin: boolean }) {
  const dark = !!item.recomendado;
  return (
    <article
      className={`group flex gap-2.5 rounded-card p-2.5 shadow-[0_24px_60px_rgb(27_18_61/0.28)] max-sm:flex-col ${
        pin ? "w-[620px] shrink-0" : ""
      } ${dark ? "bg-ink text-white ring-1 ring-ciano-200/40" : "bg-white text-ink"}`}
    >
      <div
        className={`relative flex min-h-[270px] shrink-0 flex-col justify-between overflow-hidden rounded-[14px] p-4 max-sm:h-44 max-sm:min-h-0 sm:w-[190px] ${
          dark ? "bg-gradient-to-b from-ciano to-roxo" : "grad-card"
        }`}
      >
        {item.foto && (
          <>
            <Image
              src={item.foto}
              alt=""
              fill
              sizes="(min-width: 640px) 240px, 92vw"
              className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/35" />
          </>
        )}
        <span className="display relative text-[2.75rem] leading-none text-white">0{n + 1}</span>
        <span
          className={`relative grid size-12 place-items-center self-end rounded-full text-white shadow-[0_10px_24px_rgb(63_47_128/0.3)] transition-transform duration-500 ease-out-expo group-hover:scale-110 sm:self-start ${
            dark ? "bg-ink" : "bg-roxo"
          }`}
        >
          <Icon name={item.icon} size={22} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3.5 sm:py-4">
        <p className={`flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.1em] uppercase ${dark ? "text-ciano-200" : "text-roxo"}`}>
          {item.especies}
          {item.recomendado && (
            <span className="rounded-full bg-ciano-200 px-2 py-0.5 text-[0.6875rem] tracking-normal text-ink normal-case">
              Recomendado
            </span>
          )}
        </p>
        <h3 className="display text-[1.625rem]">{item.nome}</h3>
        <p className={`text-[0.9375rem] leading-[1.55] ${dark ? "text-white/80" : "text-mute"}`}>{item.texto}</p>
        <p className={`display mt-auto pt-2 text-[2rem] leading-none ${dark ? "text-ciano-200" : "text-roxo"}`}>{item.preco}</p>
        <SplitButton href={item.cta.href} size="sm" variant={dark ? "light" : "ghost"} className="mt-1 w-fit">
          {item.cta.label}
        </SplitButton>
      </div>
    </article>
  );
}

/**
 * Escolha o teste: painel roxo com os quatro testes. No desktop a secao trava na tela e
 * os cards correm na horizontal conforme a rolagem; no celular viram uma pilha.
 */
export function Escolha() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const overflow = useRef(0);
  const [height, setHeight] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const pin = height !== null;

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      const w = wrap.current;
      if (!t || !w) return;
      const can = !reduced && window.innerWidth >= 1024 && window.innerHeight >= 740;
      if (!can) {
        overflow.current = 0;
        setHeight(null);
        return;
      }
      const total = Array.from(t.children).reduce((sum, el) => sum + (el as HTMLElement).offsetWidth + 20, 0);
      const pad = Math.max(20, (w.clientWidth - 1240) / 2 + 40);
      overflow.current = Math.max(0, total - 20 + pad * 2 - w.clientWidth);
      setHeight(window.innerHeight + overflow.current);
    };
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [reduced, pin]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * overflow.current);

  return (
    <section data-dark className="panel bg-roxo text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] left-1/2 aspect-square w-[130%] -translate-x-1/2 rounded-full border border-white/10" />
        <div className="absolute -top-[10%] left-1/2 aspect-square w-[95%] -translate-x-1/2 rounded-full border border-white/10" />
        <div className="absolute -top-[420px] -right-[420px] size-[1000px] bg-[radial-gradient(closest-side,rgb(124_107_208/0.45),transparent)]" />
      </div>

      <div ref={wrap} className="relative" style={pin ? { height: height! } : undefined}>
        <div
          className={
            pin ? "sticky top-0 flex h-screen flex-col justify-center gap-9 overflow-hidden" : "flex flex-col gap-12 py-24 md:py-32"
          }
        >
          <div className="container-page">
            <FadeUp>
              <Tag tone="dark">Escolha o seu teste</Tag>
            </FadeUp>
            <Words
              className="display mt-5 max-w-[900px] text-[clamp(1.9rem,3.4vw,3rem)]"
              parts={[
                "Comece pelo Painel Saúde.",
                { text: "Complete com o que o seu programa precisa.", className: "text-ciano-200" },
              ]}
            />
          </div>

          <motion.div
            ref={track}
            style={pin ? { x } : undefined}
            className={
              pin
                ? "flex w-max items-stretch gap-5 px-[max(1.25rem,calc((100vw-1240px)/2+2.5rem))] will-change-transform"
                : "container-page grid items-stretch gap-5 md:grid-cols-2"
            }
          >
            {testes.map((item, n) => (
              <CardTeste key={item.id} item={item} n={n} pin={pin} />
            ))}
          </motion.div>

          {pin && (
            <div className="container-page">
              <div className="h-[3px] overflow-hidden rounded-full bg-white/15">
                <motion.div className="h-full origin-left bg-ciano-200" style={{ scaleX: scrollYProgress }} />
              </div>
            </div>
          )}
        </div>
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
          <Story nome="story-cao" alt="Veterinária sorrindo para um cão na clínica" distance={30} className="w-[44%] max-w-[230px] lg:mt-16" />
          <Story nome="story-gato" alt="Veterinário segurando um gato no consultório" distance={-30} className="w-[44%] max-w-[230px] lg:mb-16" />
        </div>
      </div>
    </section>
  );
}

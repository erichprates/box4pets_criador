"use client";

import { asset } from "@/lib/base";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { selos } from "@/content/site";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Pagamento, SplitButton } from "../ui/Button";
import { Icon } from "../ui/icons";
import { Logo } from "../ui/Logo";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // No celular o video ja aparece na primeira dobra: chega menos deitado e quase no tamanho final.
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const tilt = useTransform(scrollYProgress, [0.02, mobile ? 0.25 : 0.45], [mobile ? 14 : 34, 0]);
  const scale = useTransform(scrollYProgress, [0.02, mobile ? 0.25 : 0.45], [mobile ? 0.94 : 0.8, 1]);
  const lift = useTransform(scrollYProgress, [0.02, mobile ? 0.25 : 0.45], [mobile ? 10 : 70, 0]);
  const zoom = useTransform(scrollYProgress, [0.02, 0.55], [1.3, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [30, -70]);
  const box = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const side = useTransform(box, [0, 1], [0, 12]);
  const top = useTransform(box, [0, 1], [0, 8]);
  const radius = useTransform(box, [0, 1], [0, 28]);
  const clipPath = useMotionTemplate`inset(${top}px ${side}px 0px ${side}px round ${radius}px)`;
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const logoY = useTransform(scrollY, [0, 150], [0, -50]);
  const logoScale = useTransform(scrollY, [0, 150], [1, 0.6]);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // O video de fundo toca sozinho, em loop, assim que a pagina abre (sem esperar a rolagem).
  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return;
    v.muted = true;
    v.defaultMuted = true;
    const tocar = () => void v.play().then(() => setReady(true)).catch(() => undefined);
    tocar();
    // Se o aparelho recusar (modo de economia de bateria), tenta de novo no primeiro toque.
    window.addEventListener("touchstart", tocar, { passive: true, once: true });
    return () => window.removeEventListener("touchstart", tocar);
  }, [reduced]);

  return (
    <section id="topo" ref={ref}>
      {/* Comeca em tela cheia; ao rolar, recua das bordas e ganha os cantos arredondados do painel. */}
      <motion.div
        data-dark
        className="relative overflow-clip bg-ink pt-[88px] pb-10 text-white md:pt-[120px] md:pb-14"
        style={{ clipPath: reduced ? "inset(8px 12px 0px 12px round 28px)" : clipPath }}
      >
        {/* Video de fundo: fica preso na tela e toca sozinho, em loop. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="sticky top-0 h-svh overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${asset("/media/hero-campo.jpg")})` }}
          >
            <video
              ref={video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setReady(true)}
              className={`size-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
            >
              <source src={asset("/media/hero-campo-mobile.mp4")} type="video/mp4" media="(max-width: 767px)" />
              <source src={asset("/media/hero-campo.mp4")} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-roxo/55 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-roxo/65" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_42%,rgb(15_9_40/0.72),transparent_72%)]" />
          </div>
        </div>

        <div className="container-page relative flex flex-col items-center text-center">
          {/* Tudo ate os botoes cabe na primeira dobra, centralizado na altura da tela. */}
          <div className="flex w-full flex-col items-center pb-6 md:min-h-[calc(84svh-120px)] md:justify-center md:pb-[4vh]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: ease.out, delay: 0.15 }}
            >
              {/* Logo grande no centro: ao rolar ele sobe e some, e reaparece no menu. */}
              <motion.div
                className="mb-5 flex origin-top justify-center text-white md:mb-[3.5vh]"
                style={reduced ? undefined : { opacity: logoOpacity, y: logoY, scale: logoScale }}
              >
                <Logo mono className="h-12 w-auto md:h-[76px]" />
              </motion.div>
              <p className="flex items-center gap-4 font-display text-[0.8125rem] font-light tracking-[0.32em] text-white/90 uppercase max-md:text-[0.625rem] max-md:tracking-[0.24em] md:text-[0.875rem]">
                <span aria-hidden className="h-px w-8 bg-white/40 max-sm:hidden" />
                Para criadores de cães e gatos
                <span aria-hidden className="h-px w-8 bg-white/40 max-sm:hidden" />
              </p>
            </motion.div>

            <Words
              as="h1"
              eager
              delay={0.25}
              className="display mt-4 max-w-[1020px] text-[clamp(2.1rem,min(5.6vw,8.4vh),5rem)] text-white [text-shadow:0_2px_30px_rgb(27_18_61/0.35)] md:mt-[2.6vh]"
              parts={["Genética de saúde", "\n\n", { text: "para cães e gatos", className: "font-light text-ciano-200" }]}
            />

            <motion.div
              className="mt-6 flex w-full flex-wrap items-center justify-center gap-3 md:mt-[3.8vh]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: ease.out, delay: 1 }}
            >
              {/* Leva para a vitrine de testes, mais abaixo na pagina (nao abre o WhatsApp). */}
              <SplitButton href="#loja" variant="light" external={false} className="max-md:w-full max-md:justify-between">
                Adquira o teste
              </SplitButton>
              <SplitButton href="/testes" variant="aqua" external={false} className="max-md:hidden">
                Conhecer os testes
              </SplitButton>
              <SplitButton href="/programa-criador" variant="outline" external={false} className="max-md:hidden">
                Conhecer o Programa Criador
              </SplitButton>
            </motion.div>
            <motion.div
              className="mt-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: ease.out, delay: 1.2 }}
            >
              <Pagamento escuro className="justify-center" />
            </motion.div>
          </div>

          {/* Video da coleta, sem moldura: abre de baixo para cima e levanta da perspectiva com a rolagem. */}
          <div className="relative w-full max-w-[1080px] [perspective:1400px]">
            <motion.div
              className="origin-bottom will-change-transform"
              style={reduced ? undefined : { rotateX: tilt, scale, y: lift }}
            >
              <motion.div
                className="relative aspect-[16/10] overflow-hidden rounded-[24px] shadow-[0_50px_110px_rgb(10_6_30/0.55)] md:aspect-[16/9]"
                initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                transition={{ duration: 1.5, ease: ease.inOut, delay: 1.5 }}
              >
                <motion.div
                  className="absolute -inset-y-[8%] inset-x-0"
                  style={reduced ? undefined : { y: imgY, scale: zoom }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={asset("/media/hero-coleta.jpg")}
                    aria-label="Coleta de swab bucal em cães e o kit de coleta aberto"
                    className="size-full object-cover"
                  >
                    <source src={asset("/media/hero-coleta-mobile.mp4")} type="video/mp4" media="(max-width: 767px)" />
                    <source src={asset("/media/hero-coleta.mp4")} type="video/mp4" />
                  </video>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto mt-3 flex w-full items-center gap-3.5 rounded-2xl border border-white bg-white/90 p-3 pr-5 text-left shadow-[0_18px_44px_rgb(27_18_61/0.22)] backdrop-blur md:absolute md:mt-0 md:-left-8 md:bottom-10 md:w-fit md:max-w-[300px] md:p-4"
              style={{ y: reduced ? 0 : badgeY }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.3 }}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-roxo text-white">
                <Icon name="dna" size={24} />
              </span>
              <span className="text-[0.875rem] leading-snug text-mute">
                <strong className="block text-[0.9375rem] font-semibold text-ink">Resultado em 6 semanas</strong>
                Laudo no app e em PDF
              </span>
            </motion.div>
          </div>

          {/* Depois do video: frase de destaque + os quatro selos. No celular, tambem os outros atalhos. */}
          <div className="mt-14 flex w-full max-w-[1080px] flex-col gap-8 px-3 pb-4 text-left md:mt-20 md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16 md:px-0 md:pb-10">
            <FadeUp>
              <p className="display text-[1.3125rem] leading-[1.35] text-white md:text-[1.75rem] md:leading-[1.3]">
                O Painel Saúde da Box4Pets avalia 220 doenças genéticas em cães e 39 em gatos, de forma simples e
                fácil.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <ul className="flex flex-col border-t border-white/15 text-[1rem] text-white/90">
                {selos.map((s, n) => (
                  <li key={s.texto} className="flex items-center gap-3 border-b border-white/15 py-3.5">
                    <span className="text-[0.75rem] text-ciano-200 tabular-nums">/0{n + 1}</span>
                    {s.texto}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.15} className="md:hidden">
              <div className="flex flex-col gap-3">
                <SplitButton href="/testes" variant="aqua" external={false} className="w-full justify-between">
                  Conhecer os testes
                </SplitButton>
                <SplitButton href="/programa-criador" variant="outline" external={false} className="w-full justify-between">
                  Conhecer o Programa Criador
                </SplitButton>
              </div>
            </FadeUp>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Logo } from "./Logo";

/** Aparencia da embalagem de cada produto. */
const estilos: Record<
  string,
  { frente: string; lado: string; topo: string; faixa: string; texto: string; linha: string; destaque?: string }
> = {
  painel: {
    frente: "linear-gradient(160deg,#4b3a96 0%,#3f2f80 55%,#2c2060 100%)",
    lado: "linear-gradient(180deg,#2c2060,#1f1647)",
    topo: "linear-gradient(90deg,#5a48ad,#4b3a96)",
    faixa: "#60c7cf",
    texto: "#ffffff",
    linha: "220 doenças em cães · 39 em gatos",
  },
  merle: {
    frente: "linear-gradient(160deg,#2a2052 0%,#1b123d 60%,#120b2b 100%)",
    lado: "linear-gradient(180deg,#120b2b,#0b0620)",
    topo: "linear-gradient(90deg,#34296a,#2a2052)",
    faixa: "#8fe3f2",
    texto: "#ffffff",
    linha: "Subtipos Mc · Ma · Ma+ · M · Mh",
  },
  avulsos: {
    frente: "linear-gradient(160deg,#7fd6dd 0%,#60c7cf 55%,#3fa9b3 100%)",
    lado: "linear-gradient(180deg,#3fa9b3,#2f8a93)",
    topo: "linear-gradient(90deg,#9be3e8,#7fd6dd)",
    faixa: "#3f2f80",
    texto: "#1b123d",
    linha: "Mais de 400 testes para cães e gatos",
    // A caixa ja e da cor do "4" do logo: ele e a etiqueta ficam brancos.
    destaque: "#ffffff",
  },
  perfil: {
    frente: "linear-gradient(160deg,#ffffff 0%,#f1eefb 55%,#ddd5f5 100%)",
    lado: "linear-gradient(180deg,#cfc5ef,#b7abe3)",
    topo: "linear-gradient(90deg,#ffffff,#f1eefb)",
    faixa: "#3f2f80",
    texto: "#1b123d",
    linha: "Identidade genética · paternidade",
  },
};

/**
 * Embalagem do produto em 3D, desenhada em CSS: gira de leve sozinha e acompanha o mouse.
 * As medidas sao em `em`, entao a caixa inteira escala com o tamanho de fonte do palco.
 */
export function Caixa({ id, nome, className = "" }: { id: string; nome: string; className?: string }) {
  const e = estilos[id] ?? estilos.painel;
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-1, 1], [-46, -10]);
  const rotateX = useTransform(sy, [-1, 1], [16, -2]);

  const onMove = (ev: PointerEvent<HTMLDivElement>) => {
    const r = ev.currentTarget.getBoundingClientRect();
    mx.set(((ev.clientX - r.left) / r.width) * 2 - 1);
    my.set(((ev.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const claro = e.texto === "#ffffff";
  const face = "absolute top-1/2 left-1/2 [backface-visibility:hidden]";

  return (
    <div
      role="img"
      aria-label={`Embalagem do ${nome}`}
      onPointerMove={reduced ? undefined : onMove}
      onPointerLeave={onLeave}
      className={`@container grid place-items-center overflow-hidden ${className}`}
      style={{ background: "radial-gradient(ellipse at 50% 38%,#ffffff 0%,#efeafb 55%,#d9d1f3 100%)" }}
    >
      <span aria-hidden className="absolute aspect-square w-[92%] rounded-full border border-white/80" />
      <span aria-hidden className="absolute aspect-square w-[62%] rounded-full border border-white" />
      {/* Sombra no chao. */}
      <span
        aria-hidden
        className="absolute bottom-[9%] left-1/2 h-[9%] w-[58%] -translate-x-[42%] rounded-[50%] bg-ink/35 blur-xl"
      />

      <div className="animate-float relative text-[4.3cqw] [perspective:60em]">
        <motion.div
          className="relative h-[14.6em] w-[10.6em] [transform-style:preserve-3d]"
          style={reduced ? { rotateY: -28, rotateX: 7 } : { rotateY, rotateX }}
        >
          {/* Frente */}
          <div
            className={`${face} flex h-[14.6em] w-[10.6em] flex-col justify-between overflow-hidden p-[1em]`}
            style={{ background: e.frente, color: e.texto, transform: "translate(-50%,-50%) translateZ(1.7em)" }}
          >
            <span className="absolute -top-[30%] -right-[40%] aspect-square w-[120%] rounded-full border" style={{ borderColor: claro ? "rgb(255 255 255 / 0.14)" : "rgb(27 18 61 / 0.1)" }} />
            <span className="absolute -top-[10%] -right-[20%] aspect-square w-[80%] rounded-full border" style={{ borderColor: claro ? "rgb(255 255 255 / 0.14)" : "rgb(27 18 61 / 0.1)" }} />
            <Logo mono={claro} destaque={e.destaque} className="relative h-[2.3em] w-auto self-start" />
            <div className="relative">
              <p className="text-[0.55em] font-semibold tracking-[0.18em] uppercase opacity-70">Teste genético</p>
              <p className="display mt-[0.25em] text-[1.55em] leading-[1.02]">{nome}</p>
              <p className="mt-[0.7em] text-[0.56em] leading-snug opacity-85">{e.linha}</p>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-[0.45em]" style={{ background: e.faixa }} />
            {/* Brilho do papel. */}
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25" />
          </div>
          {/* Fundo */}
          <div
            className={`${face} h-[14.6em] w-[10.6em]`}
            style={{ background: e.lado, transform: "translate(-50%,-50%) rotateY(180deg) translateZ(1.7em)" }}
          />
          {/* Lateral direita */}
          <div
            className={`${face} flex h-[14.6em] w-[3.4em] items-center justify-center`}
            style={{ background: e.lado, color: e.texto, transform: "translate(-50%,-50%) rotateY(90deg) translateZ(5.3em)" }}
          >
            <span className="display rotate-90 text-[0.8em] tracking-[0.12em] whitespace-nowrap uppercase opacity-80">{nome}</span>
            <span className="absolute inset-x-0 bottom-0 h-[0.45em]" style={{ background: e.faixa }} />
          </div>
          {/* Lateral esquerda */}
          <div
            className={`${face} h-[14.6em] w-[3.4em]`}
            style={{ background: e.lado, transform: "translate(-50%,-50%) rotateY(-90deg) translateZ(5.3em)" }}
          />
          {/* Tampa */}
          <div
            className={`${face} h-[3.4em] w-[10.6em]`}
            style={{ background: e.topo, transform: "translate(-50%,-50%) rotateX(90deg) translateZ(7.3em)" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

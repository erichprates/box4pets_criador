"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, nav } from "@/content/site";
import { ease } from "@/lib/motion";
import { SplitButton } from "../ui/Button";
import { ArrowUpRight, Close, Menu } from "../ui/icons";
import { Logo } from "../ui/Logo";

/**
 * Header flutuante, igual ao do Box4Vets: logo solto, menu em pilula no centro e os atalhos
 * a direita. Sem fundo no topo; ao rolar ganha um vidro. O logo fica branco sobre blocos
 * escuros (marcados com data-dark).
 * `heroLogo`: na home o logo comeca grande no hero e so aparece aqui depois de rolar.
 */
export function Header({ heroLogo = false }: { heroLogo?: boolean }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [hover, setHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastLogo, setPastLogo] = useState(false);
  const [dark, setDark] = useState(false);
  const [darkRight, setDarkRight] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const glass =
    scrolled || open ? "bg-white/85 shadow-[0_14px_40px_rgb(27_18_61/0.12)] backdrop-blur-xl" : "bg-transparent";
  const light = dark && !scrolled && !open;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setPastLogo(y > 110);
    setHidden(y > 500 && y > prev);
  });

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));
    // Um bloco escuro pode ocupar so metade da largura: testa o ponto do logo e o do botao.
    const at = (x: number) =>
      els.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 40 && r.bottom >= 40 && r.left <= x && r.right >= x;
      });
    const onScroll = () => {
      const w = window.innerWidth;
      const pad = Math.max(12, (w - 1160) / 2);
      setDark(at(pad + 70));
      setDarkRight(at(w - pad - 90));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logoOculto = heroLogo && !pastLogo && !open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-[clamp(1rem,4vw,2.5rem)] pt-3"
        initial={{ y: -100 }}
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.7, ease: ease.out }}
        onMouseLeave={() => setHover(null)}
      >
        <div
          className={`relative mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-3 transition-[background-color,padding] duration-500 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
            scrolled && !open ? "max-lg:rounded-2xl max-lg:bg-ink/75 max-lg:pr-1.5 max-lg:pl-3 max-lg:backdrop-blur-xl" : ""
          }`}
        >
          <Link
            href="/"
            aria-label="Box4Pets Criador, página inicial"
            tabIndex={logoOculto ? -1 : undefined}
            className={`flex h-14 shrink-0 items-center justify-self-start transition-[color,opacity,transform] duration-500 ease-out-expo ${
              dark || open ? "text-white" : "text-roxo"
            } ${logoOculto ? "pointer-events-none translate-y-3 scale-110 opacity-0" : "opacity-100"}`}
          >
            <Logo mono={dark || open} className="h-10 w-auto max-lg:hidden" />
            <span className={`lg:hidden ${scrolled || dark || open ? "text-white" : "text-roxo"}`}>
              <Logo mono={scrolled || dark || open} className="h-9 w-auto" />
            </span>
          </Link>

          <nav
            aria-label="Principal"
            className={`relative hidden h-14 items-center rounded-2xl px-1.5 text-[0.9rem] font-medium transition-[background-color,box-shadow] duration-500 lg:flex ${glass}`}
          >
            {nav.map((item) => {
              const on = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={on ? "page" : undefined}
                  onMouseEnter={() => setHover(item.href)}
                  onFocus={() => setHover(item.href)}
                  className={`relative flex h-11 items-center rounded-xl px-3.5 transition-colors duration-300 ${
                    light ? (on ? "text-white" : "text-white/85 hover:text-white") : on ? "text-roxo" : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {hover === item.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className={`pointer-events-none absolute inset-0 rounded-xl ${light ? "bg-white/15" : "bg-lilas"}`}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {on && (
                    <motion.span
                      layoutId="nav-dot"
                      className="pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-ciano"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            {/* Barra de leitura da pagina. */}
            <div
              className={`pointer-events-none absolute inset-x-4 bottom-0 h-[2px] overflow-hidden rounded-full transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
            >
              <motion.div className="h-full origin-left bg-gradient-to-r from-ciano to-roxo" style={{ scaleX: progress }} />
            </div>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={links.pendente}
              className="hidden h-11 shrink-0 items-center rounded-xl bg-ciano-200 px-4 text-[0.9375rem] font-medium whitespace-nowrap text-ink transition-colors duration-300 hover:bg-white min-[1180px]:flex"
            >
              Ativar kit
            </a>
            <SplitButton href={links.pedir} size="sm" variant={darkRight ? "light" : "primary"} className="max-md:hidden">
              Pedir pelo WhatsApp
            </SplitButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-11 place-items-center rounded-xl bg-roxo text-white lg:hidden"
            >
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-roxo px-7 pt-28 pb-8 text-white lg:hidden"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: ease.inOut }}
          >
            <nav aria-label="Principal" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: ease.out }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/15 py-4"
                  >
                    <span className="text-[0.8125rem] text-ciano-200 tabular-nums">/0{i + 1}</span>
                    <span className="display flex-1 text-[1.625rem]">{item.label}</span>
                    <ArrowUpRight size={20} className="self-center text-white/60" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-auto flex flex-col gap-3 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <SplitButton href={links.pedir} variant="light" className="w-full justify-between">
                Pedir pelo WhatsApp
              </SplitButton>
              <SplitButton href={links.pendente} variant="outline" external={false} className="w-full justify-between">
                Ativar kit
              </SplitButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

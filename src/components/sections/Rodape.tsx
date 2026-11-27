import Link from "next/link";
import type { ReactNode } from "react";
import { rodape } from "@/content/site";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Email, Instagram, WhatsApp } from "../ui/icons";
import { Logo } from "../ui/Logo";

/**
 * Fecho de todas as paginas: painel roxo com a chamada final e, dentro dele, o rodape em
 * cartao branco. `children` recebe os botoes (ou um formulario, via `lado`).
 */
export function Fecho({
  titulo,
  texto,
  children,
  lado,
}: {
  titulo: string;
  texto?: ReactNode;
  children?: ReactNode;
  /** Conteudo na coluna da direita (ex: formulario). Sem ele, a chamada fica centralizada. */
  lado?: ReactNode;
}) {
  return (
    <section id="contato" className="pt-2 pb-3">
      <div data-dark className="panel bg-roxo pt-24 pb-3 text-white md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-[8%] left-1/2 aspect-square w-[150%] -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.03]" />
          <div className="absolute top-[22%] left-1/2 aspect-square w-[110%] -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.03]" />
          <div className="absolute -top-80 -right-52 size-[900px] bg-[radial-gradient(closest-side,rgb(124_107_208/0.55),transparent)]" />
          <div className="absolute -bottom-52 -left-72 size-[800px] bg-[radial-gradient(closest-side,rgb(0_172_200/0.25),transparent)]" />
        </div>

        <div
          className={`container-page relative ${
            lado ? "grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16" : "flex flex-col items-center text-center"
          }`}
        >
          <div className={lado ? "" : "flex flex-col items-center"}>
            <Words className={`display text-display ${lado ? "" : "max-w-[900px]"}`} parts={[titulo]} />
            {texto && (
              <FadeUp delay={0.1}>
                <p className={`mt-5 text-[1.125rem] text-white/85 ${lado ? "max-w-[540px]" : "max-w-[640px]"}`}>{texto}</p>
              </FadeUp>
            )}
            {children && (
              <FadeUp delay={0.2}>
                <div className={`mt-8 flex flex-wrap gap-3 ${lado ? "" : "justify-center"}`}>{children}</div>
              </FadeUp>
            )}
          </div>
          {lado && <FadeUp delay={0.15}>{lado}</FadeUp>}
        </div>

        <footer className="container-page relative mt-20 md:mt-28">
          <div className="rounded-[22px] bg-white text-ink">
            <div className="grid gap-10 p-7 md:p-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
              <div>
                <Link href="/" aria-label="Box4Pets Criador, página inicial" className="inline-block">
                  <Logo className="h-14 w-auto" />
                </Link>
                <p className="mt-4 max-w-[260px] text-[0.9375rem] text-mute">{rodape.frase}</p>
              </div>
              {rodape.colunas.map((col) => (
                <nav key={col.titulo} aria-label={col.titulo}>
                  <p className="display text-[1rem] text-ink">{col.titulo}</p>
                  <ul className="mt-4 flex flex-col gap-2.5 text-[0.9375rem] text-mute">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.href.startsWith("/") ? (
                          <Link href={l.href} className="transition-colors hover:text-roxo">
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            href={l.href}
                            {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                            aria-label={l.nome ? `${l.nome}: ${l.label}` : undefined}
                            className="group/c inline-flex items-center gap-2.5 transition-colors hover:text-roxo"
                          >
                            {l.icone && (
                              <span
                                className={`grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover/c:scale-110 ${
                                  l.icone === "whatsapp" ? "bg-[#25d366] text-white" : "bg-lilas text-roxo"
                                }`}
                              >
                                {l.icone === "whatsapp" ? (
                                  <WhatsApp size={17} />
                                ) : l.icone === "instagram" ? (
                                  <Instagram size={17} />
                                ) : (
                                  <Email size={17} />
                                )}
                              </span>
                            )}
                            {l.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-line px-7 py-5 text-[0.8125rem] text-mute md:flex-row md:items-center md:justify-between md:px-10">
              <span>{rodape.legal}</span>
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                {rodape.politicas.map((p) => (
                  <a key={p} href="#" className="transition-colors hover:text-roxo">
                    {p}
                  </a>
                ))}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

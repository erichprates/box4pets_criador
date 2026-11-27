"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { links, testes } from "@/content/site";
import { brl, noCarrinho, precoDe, unitario, useCarrinho } from "@/lib/carrinho";
import { ease } from "@/lib/motion";
import { Caixa } from "../ui/Caixa";
import { Close, WhatsApp } from "../ui/icons";
import { Quantidade } from "./Loja";

function IconeCarrinho({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M3 4h2.2l2.3 11h10.2l2-8H6.4" />
      <circle cx="9" cy="19.2" r="1.3" />
      <circle cx="16.5" cy="19.2" r="1.3" />
    </svg>
  );
}

/** Botao do carrinho no menu, com a quantidade de itens. */
export function BotaoCarrinho() {
  const { unidades, abrir } = useCarrinho();
  return (
    <button
      type="button"
      onClick={abrir}
      aria-label={unidades ? `Abrir carrinho, ${unidades} ${unidades > 1 ? "itens" : "item"}` : "Abrir carrinho"}
      className="relative grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-white text-roxo shadow-[0_6px_20px_rgb(27_18_61/0.12)] transition-transform duration-300 hover:scale-105"
    >
      <IconeCarrinho className="size-[22px]" />
      <AnimatePresence>
        {unidades > 0 && (
          <motion.span
            key={unidades}
            className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ciano px-1 text-[0.6875rem] font-semibold text-white tabular-nums"
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
          >
            {unidades}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/** Mensagem do pedido que abre no WhatsApp, com itens, quantidades e total. */
function mensagem(itens: Record<string, number>, total: number) {
  const linhas = noCarrinho
    .filter((id) => itens[id])
    .map((id) => {
      const nome = testes.find((t) => t.id === id)!.nome;
      const q = itens[id];
      return `• ${q}x ${nome} (${brl(precoDe(id, q))}${q > 1 ? " cada" : ""})`;
    });
  return `Olá! Vim pelo site e quero fazer este pedido:\n${linhas.join("\n")}\nTotal: ${brl(total)}`;
}

/** Gaveta do carrinho: itens, quantidades, desconto por quantidade e fechamento pelo WhatsApp. */
export function Carrinho() {
  const { itens, unidades, total, economia, aberto, fechar, definir, remover } = useCarrinho();
  const ids = noCarrinho.filter((id) => itens[id]);
  const painel = itens.painel ?? 0;
  // Proxima faixa de desconto do Painel Saude.
  const faixa = painel > 10 ? null : painel > 3 ? { falta: 11 - painel, preco: 489, de: 4, ate: 11 } : { falta: 4 - painel, preco: 529, de: 0, ate: 4 };

  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = "hidden";
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", tecla);
    };
  }, [aberto, fechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Carrinho">
          <motion.button
            type="button"
            aria-label="Fechar carrinho"
            onClick={fechar}
            className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.aside
            data-lenis-prevent
            className="absolute inset-y-2 right-2 flex w-[calc(100%-1rem)] max-w-[440px] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgb(27_18_61/0.35)]"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ duration: 0.6, ease: ease.out }}
          >
            <header className="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 className="display text-[1.5rem] text-ink">
                Carrinho
                {unidades > 0 && <span className="ml-2 font-sans text-[0.9375rem] font-normal text-mute">{unidades} {unidades > 1 ? "itens" : "item"}</span>}
              </h2>
              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar carrinho"
                className="grid size-10 cursor-pointer place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-lilas"
              >
                <Close size={18} />
              </button>
            </header>

            {ids.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-lilas text-roxo">
                  <IconeCarrinho className="size-7" />
                </span>
                <p className="display text-[1.25rem] text-ink">Seu carrinho está vazio</p>
                <p className="text-[0.9375rem] text-mute">Escolha os testes e feche o pedido de uma vez pelo WhatsApp.</p>
                <Link
                  href="/testes"
                  onClick={fechar}
                  className="mt-2 flex h-12 items-center rounded-xl bg-roxo px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink"
                >
                  Ver os testes
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  {/* Quanto falta para a proxima faixa de desconto do Painel Saude. */}
                  {painel > 0 && (
                    <div className="mb-4 rounded-2xl bg-paper p-4">
                      <p className="text-[0.875rem] text-ink">
                        {faixa ? (
                          <>
                            {faixa.falta === 1 ? "Falta 1 kit" : `Faltam ${faixa.falta} kits`} de Painel Saúde para pagar{" "}
                            <strong>{brl(faixa.preco)} cada</strong>.
                          </>
                        ) : (
                          <>
                            Você está na melhor faixa: <strong>R$ 489 por kit</strong> de Painel Saúde.
                          </>
                        )}
                      </p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                        <motion.div
                          className="h-full origin-left rounded-full bg-gradient-to-r from-ciano to-roxo"
                          initial={false}
                          animate={{ scaleX: faixa ? (painel - faixa.de) / (faixa.ate - faixa.de) : 1 }}
                          transition={{ duration: 0.6, ease: ease.out }}
                        />
                      </div>
                    </div>
                  )}
                  <ul className="flex flex-col">
                    <AnimatePresence initial={false}>
                      {ids.map((id) => {
                        const item = testes.find((t) => t.id === id)!;
                        const q = itens[id];
                        const preco = precoDe(id, q);
                        return (
                          <motion.li
                            key={id}
                            className="overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: ease.out }}
                          >
                            <div className="flex gap-4 border-b border-line py-4">
                              <Link href={`/testes/${id}`} onClick={fechar} aria-label={`Ver ${item.nome}`} className="relative block size-20 shrink-0 overflow-hidden rounded-2xl">
                                <Caixa id={id} nome={item.nome} className="pointer-events-none absolute inset-0" />
                              </Link>
                              <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <div className="flex items-start justify-between gap-3">
                                  <p className="display text-[1.0625rem] leading-snug text-ink">{item.nome}</p>
                                  <button
                                    type="button"
                                    onClick={() => remover(id)}
                                    className="cursor-pointer text-[0.8125rem] text-mute underline decoration-line underline-offset-4 transition-colors hover:text-roxo"
                                  >
                                    Remover
                                  </button>
                                </div>
                                <p className="text-[0.8125rem] text-mute">
                                  {brl(preco)} por kit
                                  {preco !== unitario[id] && <s className="ml-1.5">{brl(unitario[id])}</s>}
                                </p>
                                <div className="flex items-center justify-between gap-3">
                                  <Quantidade q={q} setQ={(f) => definir(id, f(q))} nome={item.nome} />
                                  <p className="display text-[1.125rem] text-ink tabular-nums">{brl(preco * q)}</p>
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </div>

                <footer className="border-t border-line px-6 pt-4 pb-6">
                  {economia > 0 && (
                    <p className="flex justify-between text-[0.875rem] text-ciano-700">
                      <span>Desconto por quantidade</span>
                      <span className="tabular-nums">− {brl(economia)}</span>
                    </p>
                  )}
                  <p className="mt-1 flex items-baseline justify-between">
                    <span className="text-[0.9375rem] text-mute">Total</span>
                    <span className="display text-[1.75rem] text-ink tabular-nums">{brl(total)}</span>
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-mute">Pague em até 6x. O pagamento é combinado no WhatsApp.</p>
                  <a
                    href={`${links.whatsapp}?text=${encodeURIComponent(mensagem(itens, total))}`}
                    target="_blank"
                    rel="noopener"
                    className="group/fim relative mt-4 flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#25d366] text-[1.0625rem] font-medium text-white"
                  >
                    <span aria-hidden className="absolute inset-0 translate-y-[101%] bg-ink transition-transform duration-500 ease-out-expo group-hover/fim:translate-y-0" />
                    <WhatsApp size={20} className="relative" />
                    <span className="relative">Finalizar pelo WhatsApp</span>
                  </a>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

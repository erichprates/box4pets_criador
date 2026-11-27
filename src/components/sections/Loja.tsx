"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  coleta,
  comparativo,
  complementares,
  links,
  painelDestaques,
  passos,
  planos,
  selos,
  testes,
  type Teste,
} from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Pagamento } from "../ui/Button";
import { Caixa } from "../ui/Caixa";
import { Check, Icon } from "../ui/icons";

/** Preco unitario do Painel Saude conforme a quantidade (acima de 3 e acima de 10 kits). */
const precoPainel = (q: number) => (q > 10 ? 489 : q > 3 ? 529 : 619);
const unitario: Record<string, number> = { painel: 619, merle: 450, avulsos: 450, perfil: 489 };
const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;

/**
 * Quantidade, preco e link de compra de um produto. Nos testes avulsos cada unidade e um
 * teste diferente (R$ 450 cada), entao o botao abre a conversa para escolher quais.
 */
function useCompra(item: Teste) {
  const [q, setQ] = useState(1);
  const base = unitario[item.id];
  const preco = item.id === "painel" ? precoPainel(q) : base;
  const desconto = item.id === "painel" && preco !== 619;
  const consulta = item.id === "avulsos";
  const href = consulta
    ? `${links.whatsapp}?text=${encodeURIComponent(`Olá! Procuro ${q > 1 ? `${q} testes que não estão` : "um teste que não está"} no Painel Saúde. Podem me ajudar?`)}`
    : `${links.whatsapp}?text=${encodeURIComponent(`Olá! Vim pelo site e quero pedir ${q} ${q > 1 ? "kits" : "kit"} de ${item.nome}.`)}`;
  const unidade = consulta ? "teste" : "kit";
  return { q, setQ, preco, desconto, href, consulta, unidade };
}

/** Seta do botao de compra. */
function Seta({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`size-4 shrink-0 ${className}`}>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Contador de quantidade (mesmo do Aquamundo): o numero rola para cima ou para baixo ao mudar. */
function Quantidade({
  q,
  setQ,
  nome,
  grande = false,
  fundo = "bg-paper",
}: {
  q: number;
  setQ: (f: (v: number) => number) => void;
  nome: string;
  grande?: boolean;
  fundo?: string;
}) {
  const [dir, setDir] = useState(1);
  const passo = (d: number) => {
    setDir(d);
    setQ((v) => Math.min(99, Math.max(1, v + d)));
  };
  const lado = grande ? "w-12" : "w-9";
  return (
    <div className={`flex ${grande ? "h-14" : "h-12"} shrink-0 items-center rounded-xl ${fundo}`} role="group" aria-label={`Quantidade de ${nome}`}>
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => passo(-1)}
        disabled={q <= 1}
        className={`grid h-full ${lado} cursor-pointer place-items-center text-xl text-ink transition-opacity hover:opacity-50 disabled:cursor-default disabled:opacity-25`}
      >
        −
      </button>
      <span aria-live="polite" data-q className="relative grid h-full w-6 place-items-center overflow-hidden text-[1rem] font-semibold tabular-nums">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.span
            key={q}
            custom={dir}
            variants={{
              entra: (d: number) => ({ y: 18 * d, opacity: 0 }),
              fica: { y: 0, opacity: 1 },
              sai: (d: number) => ({ y: -18 * d, opacity: 0 }),
            }}
            initial="entra"
            animate="fica"
            exit="sai"
            transition={{ duration: 0.25 }}
          >
            {q}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => passo(1)}
        className={`grid h-full ${lado} cursor-pointer place-items-center text-xl text-ink transition-opacity hover:opacity-50`}
      >
        +
      </button>
    </div>
  );
}

/**
 * Botao de compra (mesmo do Aquamundo): no hover uma cor sobe por dentro e a seta sai e
 * reentra; no clique ele encolhe de leve, abre o WhatsApp e mostra a confirmacao por cima.
 */
function BotaoComprar({
  href,
  rotulo,
  total,
  grande = false,
}: {
  href: string;
  rotulo: string;
  /** Valor exibido ao lado do rotulo (ex: "R$ 1.238"). */
  total?: string;
  grande?: boolean;
}) {
  const [ok, setOk] = useState(false);
  const reduced = useReducedMotion();
  const clicar = () => {
    window.open(href, "_blank", "noopener");
    setOk(true);
    window.setTimeout(() => setOk(false), 2400);
  };
  return (
    <motion.button
      type="button"
      onClick={clicar}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className={`group/buy relative min-w-0 flex-1 cursor-pointer overflow-hidden rounded-xl bg-roxo font-medium tracking-[-0.01em] text-white ${
        grande ? "h-14 text-[1.0625rem]" : "h-12 min-w-[104px] text-[0.9375rem]"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-[101%] bg-ink transition-transform duration-500 ease-out-expo group-hover/buy:translate-y-0"
      />
      <AnimatePresence mode="wait" initial={false}>
        {ok ? (
          <motion.span
            key="ok"
            className="absolute inset-0 flex items-center justify-center gap-2.5 bg-[#25d366] px-3 text-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: ease.out }}
          >
            <svg viewBox="0 0 20 20" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <motion.path
                d="m4 10.5 4 4 8-9"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.25 }}
              />
            </svg>
            <span className="truncate">{grande ? "Abrindo o WhatsApp" : "WhatsApp"}</span>
          </motion.span>
        ) : (
          <motion.span
            key="comprar"
            className={`relative flex items-center justify-center gap-2.5 ${grande ? "px-3" : "px-1.5"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className={grande ? "truncate" : "whitespace-nowrap"}>
              {rotulo}
              {total && <span className="opacity-70"> · {total}</span>}
            </span>
            {grande && (
              <span className="relative block size-4 shrink-0 overflow-hidden">
                <Seta className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover/buy:translate-x-[110%]" />
                <Seta className="absolute inset-0 -translate-x-[110%] transition-transform duration-500 ease-out-expo group-hover/buy:translate-x-0" />
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/** Etiqueta "Recomendado" presa no topo do card, com estrela. */
function SeloRecomendado() {
  return (
    <span className="absolute -top-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-roxo py-1.5 pr-4 pl-3 text-[0.8125rem] font-semibold whitespace-nowrap text-white shadow-[0_10px_24px_rgb(63_47_128/0.4)]">
      <svg viewBox="0 0 20 20" className="size-4 text-ciano-200" fill="currentColor" aria-hidden>
        <path d="m10 1.8 2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.8Z" />
      </svg>
      Recomendado
    </span>
  );
}

/** Classes do card: o recomendado ganha contorno, brilho e um leve degrade. */
const cartao = (rec?: boolean) =>
  rec
    ? "relative bg-gradient-to-b from-lilas to-white ring-2 ring-roxo shadow-[0_30px_70px_rgb(63_47_128/0.28)] lg:-translate-y-3"
    : "relative border border-line bg-white";

/** Produto da vitrine: foto, selos, nome, preco, quantidade e compra pelo WhatsApp. */
export function Produto({ item }: { item: Teste }) {
  const { q, setQ, preco, desconto, href, consulta, unidade } = useCompra(item);
  const pagina = `/testes/${item.id}`;
  return (
    <motion.article
      className={`group flex min-w-0 flex-col rounded-card p-2.5 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.2)] ${cartao(item.recomendado)}`}
      variants={{
        hidden: { opacity: 0, y: 60 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
      }}
    >
      {item.recomendado && <SeloRecomendado />}
      <Link href={pagina} aria-label={`Ver ${item.nome}`} className="relative block aspect-[4/3.4] overflow-hidden rounded-[14px] bg-paper">
        <Caixa id={item.id} nome={item.nome} className="absolute inset-0" />
        <span className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink backdrop-blur">
            {item.especies}
          </span>
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3.5 pt-4">
        <h3 className="display text-[1.3125rem] leading-snug text-ink">
          <Link href={pagina} className="transition-colors hover:text-roxo">
            {item.nome}
          </Link>
        </h3>
        <p className="text-[0.875rem] leading-[1.5] text-mute">{item.texto}</p>

        <div className="mt-auto pt-4">
          <p className="display flex flex-wrap items-baseline gap-x-2 text-[1.875rem] leading-none text-ink">
            {brl(preco)}
            {desconto && <s className="font-sans text-[0.9375rem] font-normal text-mute">R$ 619</s>}
            <span className="font-sans text-[0.875rem] font-normal text-mute">/{unidade}</span>
          </p>
          <p className="mt-1.5 min-h-[1.25rem] text-[0.8125rem] text-ciano-700">
            {item.id === "painel"
              ? desconto
                ? `total ${brl(preco * q)}`
                : "em até 6x sem juros · frete grátis"
              : q > 1
                ? `total ${brl(preco * q)}`
                : consulta
                  ? "cada teste fora do Painel Saúde"
                  : ""}
          </p>
        </div>

        {/* Se o card for estreito demais, o botao desce para a linha de baixo em vez de cortar. */}
        <div className="mt-2 flex flex-wrap gap-2">
          <Quantidade q={q} setQ={setQ} nome={item.nome} />
          <BotaoComprar
            href={href}
            rotulo={consulta ? "Consultar" : "Comprar"}
          />
        </div>
        <Link
          href={pagina}
          className="mt-1 inline-flex min-h-9 items-center justify-center text-[0.875rem] font-medium text-roxo underline decoration-roxo/30 underline-offset-4 hover:decoration-roxo"
        >
          Saiba mais
        </Link>
      </div>
    </motion.article>
  );
}

/** Grade de produtos (vitrine da home e "Recomendados" da pagina de produto). */
export function Vitrine({ itens }: { itens: Teste[] }) {
  return (
    <motion.div
      className={`grid gap-x-5 gap-y-8 pt-6 sm:grid-cols-2 ${itens.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ staggerChildren: 0.1 }}
    >
      {itens.map((item) => (
        <Produto key={item.id} item={item} />
      ))}
    </motion.div>
  );
}

/** Pagina de produto, em formato de loja. */
export function PaginaProduto({ id }: { id: string }) {
  const item = testes.find((t) => t.id === id)!;
  const { q, setQ, preco, desconto, href, consulta, unidade } = useCompra(item);
  const [aba, setAba] = useState(0);
  const info = comparativo.find((c) => c.teste === item.nome)!;
  const longo = complementares.find((c) => c.id === id)?.texto;
  const painel = id === "painel";

  const abas = [
    {
      nome: "Descrição",
      corpo: (
        <div className="flex flex-col gap-5">
          <p className="text-[1.125rem] leading-[1.6] text-ink">
            {painel
              ? "O Painel Saúde avalia 220 doenças genéticas em cães e 39 doenças e variantes em gatos, incluindo as recomendadas para a raça do seu animal."
              : longo}
          </p>
          {painel && (
            <>
              <ul className="grid gap-3 sm:grid-cols-2">
                {painelDestaques.map((d) => (
                  <li key={d} className="flex items-center gap-3 rounded-2xl bg-paper p-4 text-[0.9375rem] font-medium text-ink">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-roxo text-white">
                      <Check size={14} strokeWidth={2.6} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-mute">
                O DNA do cão não muda ao longo da vida. Um único teste, feito ainda filhote ou antes da primeira
                cobertura, vale para toda a vida reprodutiva dele.
              </p>
            </>
          )}
        </div>
      ),
    },
    {
      nome: "Como funciona",
      corpo: (
        <div className="grid gap-10 lg:grid-cols-2">
          <ol className="flex flex-col">
            {passos.map((p, n) => (
              <li key={p.titulo} className="flex gap-4 border-t border-line py-4 first:border-0">
                <span className="display grid size-9 shrink-0 place-items-center rounded-full bg-roxo text-[0.9375rem] text-white">{n + 1}</span>
                <span>
                  <strong className="display block text-[1.0625rem] text-ink">{p.titulo}</strong>
                  <span className="mt-1 block text-[0.9375rem] text-mute">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
          <div>
            <p className="display text-[1.25rem] text-ink">Coleta</p>
            <ul className="mt-3 flex flex-col gap-3 text-[0.9375rem] text-mute">
              {coleta.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lilas text-roxo">
                    <Check size={12} strokeWidth={2.6} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl bg-lilas p-5 text-[0.9375rem] text-ink">
              <strong className="font-semibold">Garantia de recoleta:</strong> se a amostra não tiver DNA suficiente,
              enviamos um novo kit sem custo.
            </p>
          </div>
        </div>
      ),
    },
    {
      nome: "Informações",
      corpo: (
        <dl className="flex flex-col">
          {[
            ["O que avalia", info.avalia],
            ["Espécies", info.especies],
            ["Quem realiza", info.realiza],
            ["Preço", `${info.preco}${info.nota ? ` (${info.nota})` : ""}`],
            ["Resultado", "Em 6 semanas, no app e em PDF"],
            ["Suporte", "Veterinário, por WhatsApp"],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 border-t border-line py-4 first:border-0 sm:grid-cols-[200px_1fr] sm:gap-6">
              <dt className="font-semibold text-ink">{k}</dt>
              <dd className="text-mute">{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },
  ];

  return (
    <>
      <section className="pt-[104px] pb-16 md:pt-[124px] md:pb-24">
        <div className="container-page">
          <nav aria-label="Você está em" className="flex flex-wrap items-center gap-2 text-[0.875rem] text-mute">
            <Link href="/" className="hover:text-roxo">
              Início
            </Link>
            <span aria-hidden>/</span>
            <Link href="/testes" className="hover:text-roxo">
              Testes
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{item.nome}</span>
          </nav>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
            {/* Imagem do produto: so a embalagem 3D. */}
            <div className="flex flex-col gap-3 lg:sticky lg:top-24">
              <motion.div
                className="relative aspect-square overflow-hidden rounded-panel bg-paper"
                initial={{ clipPath: "inset(8% 8% 8% 8% round 28px)", opacity: 0 }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
                transition={{ duration: 1.2, ease: ease.out }}
              >
                <Caixa id={item.id} nome={item.nome} className="absolute inset-0" />
                {item.recomendado && (
                  <span className="absolute top-4 left-4 rounded-full bg-roxo px-3 py-1.5 text-[0.75rem] font-semibold text-white">Recomendado</span>
                )}
              </motion.div>
            </div>

            {/* Compra */}
            <div>
              <p className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.1em] text-roxo uppercase">
                <span className="grid size-8 place-items-center rounded-full bg-lilas">
                  <Icon name={item.icon} size={16} />
                </span>
                {item.especies}
              </p>
              <Words as="h1" eager className="display mt-4 text-[clamp(2.2rem,4.4vw,3.75rem)] text-ink" parts={[item.nome]} />
              <p className="mt-4 text-[1.0625rem] text-mute">{item.texto}</p>

              <div className="mt-7 rounded-panel bg-paper p-6 md:p-7">
                <p className="display flex flex-wrap items-baseline gap-x-3 text-[3rem] leading-none text-ink">
                  {brl(preco)}
                  {desconto && <s className="font-sans text-[1.125rem] font-normal text-mute">R$ 619</s>}
                  <span className="font-sans text-[1rem] font-normal text-mute">/{unidade}</span>
                </p>
                {q > 1 && <p className="mt-2 text-[0.9375rem] font-semibold text-ink">Total {brl(preco * q)}</p>}
                <Pagamento className="mt-4" parcelas={painel ? "pague em até 6x sem juros · frete grátis" : "pague em até 6x"} />

                {painel && (
                  <ul className="mt-5 grid grid-cols-3 gap-2 text-center text-[0.8125rem]">
                    {planos.map((p, n) => {
                      const on = (n === 0 && q <= 3) || (n === 1 && q > 3 && q <= 10) || (n === 2 && q > 10);
                      return (
                        <li
                          key={p.faixa}
                          className={`rounded-xl border px-2 py-2.5 transition-colors duration-300 ${
                            on ? "border-roxo bg-white text-ink" : "border-line text-mute"
                          }`}
                        >
                          <span className="block">{p.faixa}</span>
                          <strong className="display mt-0.5 block text-[1.0625rem] text-ink">{p.preco}</strong>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="mt-5 flex gap-2">
                  <Quantidade q={q} setQ={setQ} nome={item.nome} grande fundo="bg-white" />
                  <BotaoComprar
                    href={href}
                    rotulo={consulta ? "Consultar" : "Comprar"}
                    total={brl(preco * q)}
                    grande
                  />
                </div>
                <a
                  href={links.contato}
                  target="_blank"
                  rel="noopener"
                  className="mt-2 flex h-12 items-center justify-center rounded-xl border border-line bg-white text-[0.9375rem] font-medium text-ink transition-colors hover:border-roxo/40"
                >
                  Entre em contato
                </a>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {selos.map((s) => (
                  <li key={s.texto} className="flex items-center gap-3 text-[0.875rem] text-ink">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lilas text-roxo">
                      <Icon name={s.icon} size={18} />
                    </span>
                    {s.texto}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Descricoes em abas: todas ficam no HTML, uma aparece por vez. */}
      <section className="panel bg-paper py-16 md:py-24">
        <div className="container-page">
          <div role="tablist" aria-label="Detalhes do produto" className="grid grid-cols-3 gap-2 md:flex md:gap-1">
            {abas.map((a, n) => {
              const on = n === aba;
              return (
                <button
                  key={a.nome}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setAba(n)}
                  className={`relative min-h-12 cursor-pointer rounded-2xl px-3 text-[0.875rem] font-medium transition-colors duration-300 md:rounded-full md:px-6 md:text-[1rem] ${
                    on ? "text-white" : "border border-line bg-white text-ink md:border-0 md:bg-transparent md:text-mute md:hover:text-ink"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="produto-aba"
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-ink md:rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{a.nome}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 rounded-panel bg-white p-6 md:p-10">
            {abas.map((a, n) => (
              <motion.div
                key={a.nome}
                role="tabpanel"
                aria-label={a.nome}
                hidden={n !== aba}
                initial={false}
                animate={n === aba ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: n === aba ? 0.45 : 0, ease: ease.out }}
              >
                {a.corpo}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page">
          <FadeUp>
            <h2 className="display mb-10 text-display text-ink">Recomendados</h2>
          </FadeUp>
          <Vitrine itens={testes.filter((t) => t.id !== id)} />
        </div>
      </section>
    </>
  );
}

/** Linha de compra reaproveitada: preco com unidade, pagamento, quantidade e botao. */
function Compra({ item, tamanho = "md" }: { item: Teste; tamanho?: "md" | "lg" }) {
  const { q, setQ, preco, desconto, href, consulta, unidade } = useCompra(item);
  return (
    <div>
      <p className={`display flex flex-wrap items-baseline gap-x-3 leading-none text-ink ${tamanho === "lg" ? "text-[3rem]" : "text-[2.25rem]"}`}>
        {brl(preco)}
        {desconto && <s className="font-sans text-[1.0625rem] font-normal text-mute">R$ 619</s>}
        <span className="font-sans text-[1rem] font-normal text-mute">/{unidade}</span>
      </p>
      {q > 1 && <p className="mt-2 text-[0.9375rem] font-semibold text-ink">Total {brl(preco * q)}</p>}
      <Pagamento className="mt-4" parcelas={item.id === "painel" ? "pague em até 6x sem juros · frete grátis" : "pague em até 6x"} />
      {item.id === "painel" && (
        <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.8125rem]">
          {planos.map((p, n) => {
            const on = (n === 0 && q <= 3) || (n === 1 && q > 3 && q <= 10) || (n === 2 && q > 10);
            return (
              <li
                key={p.faixa}
                className={`rounded-xl border px-2 py-2.5 transition-colors duration-300 ${on ? "border-roxo bg-white text-ink" : "border-line text-mute"}`}
              >
                <span className="block">{p.faixa}</span>
                <strong className="display mt-0.5 block text-[1.0625rem] text-ink">{p.preco}</strong>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-4 flex gap-2">
        <Quantidade q={q} setQ={setQ} nome={item.nome} grande fundo="bg-white" />
        <BotaoComprar
          href={href}
          rotulo={consulta ? "Consultar" : "Comprar"}
          total={brl(preco * q)}
          grande
        />
      </div>
    </div>
  );
}

/**
 * Bloco de produto da pagina Testes: a caixa 3D de um lado e, do outro, descricao, preco,
 * quantidade e compra. `invertido` troca os lados.
 */
export function BlocoProduto({ id, invertido = false, destaque = false }: { id: string; invertido?: boolean; destaque?: boolean }) {
  const item = testes.find((t) => t.id === id)!;
  const longo =
    id === "painel"
      ? "O Painel Saúde avalia 220 doenças genéticas em cães e 39 doenças e variantes em gatos, incluindo as recomendadas para a raça do seu animal."
      : complementares.find((c) => c.id === id)!.texto;
  return (
    <FadeUp>
      <article id={id} className="grid scroll-mt-28 items-stretch gap-2.5 rounded-panel bg-white p-2.5 lg:grid-cols-2">
        <Link
          href={`/testes/${id}`}
          aria-label={`Ver ${item.nome}`}
          className={`relative block min-h-[320px] overflow-hidden rounded-[20px] lg:min-h-[520px] ${invertido ? "lg:order-2" : ""}`}
        >
          <Caixa id={id} nome={item.nome} className="absolute inset-0" />
          <span className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {item.recomendado && (
              <span className="rounded-full bg-roxo px-3 py-1.5 text-[0.75rem] font-semibold text-white">Recomendado</span>
            )}
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.75rem] font-semibold text-ink backdrop-blur">{item.especies}</span>
          </span>
        </Link>
        <div className="flex flex-col gap-5 p-5 md:p-9">
          <div>
            {destaque && <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-roxo uppercase">Produto principal</p>}
            <h3 className={`display mt-2 text-ink ${destaque ? "text-display" : "text-title"}`}>{item.nome}</h3>
          </div>
          <p className="text-mute">{longo}</p>
          {id === "painel" && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {painelDestaques.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-ink">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-roxo text-white">
                    <Check size={13} strokeWidth={2.6} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto rounded-[20px] bg-paper p-5 md:p-6">
            <Compra item={item} tamanho={destaque ? "lg" : "md"} />
          </div>
          <Link
            href={`/testes/${id}`}
            className="inline-flex min-h-9 w-fit items-center text-[0.9375rem] font-medium text-roxo underline decoration-roxo/30 underline-offset-4 hover:decoration-roxo"
          >
            Ver página do produto →
          </Link>
        </div>
      </article>
    </FadeUp>
  );
}

/**
 * As opcoes lado a lado, em linhas: uma por produto, com a caixa em miniatura, o que avalia,
 * especies, quem realiza, preco e o atalho para o produto. No celular cada linha vira um cartao.
 */
export function ComparativoLinhas() {
  const colunas = "lg:grid-cols-[76px_1fr_2fr_0.8fr_1.1fr_0.9fr_auto]";
  const rotulo = "text-[0.6875rem] font-semibold tracking-[0.08em] text-roxo uppercase lg:hidden";
  return (
    <div className="flex flex-col gap-3">
      <div className={`hidden items-center gap-5 px-3 text-[0.75rem] font-semibold tracking-[0.08em] text-mute uppercase lg:grid ${colunas}`}>
        <span />
        <span>Teste</span>
        <span>O que avalia</span>
        <span>Espécies</span>
        <span>Quem realiza</span>
        <span>Preço</span>
        <span className="w-[124px]" />
      </div>
      <motion.ul
        className="flex flex-col gap-3"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={{ staggerChildren: 0.09 }}
      >
        {testes.map((item) => {
          const info = comparativo.find((c) => c.teste === item.nome)!;
          const rec = !!item.recomendado;
          return (
            <motion.li
              key={item.id}
              className={`group grid items-center gap-x-5 gap-y-3 rounded-card p-3 transition-shadow duration-500 hover:shadow-[0_24px_50px_rgb(63_47_128/0.14)] max-lg:grid-cols-[76px_1fr] ${colunas} ${
                rec ? "bg-gradient-to-r from-lilas to-white ring-2 ring-roxo" : "border border-line bg-white"
              }`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
              }}
            >
              <Link
                href={`/testes/${item.id}`}
                aria-label={`Ver ${item.nome}`}
                className="relative block aspect-square w-[76px] overflow-hidden rounded-xl transition-transform duration-500 ease-out-expo group-hover:scale-105"
              >
                <Caixa id={item.id} nome={item.nome} className="pointer-events-none absolute inset-0" />
              </Link>
              <div>
                <p className="display text-[1.1875rem] leading-snug text-ink">{item.nome}</p>
                {rec && (
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-roxo py-0.5 pr-2.5 pl-2 text-[0.6875rem] font-semibold text-white">
                    <svg viewBox="0 0 20 20" className="size-3 text-ciano-200" fill="currentColor" aria-hidden>
                      <path d="m10 1.8 2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.8Z" />
                    </svg>
                    Recomendado
                  </span>
                )}
              </div>
              <div className="max-lg:col-span-2">
                <p className={rotulo}>O que avalia</p>
                <p className="text-[0.9375rem] text-mute">{info.avalia}</p>
              </div>
              <div>
                <p className={rotulo}>Espécies</p>
                <p className="text-[0.9375rem] text-ink">{info.especies}</p>
              </div>
              <div>
                <p className={rotulo}>Quem realiza</p>
                <p className="text-[0.9375rem] text-ink">{info.realiza}</p>
              </div>
              <div className="max-lg:col-span-2 max-lg:border-t max-lg:border-line max-lg:pt-3">
                <p className="display flex flex-wrap items-baseline gap-x-1.5 text-[1.5rem] leading-none text-ink">
                  {info.preco}
                  <span className="font-sans text-[0.8125rem] font-normal text-mute">/{item.id === "avulsos" ? "teste" : "kit"}</span>
                </p>
                {info.nota && info.nota !== "por teste" && <p className="mt-1 text-[0.75rem] text-ciano-700">{info.nota}</p>}
              </div>
              <Link
                href={`/testes/${item.id}`}
                className="group/ver relative flex h-12 w-[124px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-roxo text-[0.9375rem] font-medium text-white max-lg:col-span-2 max-lg:w-full"
              >
                <span aria-hidden className="absolute inset-0 translate-y-[101%] bg-ink transition-transform duration-500 ease-out-expo group-hover/ver:translate-y-0" />
                <span className="relative">Ver produto</span>
                <span className="relative block size-4 overflow-hidden">
                  <Seta className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover/ver:translate-x-[110%]" />
                  <Seta className="absolute inset-0 -translate-x-[110%] transition-transform duration-500 ease-out-expo group-hover/ver:translate-x-0" />
                </span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

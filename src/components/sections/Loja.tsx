"use client";

import { motion } from "framer-motion";
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

function Quantidade({ q, setQ, nome, grande = false }: { q: number; setQ: (f: (v: number) => number) => void; nome: string; grande?: boolean }) {
  const h = grande ? "h-14" : "h-12";
  return (
    <div className={`flex ${h} shrink-0 items-center rounded-xl border border-line bg-white`} role="group" aria-label={`Quantidade de ${nome}`}>
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => setQ((v) => Math.max(1, v - 1))}
        disabled={q <= 1}
        className={`grid h-full ${grande ? "w-12" : "w-10"} cursor-pointer place-items-center text-[1.125rem] text-ink transition-colors hover:text-roxo disabled:opacity-30`}
      >
        −
      </button>
      <span aria-live="polite" className="w-7 text-center text-[0.9375rem] font-semibold tabular-nums">
        {q}
      </span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => setQ((v) => Math.min(99, v + 1))}
        className={`grid h-full ${grande ? "w-12" : "w-10"} cursor-pointer place-items-center text-[1.125rem] text-ink transition-colors hover:text-roxo`}
      >
        +
      </button>
    </div>
  );
}

/** Produto da vitrine: foto, selos, nome, preco, quantidade e compra pelo WhatsApp. */
export function Produto({ item }: { item: Teste }) {
  const { q, setQ, preco, desconto, href, consulta, unidade } = useCompra(item);
  const pagina = `/testes/${item.id}`;
  return (
    <motion.article
      className={`group flex min-w-0 flex-col rounded-card bg-white p-2.5 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.16)] ${
        item.recomendado ? "ring-2 ring-roxo" : "border border-line"
      }`}
      variants={{
        hidden: { opacity: 0, y: 60 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
      }}
    >
      <Link href={pagina} aria-label={`Ver ${item.nome}`} className="relative block aspect-[4/3.4] overflow-hidden rounded-[14px] bg-paper">
        <Caixa id={item.id} nome={item.nome} className="absolute inset-0" />
        <span className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.recomendado && (
            <span className="rounded-full bg-roxo px-2.5 py-1 text-[0.6875rem] font-semibold text-white">Recomendado</span>
          )}
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

        <div className="mt-2 flex gap-2">
          <Quantidade q={q} setQ={setQ} nome={item.nome} />
          <a
            href={href}
            target="_blank"
            rel="noopener"
            className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-roxo px-3 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-roxo-700"
          >
            {consulta ? "Consultar" : "Comprar"}
          </a>
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
      className={`grid gap-5 sm:grid-cols-2 ${itens.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
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
                <Pagamento className="mt-4" parcelas={painel ? "em até 6x sem juros · frete grátis" : "em até 6x"} />

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
                  <Quantidade q={q} setQ={setQ} nome={item.nome} grande />
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="flex h-14 min-w-0 flex-1 items-center justify-center rounded-xl bg-roxo px-4 text-[1rem] font-medium text-white transition-colors duration-300 hover:bg-roxo-700"
                  >
                    {consulta ? "Consultar" : "Comprar"}
                    <span className="max-sm:hidden">&nbsp;pelo WhatsApp</span>
                  </a>
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
      <Pagamento className="mt-4" parcelas={item.id === "painel" ? "em até 6x sem juros · frete grátis" : "em até 6x"} />
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
        <Quantidade q={q} setQ={setQ} nome={item.nome} grande />
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="flex h-14 min-w-0 flex-1 items-center justify-center rounded-xl bg-roxo px-4 text-[1rem] font-medium text-white transition-colors duration-300 hover:bg-roxo-700"
        >
          {consulta ? "Consultar" : "Comprar"}
          <span className="max-sm:hidden">&nbsp;pelo WhatsApp</span>
        </a>
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

/** As opcoes lado a lado, como comparador de loja: uma coluna por produto, com a caixa em cima. */
export function ComparativoLoja() {
  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ staggerChildren: 0.1 }}
    >
      {testes.map((item) => {
        const info = comparativo.find((c) => c.teste === item.nome)!;
        return (
          <motion.article
            key={item.id}
            className={`group flex min-w-0 flex-col rounded-card bg-white p-2.5 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.16)] ${
              item.recomendado ? "ring-2 ring-roxo" : "border border-line"
            }`}
            variants={{
              hidden: { opacity: 0, y: 60 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
            }}
          >
            <Link href={`/testes/${item.id}`} aria-label={`Ver ${item.nome}`} className="relative block aspect-[4/3.4] overflow-hidden rounded-[14px]">
              <Caixa id={item.id} nome={item.nome} className="absolute inset-0" />
              {item.recomendado && (
                <span className="absolute top-3 left-3 rounded-full bg-roxo px-2.5 py-1 text-[0.6875rem] font-semibold text-white">Recomendado</span>
              )}
            </Link>
            <div className="flex flex-1 flex-col p-3.5 pt-4">
              <h3 className="display text-[1.3125rem] leading-snug text-ink">{item.nome}</h3>
              <dl className="mt-3 flex flex-1 flex-col text-[0.875rem]">
                {[
                  ["O que avalia", info.avalia],
                  ["Espécies", info.especies],
                  ["Quem realiza", info.realiza],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-line py-3">
                    <dt className="text-[0.75rem] font-semibold tracking-[0.06em] text-roxo uppercase">{k}</dt>
                    <dd className="mt-1 text-mute">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="display mt-2 flex flex-wrap items-baseline gap-x-2 border-t border-line pt-4 text-[1.875rem] leading-none text-ink">
                {info.preco}
                <span className="font-sans text-[0.875rem] font-normal text-mute">/{item.id === "avulsos" ? "teste" : "kit"}</span>
              </p>
              <p className="mt-1.5 min-h-[1.25rem] text-[0.8125rem] text-ciano-700">{info.nota === "por teste" ? "" : info.nota}</p>
              <Link
                href={`/testes/${item.id}`}
                className="mt-3 flex h-12 items-center justify-center rounded-xl bg-roxo text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-roxo-700"
              >
                Ver produto
              </Link>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

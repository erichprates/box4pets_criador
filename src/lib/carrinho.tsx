"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/** Preco unitario do Painel Saude conforme a quantidade (acima de 3 e acima de 10 kits). */
export const precoPainel = (q: number) => (q > 10 ? 489 : q > 3 ? 529 : 619);
export const unitario: Record<string, number> = { painel: 619, merle: 450, avulsos: 450, perfil: 489 };
export const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;
/** Preco de uma unidade do produto para uma dada quantidade. */
export const precoDe = (id: string, q: number) => (id === "painel" ? precoPainel(q) : unitario[id]);

/** Produtos que entram no carrinho. Testes avulsos ficam de fora: dependem de consulta. */
export const noCarrinho = ["painel", "merle", "perfil"];

type Itens = Record<string, number>;

type Carrinho = {
  itens: Itens;
  /** Soma das quantidades. */
  unidades: number;
  total: number;
  /** Quanto o desconto por quantidade do Painel Saude ja tirou do total. */
  economia: number;
  aberto: boolean;
  abrir: () => void;
  fechar: () => void;
  adicionar: (id: string, q: number) => void;
  definir: (id: string, q: number) => void;
  remover: (id: string) => void;
};

const Contexto = createContext<Carrinho | null>(null);
const CHAVE = "box4pets-criador-carrinho";

/** Carrinho do site: guarda os itens no navegador e fecha o pedido pelo WhatsApp. */
export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<Itens>({});
  const [aberto, setAberto] = useState(false);
  const [lido, setLido] = useState(false);

  // Le o carrinho salvo so depois de montar, para o HTML do servidor e o do navegador baterem.
  useEffect(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? "{}") as Itens;
      const limpo: Itens = {};
      for (const id of noCarrinho) {
        const q = Math.floor(Number(salvo[id]));
        if (q >= 1) limpo[id] = Math.min(99, q);
      }
      setItens(limpo);
    } catch {
      /* carrinho salvo invalido: comeca vazio */
    }
    setLido(true);
  }, []);

  useEffect(() => {
    if (!lido) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(itens));
    } catch {
      /* navegador sem armazenamento: o carrinho vale so nesta visita */
    }
  }, [itens, lido]);

  const adicionar = useCallback((id: string, q: number) => {
    setItens((v) => ({ ...v, [id]: Math.min(99, (v[id] ?? 0) + q) }));
  }, []);
  const definir = useCallback((id: string, q: number) => {
    setItens((v) => ({ ...v, [id]: Math.min(99, Math.max(1, q)) }));
  }, []);
  const remover = useCallback((id: string) => {
    setItens((v) => {
      const novo = { ...v };
      delete novo[id];
      return novo;
    });
  }, []);
  const abrir = useCallback(() => setAberto(true), []);
  const fechar = useCallback(() => setAberto(false), []);

  const valor = useMemo<Carrinho>(() => {
    const ids = Object.keys(itens);
    const unidades = ids.reduce((s, id) => s + itens[id], 0);
    const total = ids.reduce((s, id) => s + precoDe(id, itens[id]) * itens[id], 0);
    const cheio = ids.reduce((s, id) => s + unitario[id] * itens[id], 0);
    return { itens, unidades, total, economia: cheio - total, aberto, abrir, fechar, adicionar, definir, remover };
  }, [itens, aberto, abrir, fechar, adicionar, definir, remover]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useCarrinho() {
  const c = useContext(Contexto);
  if (!c) throw new Error("useCarrinho fora do CarrinhoProvider");
  return c;
}

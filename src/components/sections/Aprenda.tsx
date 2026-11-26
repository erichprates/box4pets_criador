"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  combinacoes,
  coresEsperadas,
  cuidados,
  genesCor,
  guiaFaq,
  guiaIndice,
  guiaLaudo,
  herancas,
  links,
  orientacoes,
  pigmentos,
} from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Lista, Sanfona, Tabela } from "../ui/Blocos";
import { SplitButton } from "../ui/Button";

/** Um capitulo do guia: numero, titulo animado e conteudo. */
function Capitulo({ id, n, titulo, children }: { id: string; n: number; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-12 first:border-0 first:pt-0 md:pt-16">
      <p className="text-[0.8125rem] font-semibold text-roxo/60 tabular-nums">/0{n}</p>
      <Words className="display mt-2 text-[clamp(1.6rem,2.6vw,2.4rem)] text-ink" parts={[titulo]} />
      <div className="mt-6 flex flex-col gap-6">{children}</div>
    </section>
  );
}

const lead = "text-[1.1875rem] leading-[1.5] text-ink md:text-[1.3125rem]";
const nota = "rounded-2xl bg-paper p-5 text-[0.9375rem] text-mute";

/** Abas simples: opcoes em botoes, um texto por vez (todos no HTML, mesma celula). */
function Abas({ itens, rotulo }: { itens: readonly { aba: string; texto?: string; itens?: readonly string[] }[]; rotulo: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="rounded-panel bg-paper p-3">
      <div role="tablist" aria-label={rotulo} className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-1">
        {itens.map((t, n) => {
          const on = n === i;
          return (
            <button
              key={t.aba}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setI(n)}
              className={`relative min-h-11 cursor-pointer rounded-2xl px-3 py-2 text-[0.8125rem] leading-tight font-medium transition-colors duration-300 md:rounded-full md:px-4 md:text-[0.9375rem] ${
                on
                  ? "text-white"
                  : "text-mute hover:text-ink max-md:border max-md:border-line max-md:bg-white max-md:text-ink"
              }`}
            >
              {on && (
                <motion.span
                  layoutId={`aba-${rotulo}`}
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-ink md:rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t.aba}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-3 grid rounded-[20px] bg-white p-6 md:p-9">
        {itens.map((t, n) => (
          <motion.div
            key={t.aba}
            aria-hidden={n !== i}
            className={`col-start-1 row-start-1 ${n === i ? "" : "pointer-events-none invisible"}`}
            initial={false}
            animate={n === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: n === i ? 0.45 : 0, ease: ease.out }}
          >
            {t.texto && <p className="text-[1.125rem] leading-snug text-ink md:text-[1.375rem]">{t.texto}</p>}
            {t.itens && (
              <ul className="flex flex-col">
                {t.itens.map((item, k) => (
                  <li key={item} className="flex gap-4 border-t border-line py-3.5 text-ink first:border-0">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-roxo text-[0.75rem] font-semibold text-white">
                      {k + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const corTom = { ok: "bg-[#dff5e8] text-[#0f6b3a]", atencao: "bg-[#fdf0d2] text-[#8a5a00]", evitar: "bg-[#fde3dc] text-[#9b2c14]" } as const;

/** Combinacoes de cruzamento: cada par com uma barra que divide a ninhada em normais, portadores e afetados. */
function Combinacoes() {
  const [i, setI] = useState(0);
  return (
    <div className="rounded-panel bg-paper p-3">
      <div role="tablist" aria-label="Pai × Mãe" className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {combinacoes.map((c, n) => {
          const on = n === i;
          return (
            <button
              key={c.par}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setI(n)}
              className={`relative min-h-12 cursor-pointer rounded-2xl px-3 py-2 text-[0.875rem] leading-tight font-medium transition-colors duration-300 ${
                on ? "text-white" : "border border-line bg-white text-ink"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="combinacao"
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{c.par}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-3 grid rounded-[20px] bg-white p-6 md:p-9">
        {combinacoes.map((c, n) => {
          const on = n === i;
          const partes = [
            { rotulo: "Normais", v: c.n, cor: "bg-[#19a35a]" },
            { rotulo: "Portadores", v: c.p, cor: "bg-[#e0a100]" },
            { rotulo: "Afetados", v: c.a, cor: "bg-[#d9482b]" },
          ];
          return (
            <div
              key={c.par}
              aria-hidden={!on}
              className={`col-start-1 row-start-1 transition-opacity duration-300 ${on ? "" : "pointer-events-none invisible opacity-0"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="display text-[1.375rem] text-ink md:text-[1.625rem]">{c.par}</p>
                <span className={`rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold ${corTom[c.tom]}`}>{c.rec}</span>
              </div>
              <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-paper">
                {partes.map((p) => (
                  <motion.span
                    key={p.rotulo}
                    className={`h-full ${p.cor}`}
                    initial={false}
                    animate={{ width: on ? `${p.v}%` : "0%" }}
                    transition={{ duration: on ? 1.1 : 0, ease: ease.out }}
                  />
                ))}
              </div>
              <dl className="mt-5 grid grid-cols-3 gap-3">
                {partes.map((p) => (
                  <div key={p.rotulo}>
                    <dt className="flex items-center gap-2 text-[0.8125rem] text-mute">
                      <span className={`size-2 rounded-full ${p.cor}`} />
                      {p.rotulo}
                    </dt>
                    <dd className="display mt-1 text-[2rem] leading-none text-ink">{p.v}%</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Indice lateral que marca o capitulo em leitura. */
function Indice() {
  const [ativo, setAtivo] = useState<string>(guiaIndice[0].href);
  useEffect(() => {
    const onScroll = () => {
      let now: string = guiaIndice[0].href;
      for (const item of guiaIndice) {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) now = item.href;
      }
      setAtivo(now);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav aria-label="Neste guia" className="rounded-panel bg-paper p-5 lg:sticky lg:top-28">
      <p className="px-2 text-[0.75rem] font-semibold tracking-[0.1em] text-roxo uppercase">Neste guia</p>
      <ol className="mt-3 flex flex-col gap-0.5">
        {guiaIndice.map((item, n) => {
          const on = ativo === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-2 text-[0.9375rem] transition-colors duration-300 ${
                  on ? "bg-white font-medium text-ink shadow-[0_2px_10px_rgb(27_18_61/0.06)]" : "text-mute hover:text-ink"
                }`}
              >
                <span className={`text-[0.75rem] tabular-nums ${on ? "text-roxo" : "text-mute/60"}`}>/0{n + 1}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
      <SplitButton href={links.duvida} size="sm" className="mt-4 w-full justify-between">
        Falar com um veterinário
      </SplitButton>
    </nav>
  );
}

/** Guia de Cruzamento e Genetica de Cores: indice fixo a esquerda e os sete capitulos. */
export function Guia() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
        <Indice />
        <div className="flex min-w-0 flex-col gap-12 md:gap-16">
          <Capitulo id="porque" n={1} titulo="Por que testar antes de cruzar">
            <FadeUp>
              <p className={lead}>
                Um cão portador de uma mutação não precisa sair da reprodução: com o teste genético, basta escolher o
                parceiro certo para que nenhum filhote nasça doente.
              </p>
            </FadeUp>
            <FadeUp>
              <p className="text-mute">
                A maioria das doenças genéticas caninas é silenciosa nos pais. Um cão portador é saudável, mas carrega
                uma cópia da mutação e pode transmiti-la a metade dos filhotes. O problema aparece quando dois
                portadores são cruzados sem saber, e parte da ninhada herda duas cópias.
              </p>
            </FadeUp>
            <FadeUp>
              <p className="text-mute">
                Com o resultado do Painel Saúde da Box4Pets em mãos, o criador consegue planejar cruzamentos seguros,
                preservar linhagens valiosas e prever as cores da ninhada.
              </p>
            </FadeUp>
          </Capitulo>

          <Capitulo id="laudo" n={2} titulo="Entendendo o resultado do laudo">
            <FadeUp>
              <p className={lead}>
                Cada cão tem duas cópias de cada gene, uma herdada do pai e outra da mãe. O laudo informa quantas
                dessas cópias carregam a variante testada.
              </p>
            </FadeUp>
            <Tabela colunas={guiaLaudo.colunas} linhas={guiaLaudo.linhas} />
            <Words as="h3" className="display mt-4 text-title text-ink" parts={["Os tipos de herança mudam a interpretação"]} />
            <Abas itens={herancas} rotulo="Tipos de herança" />
            <p className={nota}>
              Muitas variantes foram validadas apenas em raças específicas. Em caso de dúvida, nossa equipe veterinária
              interpreta o resultado considerando a raça.
            </p>
          </Capitulo>

          <Capitulo id="combinacoes" n={3} titulo="Combinações de cruzamento e o que esperar da ninhada">
            <FadeUp>
              <p className="rounded-2xl bg-roxo p-6 text-[1.125rem] leading-snug text-white md:p-8 md:text-[1.375rem]">
                Regra de ouro (doenças recessivas): pelo menos um dos pais deve ser Normal (N/N). Assim, nenhum filhote
                nasce afetado.
              </p>
            </FadeUp>
            <FadeUp>
              <Combinacoes />
            </FadeUp>
            <p className={nota}>
              Porcentagens são probabilidades por filhote, não proporções exatas da ninhada. Herança dominante:
              heterozigoto × Normal gera, em média, 50% de filhotes com risco. Ligada ao X: macho Normal × fêmea
              portadora gera cerca de 50% dos machos afetados e 50% das fêmeas portadoras.
            </p>
          </Capitulo>

          <Capitulo id="portadores" n={4} titulo="Orientações para cães portadores e afetados">
            <FadeUp>
              <p className={lead}>
                Retirar todos os portadores da reprodução costuma ser um erro: reduz a diversidade genética, o que pode
                fazer surgir outros problemas de saúde.
              </p>
            </FadeUp>
            <Abas itens={orientacoes} rotulo="Orientações" />
            <p className={nota}>
              <strong className="font-semibold text-ink">Várias variantes ao mesmo tempo:</strong> compare o laudo dos
              dois reprodutores, variante por variante. O cruzamento é seguro quando, para cada variante recessiva, pelo
              menos um dos dois é Normal.
            </p>
            <p className={nota}>
              <strong className="font-semibold text-ink">Prioridades:</strong> o teste genético é uma ferramenta entre
              outras. Exames clínicos (displasia, oftalmológico, cardiológico) continuam importantes.
            </p>
          </Capitulo>

          <Capitulo id="cores" n={5} titulo="Genética das cores: como a pelagem é formada">
            <FadeUp>
              <p className={lead}>
                A cor de um cão depende da combinação de vários genes que atuam em sequência. Alguns genes
                &quot;escondem&quot; o efeito de outros, e por isso dois cães da mesma cor podem produzir filhotes de
                cores inesperadas.
              </p>
            </FadeUp>
            <div className="grid gap-4 sm:grid-cols-2">
              {pigmentos.map((p, n) => (
                <FadeUp key={p.nome} delay={n * 0.1}>
                  <div className="h-full rounded-card border border-line bg-white p-6">
                    <span
                      className="block h-3 w-full rounded-full"
                      style={{
                        background: n
                          ? "linear-gradient(90deg,#f1e2c8,#d9a56a,#b5542a)"
                          : "linear-gradient(90deg,#1c1c1e,#5b3a29,#6c7480,#b3a096)",
                      }}
                    />
                    <h3 className="display mt-4 text-[1.25rem] text-ink">{p.nome}</h3>
                    <p className="mt-2 text-[0.9375rem] text-mute">{p.texto}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <Words as="h3" className="display mt-4 text-title text-ink" parts={["Ordem de leitura do laudo"]} />
            <motion.ol
              className="flex flex-col"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={{ staggerChildren: 0.07 }}
            >
              {genesCor.map((g, n) => (
                <motion.li
                  key={g.gene}
                  className="grid gap-1 border-t border-line py-4 first:border-0 sm:grid-cols-[40px_190px_1fr] sm:gap-4"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: ease.out } },
                  }}
                >
                  <span className="text-[0.8125rem] text-roxo/60 tabular-nums">/0{n + 1}</span>
                  <strong className="font-semibold text-ink">{g.gene}</strong>
                  <span className="text-[0.9375rem] text-mute">{g.texto}</span>
                </motion.li>
              ))}
            </motion.ol>
            <motion.div
              className="grid gap-3 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={{ staggerChildren: 0.06 }}
            >
              {coresEsperadas.map((c) => (
                <motion.div
                  key={c.combo}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
                  }}
                >
                  <span
                    aria-hidden
                    className="size-12 shrink-0 rounded-full ring-1 ring-ink/10"
                    style={{ background: c.hex }}
                  />
                  <span>
                    <span className="block font-semibold text-ink">{c.cor}</span>
                    <span className="mt-0.5 block font-mono text-[0.8125rem] text-mute">{c.combo}</span>
                  </span>
                </motion.div>
              ))}
            </motion.div>
            <p className={nota}>&quot;_&quot; indica que a segunda cópia pode ser qualquer alelo do mesmo gene.</p>
          </Capitulo>

          <Capitulo id="cuidados" n={6} titulo="Cruzamentos e cores: o que exige cuidado">
            <Tabela colunas={cuidados.colunas} linhas={cuidados.linhas} />
            <div data-dark className="rounded-panel bg-ink p-7 text-white md:p-10">
              <h3 className="display text-title text-ciano-200">Merle: atenção redobrada</h3>
              <p className="mt-4 text-white/85">
                O merle pode estar &quot;escondido&quot;: um cão ee não mostra o padrão no pelo, e o merle críptico (Mc)
                quase não altera a cor. Só o teste confirma.
              </p>
              <p className="mt-3 text-white/85">
                O Painel Saúde detecta a presença ou ausência da variante M. Para saber o subtipo (Mc, Ma, Ma+, M, Mh),
                oferecemos o Teste Merle detalhado em parceria com a Orivet.
              </p>
              <Link
                href="/testes/merle"
                className="mt-5 inline-flex min-h-11 items-center font-semibold text-ciano-200 underline decoration-ciano-200/40 underline-offset-4 hover:decoration-ciano-200"
              >
                Conhecer o Teste Merle →
              </Link>
            </div>
            <p className={nota}>
              <strong className="font-semibold text-ink">Cores &quot;surpresa&quot; na ninhada:</strong> dois pretos
              portadores de marrom (B/b × B/b) têm, em média, 25% de filhotes marrons; dois pretos portadores de
              diluição (D/d × D/d) podem ter filhotes azuis; dois cães E/e podem ter filhotes creme ou vermelhos.
            </p>
            <p className={nota}>
              <strong className="font-semibold text-ink">Manchas brancas:</strong> o Painel Saúde avalia a variante KIT
              do Pastor Alemão. Para as demais raças, o gene S (MITF) pode ser avaliado em teste avulso com a Orivet.
              Cães com muito branco na cabeça e nas orelhas: exame BAER recomendado.
            </p>
          </Capitulo>

          <Capitulo id="guia-faq" n={7} titulo="Perguntas frequentes do guia">
            <div className="rounded-panel bg-paper p-3">
              <Sanfona itens={guiaFaq} />
            </div>
          </Capitulo>
        </div>
      </div>
    </section>
  );
}


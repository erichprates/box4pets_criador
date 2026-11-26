"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { beneficios, formulario, links, ninhadaAbas, ninhadaComo, objetivos } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Lista, Titulo } from "../ui/Blocos";
import { SplitButton, Tag } from "../ui/Button";
import { ArrowUpRight, Check, Icon } from "../ui/icons";
import { Logo } from "../ui/Logo";

/** Modelo do certificado genetico: os campos entre colchetes sao de preenchimento. */
function Certificado() {
  const campos = [
    ["Nome", "[Nome do filhote]"],
    ["Raça", "[Raça]"],
    ["Microchip", "[Nº microchip]"],
    ["Registro", "[Nº registro]"],
  ];
  return (
    <motion.div
      className="mx-auto w-full max-w-[460px] rounded-[26px] bg-white p-7 text-ink shadow-[0_50px_110px_rgb(10_6_30/0.5)] md:p-9"
      initial={{ opacity: 0, y: 60, rotate: 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={viewport}
      transition={{ duration: 1.2, ease: ease.out }}
    >
      <div className="flex items-start justify-between gap-4">
        <Logo className="h-10 w-auto" />
        <span className="rounded-full bg-roxo px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-white uppercase">
          Ninhada Testada
        </span>
      </div>
      <p className="display mt-6 text-[1.375rem] leading-tight">Certificado genético do filhote</p>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.8125rem]">
        {campos.map(([k, v]) => (
          <div key={k} className="border-b border-line pb-2">
            <dt className="text-mute">{k}</dt>
            <dd className="mt-0.5 font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded-2xl bg-paper p-4 text-[0.8125rem]">
        <p className="flex items-center gap-2 font-semibold">
          <span className="grid size-5 place-items-center rounded-full bg-roxo text-white">
            <Check size={12} strokeWidth={2.6} />
          </span>
          Pai e mãe confirmados por DNA
        </p>
        <p className="mt-1 pl-7 text-mute">Pai: [nome] · Mãe: [nome]</p>
        <p className="mt-3 flex items-center gap-2 font-semibold">
          <span className="grid size-5 place-items-center rounded-full bg-roxo text-white">
            <Check size={12} strokeWidth={2.6} />
          </span>
          Resultado das 220 doenças genéticas do Painel Saúde
        </p>
        <p className="mt-1 pl-7 text-mute">Livre das doenças avaliadas · ou portador, quando for o caso</p>
      </div>
      <div className="mt-5 flex items-end justify-between gap-4 text-[0.75rem] text-mute">
        <span>
          Canil: [Nome do canil]
          <br />
          Selo &quot;Ninhada Testada Box4Pets&quot;
        </span>
        {/* Marcador de QR code, so ilustrativo. */}
        <span
          aria-label="QR code"
          role="img"
          className="grid size-16 shrink-0 grid-cols-4 gap-[3px] rounded-lg border border-line p-1.5"
        >
          {Array.from({ length: 16 }, (_, n) => (
            <span key={n} className={`rounded-[2px] ${[0, 1, 3, 4, 6, 9, 11, 12, 14, 15].includes(n) ? "bg-ink" : "bg-line"}`} />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

/** Ninhada Testada: painel escuro com duas abas, o passo a passo, o preco e o certificado. */
export function Ninhada() {
  const [i, setI] = useState(0);
  return (
    <section id="ninhada" data-dark className="panel scroll-mt-4 bg-ink py-24 text-white md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-72 -left-72 size-[900px] bg-[radial-gradient(closest-side,rgb(63_47_128/0.75),transparent)]" />
        <div className="absolute -right-72 -bottom-40 size-[760px] bg-[radial-gradient(closest-side,rgb(0_172_200/0.2),transparent)]" />
      </div>
      <div className="container-page relative grid items-start gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <FadeUp>
            <Tag tone="dark">Ninhada Testada</Tag>
          </FadeUp>
          <Words
            className="display mt-6 text-[clamp(1.9rem,3.6vw,3.25rem)]"
            parts={["Cada filhote com pais confirmados", { text: "e certificado genético.", className: "text-ciano-200" }]}
          />
          <FadeUp delay={0.1}>
            <p className="mt-5 text-[1.0625rem] text-white/85">
              Teste a ninhada inteira e entregue a cada família a prova de que o filhote vem dos pais do pedigree e
              está livre das 220 doenças genéticas avaliadas.
            </p>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-9">
            <div role="tablist" className="grid gap-2 sm:grid-cols-2">
              {ninhadaAbas.map((a, n) => {
                const on = n === i;
                return (
                  <button
                    key={a.aba}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setI(n)}
                    className={`relative min-h-14 cursor-pointer rounded-2xl px-4 py-3 text-left text-[0.9375rem] leading-tight font-medium transition-colors duration-300 ${
                      on ? "text-ink" : "bg-white/[0.07] text-white hover:bg-white/[0.12]"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="ninhada-aba"
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{a.aba}</span>
                  </button>
                );
              })}
            </div>
            <div role="tabpanel" className="mt-2 grid rounded-[20px] bg-white/[0.06] p-6 md:p-8">
              {ninhadaAbas.map((a, n) => (
                <motion.p
                  key={a.aba}
                  aria-hidden={n !== i}
                  className={`col-start-1 row-start-1 text-[1.125rem] leading-snug md:text-[1.25rem] ${n === i ? "" : "pointer-events-none invisible"}`}
                  initial={false}
                  animate={n === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: n === i ? 0.45 : 0, ease: ease.out }}
                >
                  {a.texto}
                </motion.p>
              ))}
            </div>
          </FadeUp>

          <Words as="h3" className="display mt-12 text-title" parts={["Como funciona"]} />
          <div className="mt-3">
            <Lista itens={ninhadaComo} escuro numerada />
          </div>
          <FadeUp delay={0.1}>
            <p className="mt-5 rounded-2xl bg-white/[0.07] p-5 text-[0.9375rem] text-white/85">
              <strong className="font-semibold text-white">Preço:</strong> Painel Saúde por filhote com desconto de
              quantidade (R$ 529 acima de 3 kits; R$ 489 acima de 10 kits). O Perfil de DNA de cada filhote já vem
              incluso.
            </p>
            <SplitButton href={links.ninhada} variant="light" className="mt-6 max-sm:w-full max-sm:justify-between">
              Quero testar minha próxima ninhada
            </SplitButton>
          </FadeUp>
        </div>
        <div className="lg:sticky lg:top-32">
          <Certificado />
        </div>
      </div>
    </section>
  );
}

/** O que o criador parceiro recebe: cinco beneficios, o argumento para o comprador e os objetivos. */
export function Beneficios() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-page">
        <Titulo tag="Programa Criador" titulo="O que o criador parceiro recebe" className="mb-12 md:mb-16" />
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.08 }}
        >
          {beneficios.map((b, n) => (
            <motion.article
              key={b.titulo}
              className="group flex flex-col gap-4 rounded-card border border-line bg-white p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.14)]"
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
              }}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-full bg-lilas text-roxo transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-roxo group-hover:text-white">
                  <Icon name={b.icon} size={26} />
                </span>
                <span className="text-[0.8125rem] text-mute/70 tabular-nums">/0{n + 1}</span>
              </div>
              <h3 className="display text-[1.25rem] leading-snug text-ink">{b.titulo}</h3>
              <p className="text-[0.9375rem] text-mute">{b.texto}</p>
            </motion.article>
          ))}
          <motion.article
            data-dark
            className="flex flex-col gap-4 rounded-card bg-roxo p-7 text-white"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
            }}
          >
            <h3 className="display text-[1.25rem] leading-snug text-ciano-200">Para quem compra o filhote</h3>
            <p className="text-[0.9375rem] text-white/90">
              Filhote de canil parceiro Box4Pets vem com paternidade confirmada por DNA e pais testados para 220
              doenças genéticas. É o tipo de transparência que compradores procuram e que poucos canis no Brasil
              oferecem.
            </p>
          </motion.article>
        </motion.div>

        <div className="mt-16 grid items-start gap-8 rounded-panel bg-paper p-7 md:mt-20 md:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Words as="h3" className="display text-title text-ink" parts={["Objetivos do programa"]} />
          <Lista itens={objetivos} />
        </div>
      </div>
    </section>
  );
}

const campo =
  "min-h-12 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[1rem] font-normal text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-roxo focus:bg-white focus:shadow-[0_0_0_4px_rgb(63_47_128/0.12)]";

/** Formulario "Quero participar": monta a mensagem e abre o WhatsApp da equipe. */
export function Participar() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const linhas = [
      "Olá! Quero participar do Programa Criador Box4Pets.",
      ...formulario.map((f) => {
        const v = String(d.get(f.name) ?? "").trim();
        return v ? `${f.label}: ${v}` : "";
      }),
    ].filter(Boolean);
    window.open(`${links.whatsapp}?text=${encodeURIComponent(linhas.join("\n"))}`, "_blank", "noopener");
    setSent(true);
  };
  return (
    <form
      id="participar"
      aria-label="Quero participar"
      onSubmit={onSubmit}
      className="flex scroll-mt-28 flex-col gap-4 rounded-panel bg-white p-6 text-left text-ink shadow-[0_40px_90px_rgb(27_18_61/0.35)] md:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {formulario.map((f) => (
          <label key={f.name} className="flex flex-col gap-1.5 text-[0.875rem] font-semibold">
            {f.label}
            <input type={f.type} name={f.name} required={f.name === "nome"} className={campo} />
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="group mt-1 flex h-13 cursor-pointer items-center justify-center gap-2 rounded-xl bg-roxo text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-roxo-700"
      >
        Enviar pelo WhatsApp
        <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
      <p aria-live="polite" className="min-h-5 text-[0.875rem] text-roxo">
        {sent && "Abrimos o WhatsApp com a sua mensagem pronta para enviar."}
      </p>
    </form>
  );
}

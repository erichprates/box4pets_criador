import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/sections/Header";
import { Fecho } from "@/components/sections/Rodape";
import { PageHero, Sanfona, Titulo } from "@/components/ui/Blocos";
import { SplitButton } from "@/components/ui/Button";
import { faqGrupos, links } from "@/content/site";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Tudo o que o criador precisa saber antes de pedir o teste.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  let n = 0;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqGrupos
            .flatMap((g) => g.itens)
            .filter((f) => !f.a.startsWith("["))
            .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Header />
      <main>
        <PageHero
          eyebrow="FAQ"
          titulo="Perguntas frequentes"
          texto="Tudo o que o criador precisa saber antes de pedir o teste."
        />
        <div className="flex flex-col gap-3 py-3">
          {faqGrupos.map((g) => {
            const inicio = n;
            n += g.itens.length;
            return (
              <section key={g.titulo} className="panel bg-paper py-16 md:py-24">
                <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
                  <div className="lg:sticky lg:top-32 lg:self-start">
                    <Titulo titulo={g.titulo} />
                  </div>
                  <Sanfona itens={g.itens} inicio={inicio} aberta={inicio === 0 ? 0 : null} />
                </div>
              </section>
            );
          })}
        </div>
        <Fecho titulo="Não achou sua resposta?" texto="Fale com a nossa equipe veterinária.">
          <SplitButton href={links.duvida} variant="light">
            Falar no WhatsApp
          </SplitButton>
        </Fecho>
      </main>
    </>
  );
}

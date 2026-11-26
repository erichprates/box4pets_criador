import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Guia } from "@/components/sections/Aprenda";
import { Header } from "@/components/sections/Header";
import { Fecho } from "@/components/sections/Rodape";
import { PageHero } from "@/components/ui/Blocos";
import { SplitButton } from "@/components/ui/Button";
import { guiaFaq, links } from "@/content/site";

export const metadata: Metadata = {
  title: "Aprenda: Guia de Cruzamento e Genética de Cores",
  description: "Como ler o laudo, quais combinações são seguras e como os genes de cor interagem entre si.",
  alternates: { canonical: "/aprenda" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guiaFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Header />
      <main>
        <PageHero
          eyebrow="Aprenda · Guia de Cruzamento e Genética de Cores"
          titulo="Genética aplicada à criação,"
          destaque="sem complicação."
          texto="Como ler o laudo, quais combinações são seguras e como os genes de cor interagem entre si."
        />
        <Guia />
        <Fecho titulo="Ficou com dúvida sobre o seu laudo?" texto="Fale com a nossa equipe veterinária.">
          <SplitButton href={links.duvida} variant="light">
            Falar com um veterinário
          </SplitButton>
        </Fecho>
      </main>
    </>
  );
}

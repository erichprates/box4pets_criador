import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Fecho } from "@/components/sections/Rodape";
import { Coleta, ComoEscolher, Comparativo, Complementares, Laudo, PainelSaude } from "@/components/sections/Testes";
import { PageHero } from "@/components/ui/Blocos";
import { SplitButton } from "@/components/ui/Button";
import { links } from "@/content/site";

export const metadata: Metadata = {
  title: "Testes e preços",
  description:
    "Painel Saúde, Teste Merle, testes avulsos e Perfil de DNA: o que cada teste genético da Box4Pets avalia e como escolher.",
  alternates: { canonical: "/testes" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Testes"
          titulo="Os testes genéticos da Box4Pets"
          texto="Comece pelo Painel Saúde. Se o seu programa de criação precisar de mais, complete com o Teste Merle ou testes avulsos. O Perfil de DNA já vem incluso no Painel Saúde e também pode ser pedido à parte."
        />
        <ComoEscolher />
        <Laudo />
        <PainelSaude />
        <Coleta />
        <Comparativo />
        <Complementares />
        <Fecho
          titulo="Plantel grande ou projeto de saúde para a sua raça?"
          texto={
            <>
              Fale com a nossa equipe e montamos uma proposta. Atendimento pelo WhatsApp, de segunda a sexta, das 9h às
              18h. Pagamento por link, em até 6x.
            </>
          }
        >
          <SplitButton href={links.plantel} variant="light">
            Falar no WhatsApp
          </SplitButton>
        </Fecho>
      </main>
    </>
  );
}

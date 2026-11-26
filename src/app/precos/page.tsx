import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Planos, PrecosComplementares } from "@/components/sections/Precos";
import { Fecho } from "@/components/sections/Rodape";
import { PageHero } from "@/components/ui/Blocos";
import { SplitButton } from "@/components/ui/Button";
import { links } from "@/content/site";

export const metadata: Metadata = {
  title: "Preços",
  description: "O Painel Saúde custa R$ 619. Acima de 3 kits, R$ 529 cada; acima de 10 kits, R$ 489 cada.",
  alternates: { canonical: "/precos" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Preços"
          titulo="Preço claro."
          destaque="Desconto para quem testa o plantel."
          texto="O Painel Saúde custa R$ 619. Quanto mais animais você testa, menor o valor por kit."
        />
        <Planos />
        <PrecosComplementares />
        <Fecho
          titulo="Plantel grande ou projeto de saúde para a sua raça?"
          texto={
            <>
              Fale com a nossa equipe e montamos uma proposta. Atendimento pelo WhatsApp, de segunda a sexta, das [X]
              às [X] h. Pagamento por link, em até 6x.
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

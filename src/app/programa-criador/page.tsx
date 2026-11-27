import type { Metadata } from "next";
import { FaixaVideo } from "@/components/sections/FaixaVideo";
import { Header } from "@/components/sections/Header";
import { Passos } from "@/components/sections/Passos";
import { Beneficios, Ninhada, Participar } from "@/components/sections/Programa";
import { Fecho } from "@/components/sections/Rodape";
import { PageHero, Titulo } from "@/components/ui/Blocos";
import { SplitButton } from "@/components/ui/Button";
import { programaPassos } from "@/content/site";

export const metadata: Metadata = {
  title: "Programa Criador",
  description:
    "O Programa Criador Box4Pets confirma a saúde genética dos seus reprodutores e a paternidade de cada filhote.",
  alternates: { canonical: "/programa-criador" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Programa Criador Box4Pets"
          titulo="Canil testado."
          destaque="Filhote com origem comprovada."
          texto="O Programa Criador Box4Pets confirma a saúde genética dos seus reprodutores e a paternidade de cada filhote. Você entrega ao comprador uma prova, não uma promessa."
        >
          <SplitButton href="#participar" variant="light" external={false}>
            Quero participar
          </SplitButton>
          <SplitButton href="#ninhada" variant="outline" external={false}>
            Conhecer a Ninhada Testada
          </SplitButton>
        </PageHero>
        <section className="py-24 md:py-36">
          <div className="container-page">
            <Titulo tag="Passo a passo" titulo="Como funciona" className="mb-14 md:mb-20" />
            <Passos itens={programaPassos} />
          </div>
        </section>
        <FaixaVideo
          rotulo="Cães brincando no gramado"
          midia="faixa-brincando"
          linhas={["Você entrega ao comprador", "uma prova, não uma promessa."]}
        />
        <Ninhada />
        <Beneficios />
        <Fecho
          titulo="Quero participar"
          texto="Preencha e nossa equipe entra em contato pelo WhatsApp."
          lado={<Participar />}
        />
      </main>
    </>
  );
}

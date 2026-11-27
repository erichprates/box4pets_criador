import { JsonLd } from "@/components/JsonLd";
import { FaixaVideo } from "@/components/sections/FaixaVideo";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ComoFunciona, Escolha, NinhadaHome, PorQue, Selos } from "@/components/sections/Home";
import { Fecho } from "@/components/sections/Rodape";
import { SplitButton } from "@/components/ui/Button";
import { links, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${site.url}/#org`,
              name: site.nome,
              url: site.url,
              logo: `${site.url}/logo.svg`,
              email: "contato@box4pets.com.br",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-12-99211-1805",
                contactType: "customer service",
                areaServed: "BR",
                availableLanguage: "pt-BR",
              },
            },
            { "@type": "WebSite", "@id": `${site.url}/#site`, url: site.url, name: site.nome, inLanguage: "pt-BR" },
          ],
        }}
      />
      <Header heroLogo />
      <main>
        <Hero />
        <Selos />
        <PorQue />
        <Escolha />
        <NinhadaHome />
        <ComoFunciona />
        <FaixaVideo
          rotulo="Criadora com um cão no canil"
          linhas={["Teste seu plantel", "antes da próxima ninhada."]}
        />
        <Fecho
          titulo="Teste seu plantel antes da próxima ninhada."
          texto="R$ 619 por kit. Acima de 3 kits, R$ 529 cada; acima de 10, R$ 489 cada."
        >
          <SplitButton href={links.afiliados} variant="light">
            Condições para afiliados ALKC e CBKC
          </SplitButton>
          <SplitButton href={links.plantel} variant="outline">
            Falar no WhatsApp
          </SplitButton>
        </Fecho>
      </main>
    </>
  );
}

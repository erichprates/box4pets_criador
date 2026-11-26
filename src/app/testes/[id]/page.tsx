import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/sections/Header";
import { PaginaProduto } from "@/components/sections/Loja";
import { Fecho } from "@/components/sections/Rodape";
import { SplitButton } from "@/components/ui/Button";
import { links, site, testes } from "@/content/site";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return testes.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = testes.find((x) => x.id === id);
  if (!t) return {};
  return {
    title: t.nome,
    description: `${t.nome}: ${t.texto} ${t.especies}. ${t.preco}.`,
    alternates: { canonical: `/testes/${t.id}` },
  };
}

const valor: Record<string, string | undefined> = { painel: "619", merle: "450", perfil: "489" };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const t = testes.find((x) => x.id === id);
  if (!t) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: t.nome,
          description: t.texto,
          brand: { "@type": "Brand", name: site.nome },
          ...(t.foto ? { image: `${site.url}${t.foto}` } : {}),
          ...(valor[t.id]
            ? {
                offers: {
                  "@type": "Offer",
                  price: valor[t.id],
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                  url: `${site.url}/testes/${t.id}`,
                },
              }
            : {}),
        }}
      />
      <Header />
      <main>
        <PaginaProduto id={t.id} />
        <Fecho
          titulo="Teste seu plantel antes da próxima ninhada."
          texto="R$ 619 por kit. Acima de 3 kits, R$ 529 cada; acima de 10, R$ 489 cada."
        >
          <SplitButton href={links.plantel} variant="light">
            Falar no WhatsApp
          </SplitButton>
        </Fecho>
      </main>
    </>
  );
}

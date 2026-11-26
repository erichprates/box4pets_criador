import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Box4Pets: genética de saúde para criadores de cães e gatos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento padrao (WhatsApp, LinkedIn, redes). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fff",
          background: "linear-gradient(135deg, #1b123d 0%, #3f2f80 55%, #5b48b0 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
          box<span style={{ color: "#8fe3f2" }}>4</span>pets criador
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#8fe3f2" }}>
            PARA CRIADORES DE CÃES E GATOS
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 68, lineHeight: 1.1, letterSpacing: -2 }}>
            Genética de saúde para cães e gatos
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 34, color: "#8fe3f2" }}>
            220 doenças genéticas em cães e 39 em gatos.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

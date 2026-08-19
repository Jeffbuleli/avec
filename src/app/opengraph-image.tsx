import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "e-AVEC — digital village savings groups";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let logoSrc: string | null = null;
  try {
    const buf = await readFile(
      join(process.cwd(), "public", "brand", "logo-wordmark-dark.png"),
    );
    logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    try {
      const buf = await readFile(
        join(process.cwd(), "public", "brand", "logo-mark.png"),
      );
      logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
    } catch {
      logoSrc = null;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F2D2F",
        }}
      >
        {logoSrc ? (
          <img src={logoSrc} alt="e-AVEC" width={420} height={120} />
        ) : (
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#F6E8CD",
            }}
          >
            e-AVEC
          </div>
        )}
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            fontWeight: 500,
            color: "#C9A227",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          Associations villageoises d’épargne et de crédit
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Valeur Advisory — Influence. Authority. Growth.";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#08070A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Ambient glow behind centre content */}
        <div
          style={{
            position: "absolute",
            width: "680px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(178,144,88,0.14) 0%, rgba(178,144,88,0.04) 45%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Corner mark — top left */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 72,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 24,
              height: "1px",
              background: "rgba(196,168,114,0.4)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "rgba(196,168,114,0.5)",
              textTransform: "uppercase",
            }}
          >
            Advisory
          </span>
        </div>

        {/* VA Monogram — large display treatment */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 110,
              fontWeight: 300,
              color: "#C4A872",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            V
          </span>
          <span
            style={{
              fontSize: 110,
              fontWeight: 300,
              color: "#B8906A",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            A
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.42em",
            color: "rgba(196,168,114,0.65)",
            textTransform: "uppercase",
            marginBottom: 44,
          }}
        >
          Valeur Advisory
        </div>

        {/* Hairline rule */}
        <div
          style={{
            width: 56,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(196,168,114,0.5), transparent)",
            marginBottom: 44,
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 300,
            color: "#EDE4D4",
            letterSpacing: "0.10em",
            textAlign: "center",
          }}
        >
          Influence.&nbsp; Authority.&nbsp; Growth.
        </div>

        {/* Bottom edge rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(196,168,114,0.35) 30%, rgba(196,168,114,0.35) 70%, transparent 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

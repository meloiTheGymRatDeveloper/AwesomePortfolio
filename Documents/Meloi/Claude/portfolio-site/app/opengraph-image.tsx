import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          color: "#171717",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#737373" }}>
          {siteConfig.role}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 600,
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 32, color: "#525252", maxWidth: "800px" }}>
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

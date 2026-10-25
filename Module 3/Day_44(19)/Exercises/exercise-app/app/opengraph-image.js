import { ImageResponse } from "next/og";

export const alt = "Exercise App — discover Ethiopian favorites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#102a43",
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div>Exercise App</div>
        <div style={{ fontSize: 30, marginTop: 24 }}>
          Discover Ethiopian Favorites
        </div>
      </div>
    ),
    { ...size }
  );
}
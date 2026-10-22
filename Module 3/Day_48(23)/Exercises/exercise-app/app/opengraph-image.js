import { ImageResponse } from "next/og"

export const alt = "Addis Eats"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7a1f1f",
          color: "white",
          fontSize: 96,
        }}
      >
        Addis Eats
      </div>
    ),
    size
  )
}

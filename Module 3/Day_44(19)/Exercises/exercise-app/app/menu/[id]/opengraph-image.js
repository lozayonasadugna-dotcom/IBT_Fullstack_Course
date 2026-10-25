import { ImageResponse } from "next/og";
import { dishes, getDishById } from "@/lib/dishes";

export const alt = "Ethiopian dish";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", background: "#102a43", color: "white", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
          Dish not found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#102a43",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#f6c453" }}>
          ETHIOPIAN FAVORITES
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24 }}>
          {dish.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 20 }}>
          {dish.price} ETB
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 24, color: "#d9e2ec" }}>
          {dish.summary}
        </div>
      </div>
    ),
    { ...size }
  );
}
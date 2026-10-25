"use client";

import { useState } from "react";

export default function CategoryBar({ categories }) {
  const [selected, setSelected] = useState("All");

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => setSelected(c)}
          style={{
            padding: "8px 16px",
            background: selected === c ? "#0070f3" : "#eaeaea",
            color: selected === c ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
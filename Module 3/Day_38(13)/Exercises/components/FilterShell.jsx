"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [filter, setFilter] = useState("All");

  return (
    <div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Traditional")}>Traditional</button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
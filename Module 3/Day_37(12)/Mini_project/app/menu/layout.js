"use client";

import { useState } from "react";
import Link from "next/link";

export default function MenuLayout({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* Category Sidebar */}
      <aside 
        style={{ 
          width: "220px", 
          padding: "1rem", 
          background: "#f9f9f9", 
          borderRadius: "8px",
          height: "fit-content"
        }}
      >
        <h3>Categories</h3>
        <ul style={{ listStyle: "none", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li><Link href="/menu">All Dishes</Link></li>
          <li><Link href="/menu/kitfo">Kitfo</Link></li>
          <li><Link href="/menu/doro-wat">Doro Wat</Link></li>
          <li><Link href="/menu/shiro">Shiro</Link></li>
        </ul>

        {/* Counter to test state preservation */}
        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid #ddd" }}>
          <p style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Layout State Counter:</p>
          <p style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>{count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ padding: "0.4rem 0.8rem", cursor: "pointer" }}
          >
            Increment Count
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <section style={{ flex: 1 }}>
        {children}
      </section>
    </div>
  );
}
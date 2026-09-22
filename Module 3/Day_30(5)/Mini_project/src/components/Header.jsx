import { HeaderSummary } from "./HeaderSummary";
import { useTheme } from "../context/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: theme === "dark" ? "#1f1f1f" : "#f8f9fa",
        borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e0e0e0"}`,
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Addis Eats</h1>
        <small style={{ color: "#888" }}>Authentic Ethiopian Culinary Portal</small>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <HeaderSummary />
        <button
          onClick={toggleTheme}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "inherit",
          }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}
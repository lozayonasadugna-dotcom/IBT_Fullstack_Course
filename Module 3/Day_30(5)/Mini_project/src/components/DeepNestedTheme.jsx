import { useTheme } from "../context/ThemeContext";

export function DeepNestedTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "16px",
        borderRadius: "8px",
        border: "1px dashed #888",
        backgroundColor: theme === "dark" ? "#2a2a2a" : "#f9f9f9",
        color: theme === "dark" ? "#ffffff" : "#333333",
      }}
    >
      <h4 style={{ margin: "0 0 8px 0" }}>Theme Context Demo</h4>
      <p style={{ margin: "0 0 12px 0", fontSize: "0.9rem" }}>
        Current Theme: <strong>{theme}</strong>
      </p>
      <button
        onClick={toggleTheme}
        style={{
          padding: "6px 12px",
          backgroundColor: theme === "dark" ? "#ffffff" : "#007bff",
          color: theme === "dark" ? "#000000" : "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}
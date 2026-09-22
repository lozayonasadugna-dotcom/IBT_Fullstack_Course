import { useTheme } from "../context/ThemeContext";

export function DeepNestedTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "12px",
        border: "1px dashed #888",
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <p style={{ margin: 0 }}>
        Deep Nested Theme State: <strong>{theme}</strong>
      </p>
      <button onClick={toggleTheme} style={{ marginTop: "8px" }}>
        Toggle Theme
      </button>
    </div>
  );
}
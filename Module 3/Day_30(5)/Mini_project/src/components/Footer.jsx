import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "16px 24px",
        textAlign: "center",
        backgroundColor: theme === "dark" ? "#1f1f1f" : "#f8f9fa",
        borderTop: `1px solid ${theme === "dark" ? "#333" : "#e0e0e0"}`,
        fontSize: "0.875rem",
        color: "#666",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Addis Eats. Built with React Context & Hooks.
      </p>
    </footer>
  );
}
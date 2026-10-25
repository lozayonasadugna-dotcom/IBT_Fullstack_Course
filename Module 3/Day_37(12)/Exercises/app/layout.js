import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Traditional Ethiopian Cuisine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
          <h2>Addis Eats Header</h2>
        </header>

        <main style={{ padding: "2rem" }}>
          {children}
        </main>

        <footer style={{ padding: "1rem", background: "#f5f5f5", borderTop: "1px solid #ddd", marginTop: "2rem" }}>
          <p>&copy; 2026 Addis Eats. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
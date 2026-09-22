import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FeaturedDishes } from "./components/FeaturedDishes";
import { Menu } from "./components/Menu";
import { CheckoutPanel } from "./components/CheckoutPanel";
import { DeepNestedTheme } from "./components/DeepNestedTheme";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#212529",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          maxWidth: "700px",
          width: "100%",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <FeaturedDishes />
        <hr
          style={{
            margin: "24px 0",
            borderColor: theme === "dark" ? "#333" : "#eee",
          }}
        />
        <Menu />
        <CheckoutPanel />
        <DeepNestedTheme />
      </main>

      <Footer />
    </div>
  );
}
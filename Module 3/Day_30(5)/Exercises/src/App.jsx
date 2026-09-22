import { HeaderSummary } from "./components/HeaderSummary";
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
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Addis Eats</h1>
        <HeaderSummary />
      </header>

      <FeaturedDishes />
      <hr style={{ margin: "20px 0" }} />
      <Menu />
      <CheckoutPanel />
      <DeepNestedTheme />
    </div>
  );
}
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-6 max-w-4xl mx-auto font-sans">
        <header className="flex justify-between items-center pb-6 mb-6 border-b">
          <h1 className="text-2xl font-bold">Addis Eats 🍲</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/menu" className="hover:underline">Menu</Link>
            <Link href="/cart" className="hover:underline">Cart</Link>
            <Link href="/checkout" className="hover:underline">Checkout</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
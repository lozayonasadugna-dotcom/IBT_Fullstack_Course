import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian dining experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Providers>
          <header className="bg-amber-600 text-white p-4 shadow-md">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <span className="text-xl font-bold">Addis Eats</span>
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}

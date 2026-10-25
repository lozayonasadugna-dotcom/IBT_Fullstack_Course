import "./globals.css"
import { siteUrl } from "../lib/site"

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Addis Eats",
  description: "Ethiopian comfort food, prepared with care and shared with love in Addis Ababa.",
  openGraph: {
    title: "Addis Eats",
    description: "Ethiopian comfort food, prepared with care and shared with love in Addis Ababa.",
    siteName: "Addis Eats",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

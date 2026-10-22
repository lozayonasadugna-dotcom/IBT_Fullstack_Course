import "./globals.css"
import { siteUrl } from "../lib/site"

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Addis Eats",
  description: "Order Ethiopian dishes from your phone.",
  openGraph: {
    title: "Addis Eats",
    description: "Order Ethiopian dishes from your phone.",
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

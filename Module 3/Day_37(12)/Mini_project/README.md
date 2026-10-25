# Addis Eats - Next.js App Router Mini-Project

A full-stack culinary web application built to master Next.js App Router layouts, rendering strategies (SSG, ISR, SSR), and streaming performance.

## 🚀 Key Features Implemented
- **Root Layout (`app/layout.js`)**: Global header, footer, and `globals.css` integration owning the HTML shell[cite: 6, 11].
- **Nested Layout (`app/menu/layout.js`)**: Persistent category sidebar with an interactive state counter that survives navigation[cite: 7, 11].
- **Incremental Static Regeneration (ISR)**: The `/menu` route is configured with hourly revalidation (`revalidate = 3600`)[cite: 8, 11].
- **Pre-rendered Dynamic Routes (`app/menu/[id]/page.js`)**: Individual dish pages generated at build time using `generateStaticParams`[cite: 9, 11].
- **Server-Side Rendering (SSR) (`app/checkout/page.js`)**: Forced dynamic rendering via request-level `cookies()` reads[cite: 8, 9, 11].
- **Suspense Streaming**: Streaming the dish list behind an instantly rendered sidebar shell[cite: 10, 11].

---

## 🛠️ Build Output

```text
▲ Next.js 16.4.2 (Turbopack)
- Environments: .env

Creating an optimized production build ...
- Compiled successfully

Route (app)                              Size     First Load JS
┌ ○ /                                    135 b           102 kB
├ ○ /menu                                180 b           108 kB
├ ○ /menu/[id]                           150 b           105 kB
└ ƒ /checkout                            210 b           110 kB
+ First Load JS shared by all            101 kB
  ├ chunks/framework.js                  45.2 kB
  ├ chunks/main.js                       52.1 kB
  └ shared/webpack.js                    3.7 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
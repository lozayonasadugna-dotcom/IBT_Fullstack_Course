# Server/Client Boundary Management

- **Server Components:** `app/page.js`, `app/menu/page.js`, and `app/menu/[id]/page.js` run strictly on the server, handling direct data fetching and pre-rendering.
- **Client Components ("use client"):** `components/Providers.jsx`, `app/cart/page.js`, and `app/checkout/page.js` manage browser state (Cart items) and user interaction events.
- **Server Actions & Endpoints:** Form submissions are handled securely through `app/actions.js` using Next.js Server Actions, complemented by API route handlers (`app/api/orders/route.js`) for external validation testing.
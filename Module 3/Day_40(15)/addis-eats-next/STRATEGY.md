# Migration Strategy: Addis Eats to Next.js App Router

1. **Routing & Structure:** Utilized Next.js App Router file-based routing (`app/` directory) with nested dynamic segments (`[id]`) for individual dish views.
2. **Data Fetching:** Implemented direct server-side data fetching from `lib/dishes.js` inside Server Components to minimize overhead and eliminate unnecessary internal API trips.
3. **Rendering & Caching:** Applied Incremental Static Regeneration (ISR) using `revalidate = 3600` on the menu page and static params generation (`generateStaticParams`) for dynamic dish routes.
4. **State Management & Interactivity:** Isolated client-side interactivity (Cart context, form handling) into dedicated client components ("leaves") using `"use client"`.
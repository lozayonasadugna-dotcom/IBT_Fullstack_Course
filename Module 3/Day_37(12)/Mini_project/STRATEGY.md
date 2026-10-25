# Addis Eats - Route Strategy Document

| Route | Strategy | Why? |
| :--- | :--- | :--- |
| `/` | Static (SSG)[cite: 9, 11] | The story and restaurant address never change between builds[cite: 9]. |
| `/menu` | ISR (1 Hour Revalidate)[cite: 8, 9, 11] | Menu items change infrequently, and speed matters most for visitors[cite: 9]. |
| `/menu/[id]` | Static via Params (`generateStaticParams`)[cite: 9, 11] | Every dish ID is known at build time, allowing instant static file delivery[cite: 9, 11]. |
| `/checkout` | Dynamic (SSR)[cite: 9, 11] | Reads session cookies and private user state that varies per request[cite: 8, 9, 11]. |
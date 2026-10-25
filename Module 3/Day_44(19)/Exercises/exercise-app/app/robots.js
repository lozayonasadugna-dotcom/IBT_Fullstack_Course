export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/cart", "/checkout"],
    },
    sitemap: "https://example.com/sitemap.xml",
  };
}

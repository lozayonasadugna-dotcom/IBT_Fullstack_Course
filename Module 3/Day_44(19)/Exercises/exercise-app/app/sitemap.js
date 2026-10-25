import { dishes } from "@/lib/dishes";

export default function sitemap() {
  const baseUrl = "https://example.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...dishes.map((dish) => ({
      url: `${baseUrl}/menu/${dish.id}`,
      lastModified: new Date(),
    })),
  ];
}
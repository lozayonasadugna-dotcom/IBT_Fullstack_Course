
import { notFound } from "next/navigation";
import { dishes, getDishById } from "@/lib/dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish could not be found.",
    };
  }

  return {
    title: dish.name,
    description: dish.summary,
    openGraph: {
      title: dish.name,
      description: dish.summary,
      type: "article",
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main style={{ maxWidth: "700px", margin: "60px auto", padding: "24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <h1>{dish.name}</h1>
      <p>{dish.summary}</p>
      <p>
        <strong>Price:</strong> {dish.price} ETB
      </p>
    </main>
  );
}

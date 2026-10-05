import { getDishById, getDishes } from '@/lib/dishes';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddButton from '@/components/AddButton';

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({
    id: dish.id.toString(),
  }));
}

export default async function DishDetailPage({ params }) {
  const resolvedParams = await params;
  const singleDish = await getDishById(resolvedParams.id);

  if (!singleDish) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/menu" style={{ color: "#61dafb", textDecoration: "none", fontWeight: "600" }}>&larr; Back to Menu</Link>
      
      <div style={{ marginTop: "1.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "12px", overflow: "hidden" }}>
        
        {/* Large Featured Image */}
        <div style={{ height: "320px", width: "100%", background: "#222", position: "relative" }}>
          <img 
            src={singleDish.image} 
            alt={singleDish.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Content Details */}
        <div style={{ padding: "2rem" }}>
          <span style={{ background: "#0070f3", color: "#fff", padding: "0.3rem 0.7rem", borderRadius: "4px", fontSize: "0.8rem", textTransform: "uppercase" }}>
            {singleDish.category}
          </span>
          <h1 style={{ marginTop: "0.8rem", fontSize: "2rem" }}>{singleDish.name}</h1>
          <p style={{ marginTop: "1rem", fontSize: "1.1rem", color: "#ccc", lineHeight: "1.6" }}>{singleDish.description}</p>
          <h3 style={{ marginTop: "1.5rem", fontSize: "1.4rem", color: "#61dafb" }}>Price: {singleDish.price} ETB</h3>
          
          <div style={{ marginTop: "1.5rem" }}>
            <AddButton dish={singleDish} />
          </div>
        </div>

      </div>
    </main>
  );
}
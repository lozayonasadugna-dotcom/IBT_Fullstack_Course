import Link from 'next/link';
import { getDishes } from '@/lib/dishes';

export const revalidate = 3600; // ISR: revalidate every hour

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2.2rem", margin: 0 }}>Our Addis Eats Menu</h1>
          <p style={{ color: "#bbb", margin: "0.5rem 0 0 0" }}>Explore our full collection of 15 authentic traditional Ethiopian dishes.</p>
        </div>
        <Link href="/cart">
          <button style={{ padding: "0.7rem 1.2rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
            View Cart 🛒
          </button>
        </Link>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {dishes.map((dish) => (
          <div key={dish.id} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            
            {/* Dish Image */}
            <div style={{ height: "180px", width: "100%", background: "#222", position: "relative" }}>
              <img 
                src={dish.image} 
                alt={dish.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Dish Info */}
            <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.75rem", background: "#0070f3", color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "4px", textTransform: "uppercase" }}>
                  {dish.category}
                </span>
                <h3 style={{ margin: "0.5rem 0 0.3rem 0", fontSize: "1.2rem" }}>{dish.name}</h3>
                <p style={{ color: "#aaa", fontSize: "0.9rem", margin: 0, lineHeight: "1.4" }}>{dish.description}</p>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "1.1rem", color: "#61dafb" }}>{dish.price} ETB</strong>
                <Link 
                  href={`/menu/${dish.id}`} 
                  style={{ background: "#0070f3", color: "#fff", padding: "0.5rem 1rem", borderRadius: "4px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "bold" }}
                >
                  View Details
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Addis Eats</h1>
      <p style={{ marginTop: "0.5rem" }}>
        Discover authentic Ethiopian dishes delivered fresh.
      </p>
      
      <div style={{ marginTop: "1.5rem" }}>
        <Link 
          href="/menu" 
          style={{ 
            display: "inline-block", 
            padding: "0.5rem 1rem", 
            background: "#222", 
            color: "#fff", 
            borderRadius: "4px" 
          }}
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}
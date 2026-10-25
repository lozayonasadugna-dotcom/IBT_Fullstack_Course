import { cookies } from "next/headers";

export default async function OrderStatusPage() {
  // Accessing cookies forces Next.js to render this page dynamically per request
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value || "Guest Session";

  return (
    <div>
      <h2>Live Order Status</h2>
      <p style={{ marginTop: "1rem" }}>
        <strong>User Token:</strong> {userToken}
      </p>
      <p style={{ color: "#666", marginTop: "0.5rem" }}>
        Status: <span style={{ color: "green", fontWeight: "bold" }}>Preparing your Kitfo...</span>
      </p>
      <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "1.5rem" }}>
        (This page is dynamically rendered on every request because it accesses request headers/cookies.)
      </p>
    </div>
  );
}
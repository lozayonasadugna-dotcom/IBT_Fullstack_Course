"use client";

export default function OrderSummary({ summary }) {
  return (
    <section>
      <h2>Order Summary</h2>
      <p>Total orders: {summary.totalOrders}</p>
      <p>
        Total revenue:{" "}
        {summary.totalRevenue.toLocaleString("en-ET", {
          style: "currency",
          currency: "ETB",
        })}
      </p>
    </section>
  );
}
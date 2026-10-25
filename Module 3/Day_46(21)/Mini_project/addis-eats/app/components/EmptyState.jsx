import Link from "next/link";

export default function EmptyState({
  title = "No orders yet",
  message = "There are no orders to display for this view.",
}) {
  return (
    <section className="empty-state" aria-labelledby="empty-title">
      <div className="empty-icon" aria-hidden="true">⌁</div>
      <h2 id="empty-title">{title}</h2>
      <p>{message}</p>
      <Link href="/">Return to dashboard</Link>
    </section>
  );
}

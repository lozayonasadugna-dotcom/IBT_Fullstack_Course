"use client";

import Link from "next/link";

export default function OrdersError({ error, reset }) {
  return (
    <main className="dashboard-shell">
      <section className="empty-state" role="alert" aria-labelledby="orders-error-title">
        <div className="empty-icon" aria-hidden="true">!</div>
        <h1 id="orders-error-title">Unable to load orders</h1>
        <p>Something went wrong while preparing the order records.</p>
        {error?.message ? <p className="error-detail">{error.message}</p> : null}
        <button type="button" className="retry-button" onClick={() => reset()}>
          Try again
        </button>
      </section>
      <nav className="state-demo-nav" aria-label="Demo states">
        <Link href="/orders?demo=loaded">Loaded state</Link>
        <Link href="/orders?demo=loading">Loading state</Link>
        <Link href="/orders?demo=empty">Empty state</Link>
      </nav>
    </main>
  );
}

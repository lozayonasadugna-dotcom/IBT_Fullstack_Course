export default function OrdersLoading() {
  return (
    <main className="dashboard-shell" aria-busy="true" aria-live="polite">
      <p className="eyebrow">ORDER MANAGEMENT</p>
      <h1>Loading orders…</h1>
      <p className="welcome-copy">Please wait while order records are prepared.</p>

      <div className="loading-panel">
        <div className="skeleton skeleton-heading" />
        <div className="skeleton skeleton-row" />
        <div className="skeleton skeleton-row" />
        <div className="skeleton skeleton-row" />
        <div className="skeleton skeleton-row" />
        <div className="skeleton skeleton-row" />
      </div>
    </main>
  );
}

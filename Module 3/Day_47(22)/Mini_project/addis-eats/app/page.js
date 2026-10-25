import Link from "next/link";
import { orders } from "@/lib/orders";
import { formatETB } from "@/lib/format";
import { getDashboardSummary } from "@/lib/dashboard";
import RevenueChart from "@/app/components/RevenueChart";
import OrdersChart from "@/app/components/OrdersChart";

export default function HomePage() {
  const summary = getDashboardSummary();
  const recentOrders = [...orders].slice(-5).reverse();

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Addis Eats</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/" className="nav-link active">Dashboard</Link>
          <Link href="/orders" className="nav-link">Orders</Link>
        </nav>
        <span className="header-badge">Demo workspace</span>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">RESTAURANT ANALYTICS</p>
          <h1>Dashboard overview</h1>
          <p className="welcome-copy">
            Track revenue, follow daily orders, and see how each neighbourhood performs.
          </p>
        </div>
        <div className="date-chip">
          <span aria-hidden="true">◷</span> October 20–24, 2026
        </div>
      </section>

      <section className="summary-grid" aria-label="Order summary">
        <article className="summary-card">
          <p className="summary-label">Total orders</p>
          <p className="summary-value">{summary.totalOrders}</p>
          <p className="summary-note">Across all demo dates</p>
        </article>
        <article className="summary-card">
          <p className="summary-label">Total revenue</p>
          <p className="summary-value">{formatETB(summary.totalRevenue)}</p>
          <p className="summary-note">Gross order value · ETB</p>
        </article>
        <article className="summary-card">
          <p className="summary-label">Average order value</p>
          <p className="summary-value">{formatETB(summary.averageOrderValue)}</p>
          <p className="summary-note">Revenue divided by orders</p>
        </article>
      </section>

      <section className="charts-grid" aria-label="Analytics charts">
        <RevenueChart data={summary.revenueByArea} />
        <OrdersChart data={summary.ordersOverTime} />
      </section>

      <section className="recent-section">
        <div className="recent-heading">
          <div>
            <p className="eyebrow">LATEST ACTIVITY</p>
            <h2>Recent orders</h2>
          </div>
          <Link href="/orders" className="text-link">View all orders →</Link>
        </div>

        <div className="table-wrap">
          <table className="orders-table">
            <caption>Five most recent sample orders</caption>
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Neighbourhood</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col" className="numeric">Total (ETB)</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <th scope="row">#{order.id}</th>
                  <td>{order.area}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="numeric">{formatETB(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>Addis Eats Analytics</span>
        <span>Illustrative sample data · Values in Ethiopian birr (ETB)</span>
      </footer>
    </main>
  );
}

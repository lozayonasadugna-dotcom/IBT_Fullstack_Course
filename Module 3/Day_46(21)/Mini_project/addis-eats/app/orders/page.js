import Link from "next/link";
import { orders } from "@/lib/orders";
import { formatETB } from "@/lib/format";
import EmptyState from "@/app/components/EmptyState";

const PAGE_SIZE = 20;

const sortOptions = {
  id: "Order ID",
  area: "Neighbourhood",
  date: "Date",
  status: "Status",
  total: "Total",
};

function buildSortUrl(page, sort, dir) {
  const params = new URLSearchParams({
    page: String(page),
    sort,
    dir,
  });
  return `/orders?${params.toString()}`;
}

export const instant = false;

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;

  const demo = params.demo;

  if (demo === "error") {
    throw new Error("Demonstration error: the orders could not be loaded.");
  }

  if (demo === "loading") {
    return (
      <main className="dashboard-shell" aria-busy="true">
        <p className="eyebrow">ORDER MANAGEMENT</p>
        <h1>Loading orders…</h1>
        <p className="welcome-copy">This is the loading-state demonstration.</p>
        <div className="loading-panel">
          <div className="skeleton skeleton-heading" />
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
        </div>
        <nav className="state-demo-nav" aria-label="Demo states">
          <Link href="/orders?demo=loaded">Loaded state</Link>
          <Link href="/orders?demo=empty">Empty state</Link>
          <Link href="/orders?demo=error">Error state</Link>
        </nav>
      </main>
    );
  }

  if (demo === "empty") {
    return (
      <main className="dashboard-shell">
        <p className="eyebrow">ORDER MANAGEMENT</p>
        <EmptyState
          title="No orders found"
          message="There are currently no orders to display in this demonstration."
        />
        <nav className="state-demo-nav" aria-label="Demo states">
          <Link href="/orders?demo=loaded">Loaded state</Link>
          <Link href="/orders?demo=loading">Loading state</Link>
          <Link href="/orders?demo=error">Error state</Link>
        </nav>
      </main>
    );
  }


  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requestedPage)
    ? Math.max(1, requestedPage)
    : 1;

  const sort = Object.hasOwn(sortOptions, params.sort)
    ? params.sort
    : "id";

  const dir = params.dir === "desc" ? "desc" : "asc";

  const sortedOrders = [...orders].sort((a, b) => {
    let result;

    if (sort === "id" || sort === "total") {
      result = a[sort] - b[sort];
    } else {
      result = String(a[sort]).localeCompare(String(b[sort]));
    }

    return dir === "desc" ? -result : result;
  });

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageOrders = sortedOrders.slice(startIndex, startIndex + PAGE_SIZE);

  function sortHeader(key, label, numeric = false) {
    const active = sort === key;
    const nextDir = active && dir === "asc" ? "desc" : "asc";
    const ariaSort = active
      ? dir === "asc" ? "ascending" : "descending"
      : "none";

    return (
      <th
        scope="col"
        aria-sort={ariaSort}
        className={numeric ? "numeric" : undefined}
        key={key}
      >
        <Link
          href={buildSortUrl(1, key, nextDir)}
          className="sort-link"
        >
          {label} {active ? (dir === "asc" ? "↑" : "↓") : "↕"}
        </Link>
      </th>
    );
  }

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Addis Eats</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/" className="nav-link">Dashboard</Link>
          <Link href="/orders" className="nav-link active" aria-current="page">
            Orders
          </Link>
        </nav>
        <span className="header-badge">Demo workspace</span>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">ORDER MANAGEMENT</p>
          <h1>All orders</h1>
          <p className="welcome-copy">
            Browse, sort, and review the complete sample order dataset.
          </p>
        </div>
        <Link href="/" className="text-link">← Back to dashboard</Link>
      </section>

      <nav className="state-demo-nav" aria-label="Demonstrate page states">
        <span>Demo states:</span>
        <Link href="/orders?demo=loaded">Loaded</Link>
        <Link href="/orders?demo=loading">Loading</Link>
        <Link href="/orders?demo=empty">Empty</Link>
        <Link href="/orders?demo=error">Error</Link>
      </nav>
      <section className="recent-section" aria-labelledby="orders-heading">
        <div className="recent-heading">
          <div>
            <h2 id="orders-heading">Order records</h2>
            <p className="welcome-copy">
              Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, sortedOrders.length)}
              {" "}of {sortedOrders.length.toLocaleString("en-US")} orders
            </p>
          </div>
          <span className="header-badge">
            Sort: {sortOptions[sort]} ({dir})
          </span>
        </div>

        <div className="table-wrap">
          <table className="orders-table">
            <caption>
              Orders sorted by {sortOptions[sort]}, {dir === "asc" ? "ascending" : "descending"}.
              Select a column heading to change the sort order.
            </caption>
            <thead>
              <tr>
                {sortHeader("id", "Order ID")}
                {sortHeader("area", "Neighbourhood")}
                {sortHeader("date", "Date")}
                {sortHeader("status", "Status")}
                {sortHeader("total", "Total (ETB)", true)}
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((order) => (
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

        <nav className="pagination" aria-label="Order pages">
          <Link
            href={buildSortUrl(Math.max(1, currentPage - 1), sort, dir)}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
            className={`page-link ${currentPage === 1 ? "page-disabled" : ""}`}
          >
            ← Previous
          </Link>
          <span aria-live="polite" className="page-count">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={buildSortUrl(Math.min(totalPages, currentPage + 1), sort, dir)}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={`page-link ${currentPage === totalPages ? "page-disabled" : ""}`}
          >
            Next →
          </Link>
        </nav>
      </section>

      <footer className="dashboard-footer">
        <span>Addis Eats Analytics</span>
        <span>Illustrative sample data · Values in Ethiopian birr (ETB)</span>
      </footer>
    </main>
  );
}



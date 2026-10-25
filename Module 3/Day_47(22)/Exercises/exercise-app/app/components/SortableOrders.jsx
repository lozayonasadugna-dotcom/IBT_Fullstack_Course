import Link from "next/link";
import OrdersTable from "./OrdersTable";

export default async function SortableOrders({ orders, searchParams }) {
  const params = await searchParams;

  const allowedSorts = ["id", "day", "total"];
  const sortBy = allowedSorts.includes(params?.sort) ? params.sort : "id";
  const direction = params?.direction === "desc" ? "desc" : "asc";
  const state = ["loading", "empty", "error"].includes(params?.state)
    ? params.state
    : "loaded";

  const stateLinks = (
    <nav aria-label="Order display states" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
      <Link href="/?state=loaded">Loaded</Link>
      <Link href="/?state=loading">Loading</Link>
      <Link href="/?state=empty">Empty</Link>
      <Link href="/?state=error">Error</Link>
    </nav>
  );

  if (state === "loading") {
    return (
      <section aria-live="polite" style={{ marginTop: "2rem" }}>
        <h2>Orders</h2>
        {stateLinks}
        <p>Loading orders...</p>
      </section>
    );
  }

  if (state === "empty") {
    return (
      <section style={{ marginTop: "2rem" }}>
        <h2>Orders</h2>
        {stateLinks}
        <p>No orders found.</p>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section role="alert" style={{ marginTop: "2rem" }}>
        <h2>Orders</h2>
        {stateLinks}
        <p>Unable to load orders. Please try again.</p>
        <Link href="/?state=loaded">Try again</Link>
      </section>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => {
    const comparison =
      sortBy === "day"
        ? a.day.localeCompare(b.day)
        : a[sortBy] - b[sortBy];

    return direction === "asc" ? comparison : -comparison;
  });

  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / pageSize));
  const requestedPage = Number(params?.page);
  const page = Number.isInteger(requestedPage) &&
    requestedPage >= 1 &&
    requestedPage <= totalPages
      ? requestedPage
      : 1;

  const pageOrders = sortedOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function pageUrl(pageNumber) {
    return `/?sort=${sortBy}&direction=${direction}&page=${pageNumber}`;
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      {stateLinks}
      <OrdersTable
        orders={pageOrders}
        sortBy={sortBy}
        direction={direction}
      />

      <nav aria-label="Order pages" style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
        {page > 1 ? (
          <Link href={pageUrl(page - 1)}>Previous</Link>
        ) : (
          <span aria-disabled="true">Previous</span>
        )}

        <span aria-current="page">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Link href={pageUrl(page + 1)}>Next</Link>
        ) : (
          <span aria-disabled="true">Next</span>
        )}
      </nav>
    </section>
  );
}
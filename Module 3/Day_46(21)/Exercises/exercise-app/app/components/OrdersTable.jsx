import Link from "next/link";

export default function OrdersTable({ orders, sortBy, direction }) {
  function sortLink(column) {
    const nextDirection =
      sortBy === column && direction === "asc" ? "desc" : "asc";

    return `/?sort=${column}&direction=${nextDirection}`;
  }

  function ariaSort(column) {
    if (sortBy !== column) return "none";
    return direction === "asc" ? "ascending" : "descending";
  }

  const headerStyle = {
    padding: "0.75rem",
    borderBottom: "2px solid #ccc",
  };

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Orders</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <caption style={{ textAlign: "left", padding: "0.75rem", fontWeight: "bold" }}>
          Order details and totals. Select a column heading to sort.
        </caption>

        <thead>
          <tr>
            <th scope="col" aria-sort={ariaSort("id")} style={{ ...headerStyle, textAlign: "left" }}>
              <Link href={sortLink("id")}>Order ID</Link>
            </th>
            <th scope="col" aria-sort={ariaSort("day")} style={{ ...headerStyle, textAlign: "left" }}>
              <Link href={sortLink("day")}>Day</Link>
            </th>
            <th scope="col" aria-sort={ariaSort("total")} style={{ ...headerStyle, textAlign: "right" }}>
              <Link href={sortLink("total")}>Total (ETB)</Link>
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <th scope="row" style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #eee" }}>
                {order.id}
              </th>
              <td style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
                {order.day}
              </td>
              <td style={{ textAlign: "right", padding: "0.75rem", borderBottom: "1px solid #eee" }}>
                {order.total.toLocaleString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
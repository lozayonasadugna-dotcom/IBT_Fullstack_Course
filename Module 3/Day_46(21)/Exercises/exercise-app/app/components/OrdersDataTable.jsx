export default function OrdersDataTable({ data }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
      <caption style={{ textAlign: "left", padding: "0.5rem", fontWeight: "bold" }}>
        Daily order counts for Monday through Wednesday
      </caption>
      <thead>
        <tr>
          <th scope="col" style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ccc" }}>
            Day
          </th>
          <th scope="col" style={{ textAlign: "right", padding: "0.75rem", borderBottom: "1px solid #ccc" }}>
            Number of orders
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.day}>
            <th scope="row" style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              {item.day}
            </th>
            <td style={{ textAlign: "right", padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              {item.orders}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function OrdersChart({ data }) {
  return (
    <section className="chart-card" aria-labelledby="orders-chart-title">
      <div className="section-heading">
        <h2 id="orders-chart-title">Orders over time</h2>
        <p>Number of orders recorded each day · orders</p>
      </div>

      <div className="chart-frame" role="img" aria-label="Line chart showing daily order counts">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 16, left: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} domain={[0, "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              name="Orders"
              stroke="#5540a8"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <table className="chart-data-table">
        <caption>Daily order counts</caption>
        <thead>
          <tr><th scope="col">Date</th><th scope="col">Orders</th></tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.date}>
              <th scope="row">{item.date}</th>
              <td className="numeric">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

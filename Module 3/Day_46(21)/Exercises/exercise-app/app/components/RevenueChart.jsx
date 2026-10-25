"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
  const formatETB = (value) =>
    `ETB ${Number(value).toLocaleString("en-US")}`;

  return (
    <section style={{ width: "100%", marginTop: "2rem" }}>
      <h2>Revenue by Day</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis tickFormatter={formatETB} />
            <Tooltip formatter={(value) => formatETB(value)} />
            <Bar dataKey="revenue" fill="#6c4ab6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
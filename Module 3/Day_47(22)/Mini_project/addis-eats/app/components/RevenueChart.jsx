"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatETB } from "@/lib/format";

export default function RevenueChart({ data }) {
  return (
    <section className="chart-card" aria-labelledby="revenue-chart-title">
      <div className="section-heading">
        <h2 id="revenue-chart-title">Revenue by neighbourhood</h2>
        <p>Revenue generated in each area · ETB</p>
      </div>

      <div className="chart-frame" role="img" aria-label="Bar chart showing revenue by neighbourhood in Ethiopian birr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 16, left: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="area" />
            <YAxis
              domain={[0, "auto"]}
              tickFormatter={(value) => value.toLocaleString("en-ET")}
            />
            <Tooltip formatter={(value) => formatETB(Number(value))} />
            <Bar dataKey="revenue" name="Revenue (ETB)" fill="#287d70" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className="chart-data-table">
        <caption>Revenue by neighbourhood, in ETB</caption>
        <thead>
          <tr><th scope="col">Neighbourhood</th><th scope="col">Revenue (ETB)</th></tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.area}>
              <th scope="row">{item.area}</th>
              <td className="numeric">{formatETB(item.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

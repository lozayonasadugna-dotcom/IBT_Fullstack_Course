import { Suspense } from "react";
import OrderSummary from "./components/OrderSummary";
import RevenueChart from "./components/RevenueChart";
import OrdersLineChart from "./components/OrdersLineChart";
import OrdersDataTable from "./components/OrdersDataTable";
import SortableOrders from "./components/SortableOrders";

const orders = [
  { id: 1, day: "Mon", total: 1200 },
  { id: 2, day: "Tue", total: 850 },
  { id: 3, day: "Wed", total: 2100 },
  { id: 4, day: "Mon", total: 600 },
  { id: 5, day: "Tue", total: 1500 },
  { id: 6, day: "Wed", total: 950 },
];

function LoadingOrders() {
  return <p>Loading orders...</p>;
}

export default function Home({ searchParams }) {
  const summary = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
  };

  const dailyRevenue = Object.values(
    orders.reduce((groups, order) => {
      if (!groups[order.day]) {
        groups[order.day] = { day: order.day, revenue: 0 };
      }
      groups[order.day].revenue += order.total;
      return groups;
    }, {})
  );

  const dailyOrders = Object.values(
    orders.reduce((groups, order) => {
      if (!groups[order.day]) {
        groups[order.day] = { day: order.day, orders: 0 };
      }
      groups[order.day].orders += 1;
      return groups;
    }, {})
  );

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Day 46 - Exercises</h1>
      <OrderSummary summary={summary} />
      <RevenueChart data={dailyRevenue} />
      <OrdersLineChart data={dailyOrders} />
      <OrdersDataTable data={dailyOrders} />

      <Suspense fallback={<LoadingOrders />}>
        <SortableOrders orders={orders} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
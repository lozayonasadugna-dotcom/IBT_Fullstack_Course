import { orders } from "@/lib/orders";

export function getDashboardSummary() {
  const revenueByArea = {};
  const ordersByDate = {};

  for (const order of orders) {
    revenueByArea[order.area] =
      (revenueByArea[order.area] || 0) + order.total;

    ordersByDate[order.date] =
      (ordersByDate[order.date] || 0) + 1;
  }

  return {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue:
      orders.length > 0
        ? orders.reduce((sum, order) => sum + order.total, 0) /
          orders.length
        : 0,
    revenueByArea: Object.entries(revenueByArea).map(([area, revenue]) => ({
      area,
      revenue,
    })),
    ordersOverTime: Object.entries(ordersByDate)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, count]) => ({ date, count })),
  };
}

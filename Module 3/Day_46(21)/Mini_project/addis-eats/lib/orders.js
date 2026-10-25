const areas = ["Bole", "Kazanchis", "Piazza", "Arat Kilo", "Mexico"];
const statuses = ["Delivered", "Preparing", "Cancelled"];

const sampleOrders = [
  { id: 812, area: "Bole", total: 1450, date: "2026-10-20", status: "Delivered" },
  { id: 813, area: "Kazanchis", total: 920, date: "2026-10-20", status: "Delivered" },
  { id: 814, area: "Piazza", total: 680, date: "2026-10-21", status: "Preparing" },
  { id: 815, area: "Bole", total: 2100, date: "2026-10-21", status: "Delivered" },
  { id: 816, area: "Arat Kilo", total: 750, date: "2026-10-22", status: "Cancelled" },
  { id: 817, area: "Kazanchis", total: 1250, date: "2026-10-22", status: "Delivered" },
  { id: 818, area: "Bole", total: 1850, date: "2026-10-23", status: "Preparing" },
  { id: 819, area: "Piazza", total: 540, date: "2026-10-23", status: "Delivered" },
  { id: 820, area: "Arat Kilo", total: 990, date: "2026-10-24", status: "Delivered" },
  { id: 821, area: "Kazanchis", total: 1670, date: "2026-10-24", status: "Preparing" },
  { id: 822, area: "Bole", total: 1320, date: "2026-10-24", status: "Delivered" },
  { id: 823, area: "Piazza", total: 880, date: "2026-10-24", status: "Delivered" },
];

export const orders = Array.from({ length: 4000 }, (_, index) => {
  const sample = sampleOrders[index % sampleOrders.length];
  const dayOffset = Math.floor(index / sampleOrders.length) % 30;
  const date = new Date(Date.UTC(2026, 9, 1 + dayOffset))
    .toISOString()
    .slice(0, 10);

  return {
    ...sample,
    id: 1000 + index,
    area: areas[index % areas.length],
    total: sample.total + ((index * 37) % 500),
    date,
    status: statuses[index % statuses.length],
  };
});

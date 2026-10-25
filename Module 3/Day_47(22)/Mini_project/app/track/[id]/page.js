import LiveTracker from "@/components/LiveTracker";

export default async function TrackingPage({ params }) {
  const { id } = await params;

  // Mock server order data
  const order = {
    id: id,
    initialStatus: "Dispatched",
    initialEtaMinutes: 15,
    placedAt: new Date().toISOString(),
    totalAmount: 1850,
    destination: {
      address: "Bole Road, Near Friendship Mall, Addis Ababa",
      coords: [8.995, 38.7896],
    },
    courier: {
      name: "Almaz",
      coords: [8.988, 38.778],
      eta: "18:40 EAT",
    },
  };

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Track Order #{order.id}</h1>
        <p className="text-slate-500 text-sm">Addis Eats Live Delivery Dashboard</p>
      </div>

      <LiveTracker order={order} />
    </main>
  );
}

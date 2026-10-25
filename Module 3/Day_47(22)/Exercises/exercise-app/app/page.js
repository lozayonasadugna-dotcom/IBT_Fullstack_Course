import MapPanel from "@/components/MapPanel";
import OrderTracker from "@/components/OrderTracker";

export default function ExercisesPage() {
  return (
    <main className="max-w-3xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900">Day 47 Exercises</h1>

      {/* Map Section with Text Fallback */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">1 & 2. Delivery Map</h2>
        <MapPanel />
        {/* Screen reader text fallback */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
          <strong>Text Fallback (Accessibility):</strong> Courier Abebe is currently near Bole, traveling towards the delivery address at Bole Edna Mall. Estimated delivery: 18:40 EAT.
        </div>
      </section>

      {/* SSE & Formatting Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">3, 4, 5, 6 & 7. Live SSE & Formats</h2>
        <OrderTracker orderId="ORD-9021" initialStatus="Preparing" />
      </section>
    </main>
  );
}

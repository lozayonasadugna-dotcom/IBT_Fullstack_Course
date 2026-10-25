"use client";

import { useEffect, useState } from "react";
import MapPanel from "./MapPanel";
import { etb, when, relative } from "@/lib/format";
import { exportToCSV } from "@/lib/csv";

export default function LiveTracker({ order }) {
  // Seed initial value directly from server render
  const [status, setStatus] = useState(order.initialStatus);
  const [etaMinutes, setEtaMinutes] = useState(order.initialEtaMinutes);
  const [connectionState, setConnectionState] = useState("Connecting");

  useEffect(() => {
    const es = new EventSource(`/api/orders/${order.id}/stream`);
    setConnectionState("Live Stream Active");

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
      setEtaMinutes(data.etaMinutes);

      if (data.status === "Delivered") {
        setConnectionState("Delivered (Stream Closed)");
        es.close(); // Close stream deliberately upon delivery
      }
    };

    es.onerror = () => {
      setConnectionState("Connection Interrupted");
    };

    // Clean up EventSource on unmount to prevent orphaned connections
    return () => {
      es.close();
    };
  }, [order.id]);

  const handleCSVDownload = () => {
    const headers = ["Order ID", "Items", "Delivery Address", "Total Amount", "Order Time"];
    const rows = [
      [
        order.id,
        'Doro Wat (Extra Injera), "Special Kitfo"', // Awkward commas & quotes
        "Bole Road, Near Friendship Mall\nBlock B, Apt 3", // Awkward newline
        order.totalAmount,
        when.format(new Date(order.placedAt)),
      ],
    ];

    exportToCSV(`order-history-${order.id}.csv`, headers, rows);
  };

  return (
    <div className="space-y-6">
      {/* Live Connection Banner */}
      <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl shadow">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Real-Time Connection</span>
          <span className="font-semibold">{connectionState}</span>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full font-bold ${
            status === "Delivered"
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 text-white animate-pulse"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Map & Accessible Text Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2">
          <MapPanel destination={order.destination} courier={order.courier} />
        </div>

        {/* Text Fallback for Accessibility */}
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
          <h3 className="font-bold text-slate-900 text-lg">Delivery Details</h3>
          <div>
            <p className="text-xs text-slate-500">Address</p>
            <p className="text-sm font-semibold text-slate-800">{order.destination.address}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Courier Name</p>
            <p className="text-sm font-semibold text-slate-800">{order.courier.name}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Estimated Arrival</p>
            <p className="text-sm font-semibold text-emerald-600">
              {etaMinutes === 0 ? "Arrived" : relative(-etaMinutes)}
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary & Export */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg">Order Summary</h3>
        <div className="flex justify-between border-b pb-3 text-sm">
          <span className="text-slate-600">Total Price:</span>
          <span className="font-bold text-slate-900">{etb.format(order.totalAmount)}</span>
        </div>
        <div className="flex justify-between border-b pb-3 text-sm">
          <span className="text-slate-600">Placed At:</span>
          <span className="font-bold text-slate-900">{when.format(new Date(order.placedAt))}</span>
        </div>

        <button
          onClick={handleCSVDownload}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition"
        >
          Download Order History (CSV Export)
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { etb, when } from "@/lib/format";
import { generateCSV, downloadCSV } from "@/lib/csv";

export default function OrderTracker({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [connState, setConnState] = useState("Connecting...");

  useEffect(() => {
    const es = new EventSource(`/api/orders/${orderId}/stream`);
    setConnState("Live");

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setStatus(data.status);

      if (data.status === "Delivered") {
        setConnState("Completed");
        es.close(); // Deliberate close
      }
    };

    es.onerror = () => {
      setConnState("Disconnected / Reconnecting...");
    };

    // Day 29 cleanup: Essential to prevent unclosed connections on unmount
    return () => {
      es.close();
    };
  }, [orderId]);

  const handleExportCSV = () => {
    const dataRows = [
      ["Order ID", "Item", "Special Instructions", "Price", "Date"],
      [
        orderId,
        'Special "Beyaynetu", extra spicy', // Awkward quotes & commas
        "Bole, near Edna Mall\nApartment #402", // Awkward newline
        1250,
        new Date().toISOString(),
      ],
    ];
    const csvContent = generateCSV(dataRows);
    downloadCSV(`order-${orderId}.csv`, csvContent);
  };

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Order Tracking</h2>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
            connState === "Live"
              ? "bg-emerald-100 text-emerald-800"
              : connState === "Completed"
              ? "bg-blue-100 text-blue-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {connState}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-slate-500">Current Status:</span>
          <p className="font-semibold text-slate-800">{status}</p>
        </div>
        <div>
          <span className="text-slate-500">Formatted Price:</span>
          <p className="font-semibold text-slate-800">{etb.format(1250)}</p>
        </div>
        <div>
          <span className="text-slate-500">Timestamp (Addis Time):</span>
          <p className="font-semibold text-slate-800">{when.format(new Date())}</p>
        </div>
      </div>

      <button
        onClick={handleExportCSV}
        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-lg text-sm transition"
      >
        Export Order CSV (Test Awkward Values)
      </button>
    </div>
  );
}

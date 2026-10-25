"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false, // Essential line to prevent server window crashes
  loading: () => (
    <div className="h-[320px] w-full bg-slate-200 animate-pulse rounded-lg flex items-center justify-center text-slate-500">
      Loading Delivery Map...
    </div>
  ),
});

export default function MapPanel() {
  return <DeliveryMap />;
}

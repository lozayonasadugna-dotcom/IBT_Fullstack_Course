"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false, // Prevents window is not defined during SSR
  loading: () => (
    <div className="h-[350px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400 font-medium">
      Loading interactive Leaflet map...
    </div>
  ),
});

export default function MapPanel({ destination, courier }) {
  return <DeliveryMap destination={destination} courier={courier} />;
}

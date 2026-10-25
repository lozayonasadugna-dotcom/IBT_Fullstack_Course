"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet icon paths in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BOLE_DESTINATION = [8.995, 38.7896];
const COURIER_LOCATION = [8.988, 38.778];

export default function DeliveryMap() {
  return (
    <MapContainer
      center={BOLE_DESTINATION}
      zoom={13}
      style={{ height: "320px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={BOLE_DESTINATION}>
        <Popup>Delivery Address: Bole, Addis Ababa</Popup>
      </Marker>
      <Marker position={COURIER_LOCATION}>
        <Popup>Courier (Abebe) - On the way</Popup>
      </Marker>
    </MapContainer>
  );
}

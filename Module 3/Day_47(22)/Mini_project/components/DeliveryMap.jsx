"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function DeliveryMap({ destination, courier }) {
  return (
    <MapContainer
      center={destination.coords}
      zoom={14}
      style={{ height: "350px", width: "100%", borderRadius: "0.75rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={destination.coords}>
        <Popup>
          <strong>Destination:</strong> {destination.address}
        </Popup>
      </Marker>
      <Marker position={courier.coords}>
        <Popup>
          <strong>Courier:</strong> {courier.name} ({courier.eta})
        </Popup>
      </Marker>
    </MapContainer>
  );
}

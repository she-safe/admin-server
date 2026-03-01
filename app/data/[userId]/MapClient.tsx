"use client"

// dynamic import of MapClient itself prevents window errors, but react-leaflet still
// tries to access leaflet icons relative to the current route.  We'll override
// the default icon paths so they resolve correctly.
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// workaround for missing leaflet icon assets (Next.js copies them to _next/static)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// merge options only once
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export interface MapClientProps {
  position: [number, number];
  zoom?: number; // defaults to 10
  timestamp: string;
}

export default function MapClient({ position, zoom = 10, timestamp }: MapClientProps) {
  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: '30rem', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{timestamp}</Popup>
      </Marker>
    </MapContainer>
  );
}

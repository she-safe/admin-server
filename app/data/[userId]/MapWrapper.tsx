"use client";

import dynamic from "next/dynamic";

// dynamic import with ssr:false must live in a client component
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export interface MapWrapperProps {
  location: [{
    latitude: number;
    longitude: number;
    timestamp: Date;
  }]|undefined;
  zoom?: number;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <MapClient {...props} />;
}

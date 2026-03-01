"use client";

import dynamic from "next/dynamic";

// dynamic import with ssr:false must live in a client component
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export interface MapWrapperProps {
  position: [number, number];
  zoom?: number;
  timestamp: string;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <MapClient {...props} />;
}

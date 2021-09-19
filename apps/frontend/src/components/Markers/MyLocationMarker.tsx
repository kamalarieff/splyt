import React from "react";
import { Marker, Tooltip, Popup } from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";

import marker from "icons/marker.svg";

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [40, 40],
  iconAnchor: [40, 40],
});

interface Props {
  position: LatLngLiteral;
}

function MyLocationMarker({ position }: Props) {
  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>Office is here</Popup>
      <Tooltip>Office</Tooltip>
    </Marker>
  );
}

export default MyLocationMarker;

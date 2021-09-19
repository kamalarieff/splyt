import React from "react";
import { Marker, Tooltip, Popup } from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";

import office from "icons/office.svg";

const officeIcon = L.icon({
  iconUrl: office,
  iconSize: [30, 30],
  iconAnchor: [30, 30],
});

interface Props {
  position: LatLngLiteral;
}

function OfficeMarker({ position }: Props) {
  return (
    <Marker position={position} icon={officeIcon}>
      <Popup>Office is here</Popup>
      <Tooltip>Office</Tooltip>
    </Marker>
  );
}

export default OfficeMarker;

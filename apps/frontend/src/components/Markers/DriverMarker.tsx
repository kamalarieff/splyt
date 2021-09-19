import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";

import car from "icons/car.svg";

interface Props {
  id: string;
  position: LatLngLiteral;
}

const carIcon = L.icon({
  iconUrl: car,
  iconSize: [40, 40],
  iconAnchor: [40, 40],
});

function DriverMarker({ id, position }: Props) {
  return (
    <Marker key={id} position={position} icon={carIcon}>
      <Tooltip>{id}</Tooltip>
    </Marker>
  );
}

export default DriverMarker;

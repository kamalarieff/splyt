import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";

import car from "icons/car.svg";

interface Props {
  id: string;
  latitude: number;
  longitude: number;
}

const carIcon = L.icon({
  iconUrl: car,
  iconSize: [40, 40],
  iconAnchor: [40, 40],
});

function DriverMarker({ id, latitude, longitude }: Props) {
  return (
    <Marker key={id} position={[latitude, longitude]} icon={carIcon}>
      <Tooltip>{id}</Tooltip>
    </Marker>
  );
}

export default DriverMarker;

import React from "react";
import { Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";
import L, { LatLng, LatLngLiteral } from "leaflet";

import office from "icons/office.svg";
import marker from "icons/marker.svg";

const officeIcon = L.icon({
  iconUrl: office,
  iconSize: [30, 30],
  iconAnchor: [30, 30],
});

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [40, 40],
  iconAnchor: [40, 40],
});

function LocationMarker({
  position,
  onLocationFound,
  iconType,
}: {
  position: LatLngLiteral;
  onLocationFound: (arg0: LatLng) => void;
  iconType: ICON_TYPE;
}) {
  const map = useMapEvents({
    locationfound(e) {
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return iconType === "OFFICE" ? (
    <Marker position={position} icon={officeIcon}>
      <Popup>Office is here</Popup>
      <Tooltip>Office</Tooltip>
    </Marker>
  ) : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
      <Tooltip>You</Tooltip>
    </Marker>
  );
}

export default LocationMarker;

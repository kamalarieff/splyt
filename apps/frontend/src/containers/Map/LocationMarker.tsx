import React from "react";
import { useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

function LocationMarker({
  onLocationFound,
  children,
}: {
  onLocationFound: (arg0: LatLng) => void;
  children?: React.ReactNode;
}) {
  const map = useMapEvents({
    locationfound(e) {
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return <>{children}</>;
}

export default LocationMarker;

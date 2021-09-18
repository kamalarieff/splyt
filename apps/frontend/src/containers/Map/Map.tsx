import React, { useEffect, useState } from "react";
import L, { LatLng, LatLngLiteral, Map } from "leaflet";
import {
  MapContainer as LeafletMapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";

import { OFFICES } from "utils/constants";
import { useDebounce, useDrivers } from "hooks";

import office from "icons/office.svg";
import car from "icons/car.svg";
import marker from "icons/marker.svg";

import "./Map.css";

const officeIcon = L.icon({
  iconUrl: office,
  iconSize: [30, 30],
  iconAnchor: [30, 30],
});

const carIcon = L.icon({
  iconUrl: car,
  iconSize: [40, 40],
  iconAnchor: [40, 40],
});

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [40, 40],
  iconAnchor: [40, 40],
});

type ICON_TYPE = "OFFICE" | "MARKER";

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

interface Props {
  Controls: ({
    officeClickHandler,
    myLocationClickHandler,
    setNumDrivers,
    numDrivers,
  }: {
    officeClickHandler: () => void;
    myLocationClickHandler: () => void;
    setNumDrivers: (arg0: number) => void;
    numDrivers: number;
  }) => JSX.Element;
}

/**
 * Map container.
 *
 * Since this is a container, it shouldn't have any responsibility in terms of UI.
 * Containers should only have business logic.
 *
 * @param Controls Component as a prop. There are some callbacks here that can be called by the calling component
 */
function MapContainer({ Controls }: Props) {
  const [map, setMap] = useState<Map | null>(null);
  const [office, setOffice] = useState<keyof typeof OFFICES>("LONDON");
  const [numDrivers, setNumDrivers] = useState<number>(1);
  const [position, setPosition] = useState<LatLngLiteral>(OFFICES[office]);
  const [iconType, setIconType] = useState<ICON_TYPE>("OFFICE");
  const debouncedNumDrivers = useDebounce(numDrivers, 1000);

  const { isSuccess, data, isError, error } = useDrivers({
    position: position,
    numDrivers: debouncedNumDrivers,
  });

  useEffect(() => {
    setPosition(OFFICES[office]);
  }, [office]);

  const officeClickHandler = () => {
    map?.setView(OFFICES[office == "LONDON" ? "SINGAPORE" : "LONDON"]);
    setOffice((c) => (c == "LONDON" ? "SINGAPORE" : "LONDON"));
    setIconType("OFFICE");
  };

  const myLocationClickHandler = () => {
    map?.locate();
    setIconType("MARKER");
  };

  // TODO: Show something when there is an error
  // Add tests for this
  if (isError) {
    if (error instanceof Error) {
      console.log(error?.message || "Something went wrong.");
    }
  }

  return (
    <>
      {Controls({
        officeClickHandler,
        myLocationClickHandler,
        numDrivers,
        setNumDrivers,
      })}
      <LeafletMapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        id="mapid"
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isSuccess &&
          data?.drivers.map((driver) => (
            <Marker
              position={[driver.location.latitude, driver.location.longitude]}
              key={driver.driver_id}
              icon={carIcon}
            >
              <Tooltip>{driver.driver_id}</Tooltip>
            </Marker>
          ))}
        <LocationMarker
          position={position}
          onLocationFound={setPosition}
          iconType={iconType}
        />
      </LeafletMapContainer>
    </>
  );
}

export default MapContainer;

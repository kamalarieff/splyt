import React, { useEffect, useState } from "react";
import L, { LatLngLiteral, Map } from "leaflet";
import {
  MapContainer as LeafletMapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import { OFFICES } from "utils/constants";
import { useDebounce, useDrivers } from "hooks";

import LocationMarker from "./LocationMarker";

import car from "icons/car.svg";

import "./Map.css";

const carIcon = L.icon({
  iconUrl: car,
  iconSize: [40, 40],
  iconAnchor: [40, 40],
});

interface Props {
  Controls?: ({
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
      {Controls?.({
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

import React, { useState } from "react";
import { Map } from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

import { OFFICES } from "utils/constants";
import { useDrivers } from "hooks";

import { Slider } from "components/Slider";
import Switch from "./Switch";

import "./Map.css";

function MapComponent() {
  const [map, setMap] = useState<Map | null>(null);
  const [office, setOffice] = useState<keyof typeof OFFICES>("LONDON");
  const [numDrivers, setNumDrivers] = useState<number>(1);

  const toggleOffice = () =>
    setOffice((c) => (c == "LONDON" ? "SINGAPORE" : "LONDON"));

  const { isSuccess, data, isError, error } = useDrivers({
    office,
    numDrivers,
  });

  // TODO: Show something when there is an error
  // Add tests for this
  if (isError) {
    if (error instanceof Error) {
      console.log(error?.message || "Something went wrong.");
    }
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4 w-1/2 m-auto">
        <Slider value={numDrivers} onChange={setNumDrivers} />
        {map ? (
          <Switch
            map={map}
            newOffice={office == "LONDON" ? "SINGAPORE" : "LONDON"}
            changeOffice={toggleOffice}
          >
            Switch offices
          </Switch>
        ) : null}
      </div>
      <MapContainer
        center={OFFICES[office]}
        zoom={13}
        scrollWheelZoom
        id="mapid"
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* TODO: Office should have different icon */}
        <Marker position={OFFICES[office]}>
          <Tooltip>Office</Tooltip>
        </Marker>
        {isSuccess &&
          data?.drivers.map((driver) => (
            <>
              {/* TODO: Driver should have different icons */}
              <Marker
                position={[driver.location.latitude, driver.location.longitude]}
                key={driver.driver_id}
              >
                <Tooltip>{driver.driver_id}</Tooltip>
              </Marker>
            </>
          ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;

import React, { useState } from "react";
import { Map } from "leaflet";
import { useQuery } from "react-query";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

import { OFFICES } from "../../utils/constants";
import { Slider } from "../Slider";
import Switch from "./Switch";

import "./Map.css";

function MapComponent() {
  const [map, setMap] = useState<Map | null>(null);
  const [office, setOffice] = useState<keyof typeof OFFICES>("LONDON");
  const [numDrivers, setNumDrivers] = useState<number>(0);

  const toggleOffice = () =>
    setOffice((c) => (c == "LONDON" ? "SINGAPORE" : "LONDON"));

  // TODO: Destructure this query object
  // TODO: Refactor this into its own hook
  const query = useQuery<Drivers>(
    ["drivers", office, numDrivers],
    async () => {
      const [latitude, longitude] = OFFICES[office];
      const response = await fetch(
        // TODO: Use the querystring package for this
        // TODO: Move endpoints to config
        `http://docker.mudah.my:3001/api/v1/drivers?latitude=${latitude}&longitude=${longitude}${
          numDrivers ? `&count=${numDrivers}` : ""
        }`
      );
      if (!response.ok) {
        return response.json().then(({ errors }) => {
          const [error] = errors;
          throw Error(error.msg);
        });
      }
      return response.json();
    },
    { refetchInterval: 3000 }
  );

  // TODO: Show something when there is an error
  // Add tests for this
  if (query.isError) {
    console.log(query?.error?.message || "");
  }

  return (
    <>
      <Slider value={numDrivers} onChange={setNumDrivers} />
      {map ? (
        <Switch
          map={map}
          newOffice={office == "LONDON" ? "SINGAPORE" : "LONDON"}
          changeOffice={toggleOffice}
        />
      ) : null}
      <div id="mapid">
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
          <Marker position={OFFICES[office]}>
            <Tooltip>Office</Tooltip>
          </Marker>
          {query.isSuccess &&
            query.data.drivers.map((driver) => (
              <Marker
                position={[driver.location.latitude, driver.location.longitude]}
                key={driver.driver_id}
              >
                <Tooltip>{driver.driver_id}</Tooltip>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </>
  );
}

export default MapComponent;

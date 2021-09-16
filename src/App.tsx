import React, { useState } from "react";
import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
} from "react-leaflet";
import { LatLngExpression, Map } from "leaflet";
import { useQuery } from "react-query";

const SINGAPORE: LatLngExpression = [1.285194, 103.8522982];
const LONDON: LatLngExpression = [51.5049375, -0.0964509];

const OFFICES = {
  SINGAPORE: SINGAPORE,
  LONDON: LONDON,
};

function Control({
  map,
  newOffice,
  changeOffice,
}: {
  map: Map;
  newOffice: keyof typeof OFFICES;
  changeOffice: () => void;
}) {
  const onClick = () => {
    map.setView(OFFICES[newOffice]);
    changeOffice();
  };
  return <button onClick={onClick}>Switch offices</button>;
}

interface DriversResponse {
  pickup_eta: number;
  drivers: {
    driver_id: string;
    location: {
      bearing: number;
      latitude: number;
      longitude: number;
    };
  }[];
}

function Slider({
  value,
  onChange,
}: {
  value: number;
  onChange: (arg0: number) => void;
}) {
  return (
    <>
      <label htmlFor="driver-slider">Number of drivers slider: {value}</label>
      <input
        id="driver-slider"
        type="range"
        step="1"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </>
  );
}

function App() {
  const [map, setMap] = useState<Map | null>(null);
  const [office, setOffice] = useState<keyof typeof OFFICES>("LONDON");
  const [numDrivers, setNumDrivers] = useState<number>(0);

  const toggleOffice = () =>
    setOffice((c) => (c == "LONDON" ? "SINGAPORE" : "LONDON"));

  // TODO: Destructure this query object
  const query = useQuery<DriversResponse>(
    ["drivers", office, numDrivers],
    async () => {
      const [latitude, longitude] = OFFICES[office];
      const response = await fetch(
        `http://docker.mudah.my:3001/drivers?latitude=${latitude}&longitude=${longitude}${
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

  if (query.isError) {
    console.log(query?.error?.message || "");
  }

  return (
    <>
      <Slider value={numDrivers} onChange={setNumDrivers} />
      {map ? (
        <Control
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
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
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

export default App;

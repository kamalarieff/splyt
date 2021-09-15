import React, { useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Map } from "leaflet";

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
  console.log(map.getCenter());
  const onClick = () => {
    map.setView(OFFICES[newOffice]);
    changeOffice();
  };
  return <button onClick={onClick}>Switch offices</button>;
}

function App() {
  const [map, setMap] = useState<Map | null>(null);
  const [office, setOffice] = useState<keyof typeof OFFICES>("LONDON");

  const toggleOffice = () =>
    setOffice((c) => (c == "LONDON" ? "SINGAPORE" : "LONDON"));

  return (
    <>
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
        </MapContainer>
      </div>
    </>
  );
}

export default App;

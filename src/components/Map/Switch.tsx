import React from "react";
import { LatLngExpression, Map } from "leaflet";

const SINGAPORE: LatLngExpression = [1.285194, 103.8522982];
const LONDON: LatLngExpression = [51.5049375, -0.0964509];

const OFFICES = {
  SINGAPORE: SINGAPORE,
  LONDON: LONDON,
};

// TODO: Refactor this to somewhere more appropriate
function Switch({
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

export default Switch;

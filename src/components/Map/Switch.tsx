import React from "react";
import type { Map } from "leaflet";

import { OFFICES } from "utils/constants";

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

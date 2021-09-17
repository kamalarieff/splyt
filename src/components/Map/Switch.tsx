import React from "react";
import type { Map } from "leaflet";

import { OFFICES } from "utils/constants";

function Switch({
  map,
  newOffice,
  changeOffice,
  children,
}: {
  map: Map;
  newOffice: keyof typeof OFFICES;
  changeOffice: () => void;
  children: React.ReactNode;
}) {
  const onClick = () => {
    map.setView(OFFICES[newOffice]);
    changeOffice();
  };
  return <button onClick={onClick}>{children}</button>;
}

export default Switch;

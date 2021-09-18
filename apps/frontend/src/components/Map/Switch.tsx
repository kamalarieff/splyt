import React from "react";
import type { Map } from "leaflet";

import { OFFICES } from "utils/constants";

/**
 * Office switch component.
 * @description Switches between the offices
 *
 * @param map The map component that contains the necessary functions to make changes to the Leaflet Map component
 * @param newOffice Sets the new office
 * @param changeOffice Callback for when button is pressed
 */
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
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
    >
      {children}
    </button>
  );
}

export default Switch;

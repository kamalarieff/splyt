import qs from "query-string";

import { DRIVERS_ENDPOINT } from "configs";

interface Params {
  latitude: number;
  longitude: number;
  numDrivers: number;
}

export function getDrivers({ latitude, longitude, numDrivers }: Params) {
  const url = new URL(DRIVERS_ENDPOINT);
  const queryParams = qs.stringify(
    {
      latitude: latitude,
      longitude: longitude,
      count: numDrivers,
    },
    { skipNull: true }
  );
  url.search = queryParams;
  return fetch(url.toString());
}

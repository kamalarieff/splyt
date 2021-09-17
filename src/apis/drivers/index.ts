import { DRIVERS_ENDPOINT } from "configs";

interface Params {
  latitude: number;
  longitude: number;
  numDrivers: number;
}

function getDrivers({ latitude, longitude, numDrivers }: Params) {
  return fetch(
    // TODO: Use the querystring package for this
    `${DRIVERS_ENDPOINT}?latitude=${latitude}&longitude=${longitude}${
      numDrivers ? `&count=${numDrivers}` : ""
    }`
  );
}

export default getDrivers;

import { useQuery } from "react-query";

import { REFETCH_INTERVAL } from "utils/constants";
import { getDrivers } from "apis/drivers";
import { LatLngLiteral } from "leaflet";

interface Params {
  position: LatLngLiteral;
  numDrivers: number;
}

/**
 * useDrivers hook to fetch the data from the API
 */
function useDrivers({ position, numDrivers }: Params) {
  return useQuery<Drivers>(
    ["drivers", position, numDrivers],
    async () => {
      const { lat, lng } = position;
      const response = await getDrivers({
        latitude: lat,
        longitude: lng,
        numDrivers,
      });
      if (!response.ok) {
        return response.json().then(({ errors }) => {
          const [error] = errors;
          throw Error(error.msg);
        });
      }
      return response.json();
    },
    { refetchInterval: REFETCH_INTERVAL }
  );
}

export default useDrivers;

import { useQuery } from "react-query";

import { OFFICES, REFETCH_INTERVAL } from "utils/constants";
import { getDrivers } from "apis/drivers";

interface Params {
  office: keyof typeof OFFICES;
  numDrivers: number;
}

function useDrivers({ office, numDrivers }: Params) {
  return useQuery<Drivers>(
    ["drivers", office, numDrivers],
    async () => {
      const [latitude, longitude] = OFFICES[office];
      const response = await getDrivers({ latitude, longitude, numDrivers });
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

import { useQuery } from "react-query";

import { OFFICES } from "utils/constants";
import getDrivers from "apis/drivers";

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
    { refetchInterval: 3000 }
  );
}

export default useDrivers;

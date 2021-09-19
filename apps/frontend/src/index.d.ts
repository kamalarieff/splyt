declare interface Drivers {
  pickup_eta: number;
  drivers: {
    driver_id: string;
    location: {
      bearing: number;
      latitude: number;
      longitude: number;
    };
  }[];
}

declare type DriversLocation = Drivers["drivers"];

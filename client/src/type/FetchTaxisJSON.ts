export type TaxisJSON = {
  pickup_eta: number;
  drivers: {
      driver_id: string;
      location: {
          latitude: number;
          longitude: number;
          bearing: number;
      };
  }[];
}

import { LatLngTuple } from "leaflet";

export type OfficeLocationsType = keyof typeof OFFICE_LOCATIONS;

export const OFFICE_LOCATIONS = Object.freeze({
  SG: { 
    location: [1.285194, 103.8522982] as LatLngTuple
  },
  LDN: {
    location: [51.5049375, -0.0964509] as LatLngTuple
  },
});
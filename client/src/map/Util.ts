import { LatLng } from "leaflet"
import { OfficeLocationsType, OFFICE_LOCATIONS } from "../defaults/OfficeLocations"

// get distance between two latlng
export const distance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number,
) => {
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
      dist = 1;
  }
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  return dist
}

// get nearest office key
export const findNearestOffice = (
  currentLocation: LatLng,
  officeLocations: typeof OFFICE_LOCATIONS,
) => {
  let nearest:OfficeLocationsType = Object.keys(officeLocations)[0] as OfficeLocationsType;

  let nearestDistance: number = distance(
    currentLocation.lat, 
    currentLocation.lng, 
    officeLocations[nearest].location[0], 
    officeLocations[nearest].location[1]
  );

  for (const [key, value] of Object.entries(officeLocations)) {
    const tempDistance = distance(
      currentLocation.lat, 
      currentLocation.lng, 
      value.location[0], 
      value.location[1]
    )
    if (
      tempDistance
      <
      nearestDistance
    ) {
      nearest = key as OfficeLocationsType;
      nearestDistance = tempDistance;
    }
  }

  return nearest;
}
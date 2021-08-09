import { Icon, LatLngTuple } from "leaflet";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { useEffect, useState } from "react";
import { findNearestOffice } from "./Util";

export type OfficeLocationsType = keyof typeof OFFICE_LOCATIONS;

export const OFFICE_LOCATIONS = Object.freeze({
  SG: { 
    location: [1.285194, 103.8522982] as LatLngTuple
  },
  LDN: {
    location: [51.5049375, -0.0964509] as LatLngTuple
  },
});

const OfficeLocation = () => {

  const [position, setPosition] = useState<LatLngTuple | undefined>(undefined);

  const [officeMarker, setOfficeMarker] = useState<LatLngTuple | undefined>(undefined);

  const map = useMap();

  useMapEvents({
    locationfound:(e) => {
      // find nearest office then setPosition to nearest office given latlng
      const nearestOffice = findNearestOffice(e.latlng, OFFICE_LOCATIONS);
      setOfficeMarker(OFFICE_LOCATIONS[nearestOffice].location);
      setPosition(OFFICE_LOCATIONS[nearestOffice].location);
    },
    dragend: (e) => {
      setPosition(undefined);
    }
  });

  useEffect(
    () => {
      map.locate();
    }, 
    [map]
  );

  useEffect(
    () => {
      if (position) {
        map.setView(position, 14);
      }
    }, 
    [map, position]
  );

  const onClick = (loc: OfficeLocationsType) => {
    setOfficeMarker(OFFICE_LOCATIONS[loc].location);
    setPosition(OFFICE_LOCATIONS[loc].location);
  }

  return (
    <>
      <div className={'leaflet-top leaflet-right'}>
        <div className="leaflet-control leaflet-bar">
          {
            Object.keys(OFFICE_LOCATIONS).map(
              (key) => { 
                return <button key={ key } onClick={ () => { onClick(key as OfficeLocationsType) } }>{ key }</button>;
              }
            )     
          }
        </div>
      </div>
      {
        officeMarker
        &&
        <Marker position={officeMarker} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
      }
    </>    
  );
}

export default OfficeLocation;
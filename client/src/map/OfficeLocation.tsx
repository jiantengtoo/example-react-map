import { Icon, LatLngExpression, LatLngTuple } from "leaflet";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { useEffect, useState } from "react";

type OfficeLocationsType = keyof typeof OfficeLocations;

const OfficeLocations = Object.freeze({
  SG: { 
    location: [1.285194, 103.8522982] as LatLngTuple
  },
  LDN: {
    location: [51.5049375, -0.0964509] as LatLngTuple
  }
});

const OfficeLocation = () => {

  const [position, setPosition] = useState<LatLngExpression>(OfficeLocations.SG.location);

  const map = useMap();

  useMapEvents({
    locationfound(e) {
      // find nearest office then setPosition to nearest office given latlng
      setPosition(e.latlng);
    },
  });

  useEffect(
    () => {
      map.locate();
    }, 
    [map]
  );

  const onClick = (loc: OfficeLocationsType) => {
    setPosition(OfficeLocations[loc].location);
    map.panTo(OfficeLocations[loc].location);
  }

  return (
    <>
      <div className={'leaflet-top leaflet-right'}>
        <div className="leaflet-control leaflet-bar">
          {
            Object.keys(OfficeLocations).map(
              (key) => { 
                return <button key={ key } onClick={ () => { onClick(key as OfficeLocationsType) } }>{ key }</button>;
              }
            )     
          }
        </div>
      </div>
      <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
    </>    
  );
}

export default OfficeLocation;
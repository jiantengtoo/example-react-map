import { Icon } from "leaflet";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import markerIconPng from "../icon/car.png"
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { TaxisJSON } from "../type/FetchTaxisJSON";
import _ from "lodash";

type TaxiLocationProps = {
  readonly numberOfTaxisToShow: number;
}

const TaxiLocation: FunctionComponent<TaxiLocationProps> = (
  { numberOfTaxisToShow }
) => {

  const map = useMap();

  useMapEvents({
    moveend(e) {
      fetchTaxisJSON();
    }
  });

  const [listOfTaxis, setListOfTaxis] = useState<TaxisJSON>();

  const fetchTaxisJSON = useCallback(async () => {
    const center = map.getCenter();

    const response = await fetch(
      'http://localhost:5000/users?'
      +
      new URLSearchParams(
        { 
          latitude: center.lat.toString(), 
          longitude: center.lng.toString(),
          count: '20',
        }
      )
    );

    const taxis = await response.json();

    setListOfTaxis(taxis);
  }, [map])

  useEffect(
    () => {
      const intervalFetch = setInterval(() => {
        fetchTaxisJSON();
      }, 5000);
      return () => clearInterval(intervalFetch)
    },
    [fetchTaxisJSON]
  )

  return (
    <>
      {
        listOfTaxis
        &&
        _.map(_.slice(listOfTaxis.drivers, 0, numberOfTaxisToShow), (driver) => {
          return (
            <Marker 
              key={ driver.driver_id }
              position={[driver.location.latitude,driver.location.longitude]} 
              icon={new Icon({iconUrl: markerIconPng, iconSize: [70, 41], iconAnchor: [12, 41]})} 
            />
          )
        })
      }
    </>    
  );
}

export default TaxiLocation;
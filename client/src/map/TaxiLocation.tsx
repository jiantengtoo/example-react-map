import { Icon } from "leaflet";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import markerIconPng from "../icon/car.png"
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { TaxisJSON } from "../type/FetchTaxisJSON";
import _ from "lodash";
import axios from "axios";

type TaxiLocationProps = {
  readonly numberOfTaxisToShow: number;
}

const TaxiLocation: FunctionComponent<TaxiLocationProps> = (
  { numberOfTaxisToShow }
) => {

  const [listOfTaxis, setListOfTaxis] = useState<TaxisJSON>();

  const map = useMap();

  useMapEvents({
    moveend(e) {
      fetchTaxisJSON();
    },
  });

  const fetchTaxisJSON = useCallback(async () => {
    const center = map.getCenter();

    try {
      const response = await axios.get(
        'http://localhost:5000/taxi-locations',
        {
          params: {
            latitude: center.lat.toString(), 
            longitude: center.lng.toString(),
            count: '20',
          }
        }
      )
  
      setListOfTaxis(response.data);
    } catch(err) {
      console.error(err);
    }

  }, [map])

  useEffect(
    () => {
      fetchTaxisJSON();
      const intervalFetch = setInterval(() => {
        fetchTaxisJSON();
      }, 10000);
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
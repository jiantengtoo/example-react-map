import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import OfficeLocation from './OfficeLocation';
import SliderWithTooltip from '../common/SliderWithTooltip';
import TaxiLocation from './TaxiLocation';

function CustomMap() {

  const [numberOfTaxisToShow, setNumberOfTaxisToShow] = useState<number>(10);

  const onSliderValueChange = (value:number) => {
    setNumberOfTaxisToShow(value);
  }

  return (
    <>
      <MapContainer center={ [0,0] } zoom={13} style={{height:'90vh'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <OfficeLocation />
        <TaxiLocation numberOfTaxisToShow={ numberOfTaxisToShow }/>
      </MapContainer>
      <SliderWithTooltip
        value={ numberOfTaxisToShow }
        onSliderValueChange={ onSliderValueChange }
      />
    </>
  );
}

export default CustomMap;

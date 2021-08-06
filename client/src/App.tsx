import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function App() {

  const [sss, setSss] = React.useState<any>('test');

  React.useEffect(
    () => {
      fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSss(data.lol)
      });
    },
    []
  )

  const position = [51.505, -0.09]

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;

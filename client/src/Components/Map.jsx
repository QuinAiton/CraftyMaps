import React, { useState, useRef, useMemo } from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import useStore from '../store';
import beer from './beer.svg';
import Breweries from './Breweries';
const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const Map = () => {
  // Handles Map Configuration
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 48.447119,
    longitude: -123.38106,
    zoom: 10.5,
    pitch: 30,
  });
  // brings in breweries from store
  const breweries = useStore((state) => state.breweries);

  // Creates markers for each Pub
  // Only rerender markers if breweries has changed
  const mapRef = useRef();
  const markers = useMemo(
    () =>
      breweries.map((pub) => (
        <Marker
          key={pub.id}
          longitude={pub.location.lng}
          latitude={pub.location.lat}
          offsetTop={viewport.zoom - 30}
          offsetLeft={viewport.zoom - 30}
        >
          <img
            src={beer}
            alt='beer icon'
            width={viewport.zoom + 15}
            height={viewport.zoom + 15}
          />
        </Marker>
      )),
    [breweries]
  );

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapStyle='mapbox://styles/mapbox/light-v10'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      {markers}
      <Breweries />
    </ReactMapGL>
  );
};

export default Map;

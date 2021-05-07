import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
// import Geocoder from 'react-map-gl-geocoder';
import useStore from '../store';
import SmallNav from './SmallNav';
import beer from './beer.svg';
import Cards from './Cards';
const Map = () => {
  // Handles Map Configuration
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100%',
    latitude: 48.447119,
    longitude: -123.38106,
    zoom: 10.5,
  });

  // brings in breweries from store
  const breweries = useStore((state) => state.breweries);

  const mapRef = useRef();

  // const handleViewportChange = useCallback(
  //   (newViewport) => setViewport(newViewport),
  //   []
  // );
  // handles Searchbar Component for Map
  // const handleGeocoderViewportChange = useCallback(
  //   (newViewport) => {
  //     const geocoderDefaultOverrides = { transitionDuration: 1000 };
  //     return handleViewportChange({
  //       ...newViewport,
  //       ...geocoderDefaultOverrides,
  //     });
  //   },
  //   [handleViewportChange]
  // );

  // Creates markers for each Pub
  // Only rerender markers if breweries has changed
  const markers = React.useMemo(
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
            alt='beer'
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
      <SmallNav />
      {/* <Header /> */}
      {markers}
      {/* <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position='bottom-left'
      /> */}
      <Cards />
    </ReactMapGL>
  );
};

export default Map;

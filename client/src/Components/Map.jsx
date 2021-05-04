import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import useStore from '../store';
const Map = () => {
  // Handles Map Configuration
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '45vh',
    latitude: 48.447119,
    longitude: -123.38106,
    zoom: 10.5,
  });
  const [showPopup, togglePopup] = React.useState(false);

  // brings in breweries from store
  const breweries = useStore((state) => state.breweries);

  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  // handles Searchbar Component for Map
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  // Creates markers for each Pub
  // Only rerender markers if breweries has changed
  const markers = React.useMemo(
    () =>
      breweries.map((pub) => (
        <Marker
          key={pub.id}
          longitude={pub.location.lng}
          latitude={pub.location.lat}
        >
          <img
            src='https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F2%2F26%2FEucalyp-Deus_Beer.png&sp=1620152758Tbc7ce3e337ab2d6723edf7f77c6b767387120d6097f9d6cd19f62047dd78c0b0'
            alt='beer'
            width={viewport.zoom + 2}
            height={viewport.zoom + 2}
            onClick={() => togglePopup(true)}
          />
          {showPopup ? (
            <Popup
              latitude={pub.location.lat}
              longitude={pub.location.lng}
              closeButton={true}
              closeOnClick={false}
              onClose={() => togglePopup(false)}
            >
              <div>{pub.name}</div>
            </Popup>
          ) : null}
        </Marker>
      )),
    [breweries]
  );

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapStyle='mapbox://styles/mapbox/navigation-night-v1'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {markers}
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position='top-left'
      />
    </ReactMapGL>
  );
};

export default Map;

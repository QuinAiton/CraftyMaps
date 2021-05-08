import React, { useState, useRef, useEffect, useMemo } from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import useStore from '../store';
import SmallNav from './SmallNav';
import beer from './beer.svg';
import Cards from './Cards';
import axios from 'axios';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';

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
  });
  // brings in breweries from store
  const breweries = useStore((state) => state.breweries);
  const { routes, setRoutes } = useStore();

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

  const data = {
    name: 'Brewery Route',
    color: [101, 147, 245],
    path: [],
  };

  useEffect(() => {
    const url =
      'https://api.mapbox.com/optimized-trips/v1/mapbox/cycling/-123.369354,48.42948;-123.368798,48.428099;-123.369496,48.428492?steps=true&geometries=geojson&access_token=pk.eyJ1IjoicXVpbmFpdG9uIiwiYSI6ImNrbjR1NHY4MzF1cmQycmxlY21vOHN4MXIifQ.d7O-EySX4gVmlHRQ0sCb6g';
    axios
      .get(url)
      .then((res) => {
        setRoutes(res.data);
        console.log(routes);
        routes.trips[0].geometry.coordinates.map((coords) => {
          data.path.push(coords);
        });
        console.log(data);
      })

      .catch((err) => {
        console.log('Error in Route Fetching', err);
      });
  }, []);

  const layer = [
    new PathLayer({
      id: 'path-layer',
      data,
      getWidth: (data) => 7,
      getColor: (data) => data.color,
      widthMinPixels: 7,
    }),
  ];

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapStyle='mapbox://styles/mapbox/light-v10'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <SmallNav />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      {markers}
      <Cards />
    </ReactMapGL>
  );
};

export default Map;

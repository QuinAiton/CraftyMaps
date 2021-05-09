import React, { useEffect, useState } from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import axios from 'axios';
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import useStore from '../store';
import Route from './Route';
const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const Navigation = () => {
  const { routes, setRoutes } = useStore();
  const [isLoading, setLoading] = useState(true);

  // Fetches Optimized routes
  useEffect(() => {
    const url =
      'https://api.mapbox.com/optimized-trips/v1/mapbox/cycling/-123.369354,48.42948;-123.368798,48.428099;-123.369496,48.428492?steps=true&geometries=geojson&access_token=pk.eyJ1IjoicXVpbmFpdG9uIiwiYSI6ImNrbjR1NHY4MzF1cmQycmxlY21vOHN4MXIifQ.d7O-EySX4gVmlHRQ0sCb6g';
    axios
      .get(url)
      .then((res) => {
        setRoutes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error in Route Fetching', err);
      });
  }, []);

  if (isLoading) {
    return <h1>Generating Route</h1>;
  } else {
    // data needed for overlay here
    const data = [
      {
        name: 'Brewery Route',
        color: [101, 250, 245],
        path: [...routes.trips[0].geometry.coordinates],
      },
    ];

    // below, add whatever layers you need to overlay on your map
    const layer = [
      new PathLayer({
        id: 'path-layer',
        data,
        getWidth: (data) => 2,
        getColor: (data) => data.color,
        widthMinPixels: 3,
      }),
    ];

    return (
      <React.Fragment>
        <DeckGL
          initialViewState={{
            width: '100vw',
            height: '100vh',
            latitude: 48.447119,
            longitude: -123.38106,
            zoom: 10.5,
            pitch: 30,
          }}
          controller={true}
          layers={layer} // layer here
        >
          <StaticMap
            mapStyle='mapbox://styles/mapbox/light-v10'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
        </DeckGL>
        <Route />
      </React.Fragment>
    );
  }
};
export default Navigation;

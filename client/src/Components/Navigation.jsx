import React, { useEffect, useState } from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer, IconLayer } from '@deck.gl/layers';
import useStore from '../store';
import Loading from './Loading';
const Navigation = () => {
  const { routes, setRoutes, breweries } = useStore();
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
    return <Loading />;
  } else {
    // Data for Route Display
    const routesData = [
      {
        name: 'Brewery Route',
        path: [...routes.trips[0].geometry.coordinates],
      },
    ];

    // Data for Marker Display
    const markerData = [];
    const breweryMarkers = routes.waypoints.map((pub) => {
      markerData.push({
        name: pub.name,
        coordinates: pub.location,
      });
      return markerData;
    });

    // Identifies how to display marker icons
    const ICON_MAPPING = {
      marker: {
        x: 0,
        y: 0,
        width: 242,
        height: 242,
        anchorY: 242,
        mask: true,
      },
    };

    // adds layers to overlay on map
    const layers = [
      new PathLayer({
        id: 'path-layer',
        data: routesData,
        rounded: true,
        getWidth: (data) => 1,
        getColor: (data) => [82, 61, 158],
        widthMinPixels: 2,
      }),
      new IconLayer({
        id: 'icon-layer',
        data: markerData,
        iconAtlas:
          'https://upload.wikimedia.org/wikipedia/commons/c/c4/Projet_bi%C3%A8re_logo_v2.png',
        iconMapping: ICON_MAPPING,
        getIcon: (data) => 'marker',
        sizeScale: 8,
        getPosition: (data) => data.coordinates,
        getSize: (data) => 5,
        getColor: (data) => [0, 130, 10],
      }),
    ];

    // Creates initial state for Deck GL Layer
    const initialState = {
      width: '100vw',
      height: '100vh',
      latitude: routes.waypoints[0].location[1],
      longitude: routes.waypoints[0].location[0],
      zoom: 16,
      pitch: 60,
      bearing: 0,
    };

    return (
      <DeckGL initialViewState={initialState} controller={true} layers={layers}>
        <StaticMap
          mapStyle='mapbox://styles/mapbox/light-v10'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    );
  }
};
export default Navigation;

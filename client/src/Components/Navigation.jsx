import React, { useEffect, useState } from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer, IconLayer } from '@deck.gl/layers';
import useStore from '../store';

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
    return <h1>Generating Route</h1>;
  } else {
    // data needed for overlay here
    const routesData = [
      {
        name: 'Brewery Route',
        color: [82, 61, 158],
        path: [...routes.trips[0].geometry.coordinates],
      },
    ];

    const markerData = [];
    const breweryMarkers = routes.waypoints.map((pub) => {
      markerData.push({
        name: pub.name,
        coordinates: pub.location,
      });
      return markerData;
    });

    console.log(markerData);

    const ICON_MAPPING = {
      marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
    };

    // adds layers to overlay on map
    const layers = [
      new PathLayer({
        id: 'path-layer',
        data: routesData,
        getWidth: (data) => 2,
        getColor: (data) => data.color,
        widthMinPixels: 3,
      }),
      new IconLayer({
        id: 'icon-layer',
        data: markerData,
        pickable: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
        iconAtlas:
          'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        getIcon: (d) => 'marker',
        sizeScale: 10,
        getPosition: (d) => d.coordinates,
        getSize: (d) => 5,
        getColor: (d) => [Math.sqrt(d.exits), 140, 0],
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

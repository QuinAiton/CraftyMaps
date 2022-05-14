import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useEffect, useState, useRef } from 'react';
import { StaticMap, MapContext, GeolocateControl } from 'react-map-gl';
import { PathLayer, IconLayer } from '@deck.gl/layers';
import { useLocation } from 'react-router-dom';
import { FaDirections } from 'react-icons/fa';
import axios from 'axios';
import DeckGL from 'deck.gl';
import useStore from '../store';
import Loading from './Loading';
import SmallNav from './SmallNav';
import TripStats from './TripStats';

const geolocateControlStyle = {
  right: 10,
  top: 20,
};

const Navigation = () => {
  const { routes, setRoutes, setCurrentLocation, currentLocation } = useStore();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const mapRef = useRef();

  // gets users Current Location
  useEffect(() => {
    const showPosition = (position) => {
      const location = [position.coords.longitude, position.coords.latitude];
      setCurrentLocation(location);
    };
    // Checks if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    }
  }, [setCurrentLocation]);

  useEffect(() => {
    // Takes in Chosen Breweries and Formats them for API
    const getCoordinates = () => {
      const breweries = location.state.selectedRoute;
      const coords = [];
      if (currentLocation) {
        coords.push(currentLocation);
      }
      breweries.forEach((pub) => {
        coords.push(pub.coordinates);
      });
      return coords.join(';');
    };
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/cycling/${getCoordinates()}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoicXVpbmFpdG9uIiwiYSI6ImNrbjR1NHY4MzF1cmQycmxlY21vOHN4MXIifQ.d7O-EySX4gVmlHRQ0sCb6g`;
    axios
      .get(url)
      .then((res) => {
        setRoutes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error in Route Fetching', err);
      });
  }, [setRoutes, currentLocation, location.state.selectedRoute]);

  if (isLoading) {
    return <Loading />;
  } else {
    // Data for Route Display
    const routesData = [
      {
        name: 'Brewery Route',
        color: [82, 61, 158],
        path: [...routes.trips[0].geometry.coordinates],
      },
    ];

    // Data for Marker Display
    const markerData = [];
    const beerMarkers = routes.waypoints.slice(1);
    beerMarkers.map((pub) => {
      markerData.push({
        name: pub.name,
        coordinates: pub.location,
      });
      return markerData;
    });

    // Data for Location display
    const startingLocation = [
      {
        name: 'current Location',
        coordinates: routes.waypoints[0].location,
      },
    ];

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
        widthMinPixels: 5,
      }),
      new IconLayer({
        id: 'brewery-layer',
        data: markerData,
        pickable: true,
        iconAtlas:
          'https://img.icons8.com/emoji/100/000000/clinking-beer_mugs.png',
        iconMapping: ICON_MAPPING,
        getIcon: (d) => 'marker',
        sizeScale: 10,
        getPosition: (d) => d.coordinates,
        getSize: (d) => 5,
        getColor: (d) => [255, 215, 0],
      }),
      new IconLayer({
        id: 'location-layer',
        data: startingLocation,
        pickable: true,
        iconAtlas:
          'https://img.icons8.com/ios-filled/100/000000/cycling-mountain-bike.png',
        iconMapping: ICON_MAPPING,
        getIcon: (d) => 'marker',
        sizeScale: 8,
        getPosition: (d) => d.coordinates,
        getSize: (d) => 8,
        getColor: (d) => [0, 0, 0],
      }),
    ];

    // Creates initial state for Deck GL Layer
    const initialState = {
      width: '100vw',
      height: '100vh',
      latitude: routes.waypoints[0].location[1],
      longitude: routes.waypoints[0].location[0],
      zoom: 12,
      bearing: 0,
    };

    return (
      <DeckGL
        ContextProvider={MapContext.Provider}
        initialViewState={initialState}
        controller={true}
        layers={layers}
      >
        <StaticMap
          mapStyle='mapbox://styles/mapbox/light-v10'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          reuseMaps
          ref={mapRef}
          width={window.innerWidth}
          height={window.innerHeight}
          preventStyleDiffing={true}
        />
        <SmallNav />
        <MapContext.Consumer>
          {(outerContext) => {
            return (
              <MapContext.Provider
                value={{
                  map: mapRef.current ? mapRef.current.getMap() : null,
                  ...outerContext,
                }}
              >
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={true}
                  style={geolocateControlStyle}
                />
              </MapContext.Provider>
            );
          }}
        </MapContext.Consumer>
        <TripStats />
        <FaDirections />
      </DeckGL>
    );
  }
};
export default Navigation;

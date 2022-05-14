import Styles from "../Styles/Map.module.scss";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl";
import React, { useState, useRef, useMemo, useCallback } from "react";
import SmallNav from "./SmallNav";
import useStore from "../store";
import Breweries from "./Breweries";

const geolocateControlStyle = {
  right: 10,
  top: 20,
};

const Map = () => {
  // Handles Map Configuration
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48.447119,
    longitude: -123.38106,
    zoom: 10.5,
    pitch: 50,
  });

  const selectBreweryHandler = useCallback((longitude, latitude) => {
    setViewport({
      longitude,
      latitude,
      zoom: 15,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: "auto",
    });
  }, []);

  // brings in breweries from store
  const breweries = useStore(state => state.breweries);

  // Creates markers for each Pub
  // Only rerender markers if breweries has changed
  const mapRef = useRef();
  const markers = useMemo(
    () =>
      breweries.map(pub => (
        <Marker
          key={pub.id}
          longitude={pub.coordinates[0]}
          latitude={pub.coordinates[1]}
          offsetTop={viewport.zoom - 70}
          offsetLeft={viewport.zoom}
        >
          <img
            className={Styles.icon}
            src={pub.icon}
            alt="beer icon"
            width={viewport.zoom + 20}
            height={viewport.zoom + 20}
          />
        </Marker>
      )),
    [breweries, viewport.zoom]
  );

  return (
    <ReactMapGL
      className={Styles.Container}
      {...viewport}
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => setViewport(viewport)}
    >
      <SmallNav />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      {markers}
      <Breweries onSelectBrewery={selectBreweryHandler} />
    </ReactMapGL>
  );
};

export default Map;

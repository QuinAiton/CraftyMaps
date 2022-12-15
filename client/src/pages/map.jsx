import Styles from '../Styles/Map.module.scss';
import dynamic from 'next/dynamic';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactMapGL, { GeolocateControl, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import React, { useState, useRef, useCallback } from 'react';
import SmallNav from '../components/shared/SmallNav';
const BreweryMarkers = dynamic(() => import('../components/maps/BreweryMarkers'), {
	suspense: false,
});
const BreweriesList = dynamic(() => import('../components/maps/BreweriesList'), {
	suspense: false,
});
// import BreweriesList from '../components/maps/BreweriesList';
const geolocateStyle = {
	right: 10,
	top: 20,
	margin: 10,
};
const navigationStyle = {
	right: 10,
	top: 60,
	margin: 10,
};

const Map = () => {
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 48.447119,
		longitude: -123.38106,
		zoom: 10.5,
		pitch: 50,
	});
	const mapRef = useRef();

	// handles fly to animatin
	const selectBreweryHandler = useCallback((longitude, latitude) => {
		setViewport({
			...viewport,
			longitude,
			latitude,
			zoom: 15,
			transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
		});
	}, []);

	return (
		<ReactMapGL
			className={Styles.Container}
			ref={mapRef}
			mapStyle="mapbox://styles/mapbox/light-v10"
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			onViewportChange={(viewport) => setViewport(viewport)}
			{...viewport}
		>
			<SmallNav />
			<GeolocateControl
				style={geolocateStyle}
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation={true}
			/>
			<NavigationControl style={navigationStyle} showCompass showZoom />
			<BreweryMarkers viewport={viewport} />
			<BreweriesList onSelectBrewery={selectBreweryHandler} />
		</ReactMapGL>
	);
};

export default Map;

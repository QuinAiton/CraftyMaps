import Styles from '../Styles/Map.module.scss';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactMapGL, { Marker, GeolocateControl, FlyToInterpolator, MapRef } from 'react-map-gl';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import SmallNav from '../components/shared/SmallNav';
import useStore from '../components/hooks/store';
import BreweriesList from '../components/maps/BreweriesList';

const geolocateStyle = {
	right: 10,
	top: 20,
	margin: 10,
};

type viewPortTypes = {
	width: string;
	height: string;
	latitude: number;
	longitude: number;
	zoom: number;
	pitch: number;
};

const Map = () => {
	// Handles Map Configuration
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 48.447119,
		longitude: -123.38106,
		zoom: 10.5,
		pitch: 50,
	});

	const selectBreweryHandler = useCallback((longitude: number, latitude: number) => {
		setViewport({
			...viewport,
			longitude,
			latitude,
			zoom: 15,
			// transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
		});
	}, []);

	// brings in breweries from store
	const breweries = useStore((state: { breweries: any }) => state.breweries);

	// Creates markers for each Pub
	// Only rerender markers if breweries has changed
	const mapRef = React.useRef<MapRef>(null);
	const markers = useMemo(
		() =>
			breweries.map((pub: { id: React.Key | null | undefined; coordinates: number[]; icon: string | undefined }) => (
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
		[breweries, viewport.zoom],
	);

	return (
		<ReactMapGL
			className={Styles.Container}
			ref={mapRef}
			mapStyle="mapbox://styles/mapbox/light-v10"
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			onViewportChange={(viewport: viewPortTypes) => setViewport(viewport)}
			{...viewport}
		>
			<SmallNav />
			<GeolocateControl
				style={geolocateStyle}
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation={true}
			/>
			{markers}
			<BreweriesList onSelectBrewery={selectBreweryHandler} />
		</ReactMapGL>
	);
};

export default Map;

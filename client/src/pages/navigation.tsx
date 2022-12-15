import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useEffect, useState } from 'react';
import { StaticMap, MapContext, GeolocateControl, MapRef } from 'react-map-gl';
import axios from 'axios';
import DeckGL from '@deck.gl/react/typed';
import useStore from '../hooks/store';
import Loading from '../components/shared/Loading';
import SmallNav from '../components/shared/SmallNav';
import TripStats from '../components/navigation/TripStats';
import getDirections from '../components/navigation/helpers/getDirections';
import generateLayers from '../components/navigation/helpers/generateLayers';
// types
import BreweryTypes from '../types/breweryTypes';
import storeTypes from '../types/storeTypes';
const geolocateControlStyle = {
	right: 10,
	top: 20,
};

const Navigation = () => {
	const [isLoading, setLoading] = useState(true);
	const { selectedRoute, routes, setRoutes, currentLocation, setCurrentLocation }: storeTypes = useStore();
	const mapRef = React.useRef<MapRef>(null);

	useEffect(() => {
		const showPosition = (position: { coords: { longitude: any; latitude: any } }) => {
			const userPosition = [position.coords.longitude, position.coords.latitude];
			setCurrentLocation(userPosition);
		};
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(showPosition);
		}
	}, []);

	useEffect(() => {
		const getCoordinates = () => {
			const breweries = selectedRoute;
			const coords = [];
			if (currentLocation.length > 0) coords.push(currentLocation);
			breweries.forEach((pub: BreweryTypes) => {
				coords.push(pub.coordinates);
			});
			return coords.join(';');
		};
		// Takes in Chosen Breweries and Formats them for API
		const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/cycling/${getCoordinates()}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoicXVpbmFpdG9uIiwiYSI6ImNrbjR1NHY4MzF1cmQycmxlY21vOHN4MXIifQ.d7O-EySX4gVmlHRQ0sCb6g`;
		axios
			.get(url)
			.then((res) => {
				setRoutes(res.data);
				setLoading(false);
				if (res.status === 200) getDirections();
			})
			.catch((err) => {
				console.log('Error in Route Fetching', err);
			});
	}, [currentLocation]);

	if (isLoading) {
		return <Loading />;
	} else {
		const layers = generateLayers(routes);
		const initialMapState = {
			width: '100vw',
			height: '100vh',
			latitude: routes.waypoints[0].location[1],
			longitude: routes.waypoints[0].location[0],
			zoom: 13,
			bearing: 0,
			pitch: 60,
		};

		return (
			<>
				<DeckGL initialViewState={initialMapState} controller={true} layers={layers}>
					<StaticMap
						mapStyle="mapbox://styles/mapbox/light-v10"
						mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
						reuseMaps
						ref={mapRef}
						width={window.innerWidth}
						height={window.innerHeight}
						preventStyleDiffing={true}
					/>
					<SmallNav />
					{/* {Map context is no longer working. Need to check release updates } */}
					{/* <MapContext.Consumer>
					{(outerContext) => {
						return (
							<MapContext.Provider
								value={{
									...outerContext,
									map: mapRef.current ? mapRef.current.getMap() : null,
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
				</MapContext.Consumer> */}
					<TripStats />
				</DeckGL>
			</>
		);
	}
};
export default Navigation;

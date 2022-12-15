import { PathLayer, IconLayer } from '@deck.gl/layers/typed';
import useStore from '../../hooks/store';
import BreweryTypes from '../../types/breweryTypes';

export default function generateLayers() {
	const { routes }: any = useStore();
	// Data for Route Display
	const routesData = [
		{
			name: 'Brewery Route',
			color: [82, 61, 158],
			path: [...routes.trips[0].geometry.coordinates],
		},
	];
	// Data for Marker Display
	const markerData: { name: string; coordinates: string }[] = [];
	const beerMarkers = routes.waypoints.slice(1);
	beerMarkers.map((pub: BreweryTypes) => {
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

	const layers = [
		new PathLayer({
			id: 'path-layer',
			data: routesData,
			getWidth: (data: any) => 2,
			getColor: (data: { color: any }) => data.color,
			widthMinPixels: 5,
		}),
		new IconLayer({
			id: 'brewery-layer',
			data: markerData,
			pickable: true,
			iconAtlas: 'https://img.icons8.com/emoji/100/000000/clinking-beer_mugs.png',
			iconMapping: ICON_MAPPING,
			getIcon: (data: any) => 'marker',
			sizeScale: 10,
			getPosition: (data: { coordatainates: any }) => data.coordatainates,
			getSize: (data: any) => 5,
			getColor: (data: any) => [255, 215, 0],
		}),
		new IconLayer({
			id: 'location-layer',
			data: startingLocation,
			pickable: true,
			iconAtlas: 'https://img.icons8.com/ios-filled/100/000000/cycling-mountain-bike.png',
			iconMapping: ICON_MAPPING,
			getIcon: (data: any) => 'marker',
			sizeScale: 8,
			getPosition: (data: { coordatainates: any }) => data.coordatainates,
			getSize: (data: any) => 8,
			getColor: (data: any) => [0, 0, 0],
		}),
	];
	return layers;
}

import { ReactNode, useMemo } from 'react';
import useStore from '../../hooks/store';
import { Marker } from 'react-map-gl';

type pubTypes = { coordinates: number[]; id: string; icon: string };

export default function BreweryMarkers({ viewport, setShowPopup }: any) {
	const breweries = useStore((state) => state.breweries);

	const breweryMarkers = useMemo(
		() =>
			breweries.map((pub: pubTypes) => (
				<Marker
					onClick={() => {
						setShowPopup(pub);
					}}
					key={pub.id}
					longitude={pub.coordinates[0]}
					latitude={pub.coordinates[1]}
					offsetTop={viewport.zoom - 70}
					offsetLeft={viewport.zoom}
				>
					<img
						src={pub.icon}
						className="bg-palePurple rounded-full "
						alt="beer icon"
						width={viewport.zoom + 20}
						height={viewport.zoom + 20}
					/>
				</Marker>
			)),
		[breweries, viewport.zoom],
	);

	return <>{breweryMarkers}</>;
}

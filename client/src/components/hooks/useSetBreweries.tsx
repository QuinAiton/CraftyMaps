import useGetData from './useGetData';
import useStore from './store';
import BreweryTypes from '../../../types/breweryTypes';
// import localBreweries from '../fixtures/breweries';

export default function useSetBreweries() {
	const url = `https://api.foursquare.com/v2/venues/search?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&v=20210501&ll=48.4271,-123.3681&categoryId=50327c8591d4c4b30a586d5d`;
	const { data, error, loading } = useGetData(url);
	const setBreweries = useStore((state: { setBreweries: any }) => state.setBreweries);
	// Fetches Brewery Data, Cleans it, Sets State

	const CleanBreweries: BreweryTypes[] = [];
	data?.response?.venues.forEach((pub: BreweryTypes) => {
		CleanBreweries.push({
			id: pub.id,
			name: pub.name,
			category: pub.categories[0].name,
			icon: pub.categories[0].icon.prefix + 32 + pub.categories[0].icon.suffix,
			location: pub.location.formattedAddress,
			coordinates: [pub.location.lng, pub.location.lat],
			isRouted: false,
		});
	});
	setBreweries(CleanBreweries);
}

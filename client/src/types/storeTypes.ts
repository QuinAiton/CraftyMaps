type storeTypes = {
	breweries: any[];
	routes: any[];
	setRoutes: (routes: any[]) => void;
	currentLocation: any[];
	setCurrentLocation: (location: any[]) => void;
	directions: any[];
	setDirections: (steps: any[]) => void;
};

export default storeTypes

import create from "zustand";

// Creates Object Store
const useStore = create(set => ({
  // Handles brewery Request from API
  breweries: [],
  setBreweries: breweries =>
    set(() => ({
      breweries,
    })),

  // Handles route requests
  routes: [],
  setRoutes: routes =>
    set(() => ({
      routes,
    })),
  selectedRoute: [],
  setSelectedRoute: selectedRoute =>
    set(() => ({
      selectedRoute,
    })),

  // handles location requests
  currentLocation: [],
  setCurrentLocation: currentLocation =>
    set(() => ({
      currentLocation,
    })),

  // handles direction requests
  directions: [],
  setDirections: directions =>
    set(() => ({
      directions,
    })),
}));

export default useStore;

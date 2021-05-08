import create from 'zustand';

// Creates Object Store
const useStore = create((set) => ({
  // Handles brewery Request from API
  breweries: [],
  setBreweries: (breweries) =>
    set((state) => ({
      breweries,
    })),
  // Handles route requests
  routes: [],
  setRoutes: (routes) => {
    set((state) => ({
      routes,
    }));
  },
}));

export default useStore;

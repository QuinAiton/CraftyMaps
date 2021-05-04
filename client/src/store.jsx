import create from 'zustand';

// Creates Object Store
const useStore = create((set) => ({
  // Handles brewery Request from API
  breweries: [],
  setBreweries: (breweries) =>
    set((state) => ({
      breweries,
    })),
}));

export default useStore;

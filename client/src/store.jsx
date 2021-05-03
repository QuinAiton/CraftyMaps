import create from 'zustand';

const useStore = create((set) => ({
  breweries: [],
  setBreweries: (breweries) =>
    set((state) => ({
      breweries,
    })),
}));

export default useStore;

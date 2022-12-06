type storeTypes = {
  breweries: any
  routes: any
  setRoutes: (routes: string[]) => void
  currentLocation: string[]
  setCurrentLocation: (location: string[]) => void
  directions: any
  setDirections: (steps: string[]) => void
}

export default storeTypes

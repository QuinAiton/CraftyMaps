export type BreweryTypes = {
  key: string
  id: string
  name: string
  location: string
  category: string
  coordinates: []
  isRouted: boolean
  addRouteHandler: (id: string) => void
  removeRouteHandler: (id: string) => void
  onSelectBrewery: () => void
}

export default BreweryTypes

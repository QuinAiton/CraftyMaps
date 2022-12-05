import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { StaticMap, MapContext, GeolocateControl } from 'react-map-gl'
import { PathLayer, IconLayer } from '@deck.gl/layers'
import { useLocation } from 'react-router-dom'
import { FaDirections } from 'react-icons/fa'
import axios from 'axios'
import DeckGL from 'deck.gl'
import useStore from '../hooks/store'
import Loading from './Loading'
import SmallNav from './SmallNav'
import TripStats from './TripStats'
import Directions from './Directions'

// types
import BreweryTypes from '../types/breweryTypes'
const geolocateControlStyle = {
  right: 10,
  top: 20,
}

const Navigation = () => {
  const { routes, setRoutes, currentLocation, setCurrentLocation, directions, setDirections } = useStore()

  const [isLoading, setLoading] = useState(true)
  const location = useLocation()
  const mapRef = useRef()

  const getCoordinates = useMemo(() => {
    const breweries = location.state.selectedRoute
    const coords = []
    if (currentLocation) coords.push(currentLocation)
    breweries.forEach((pub: BreweryTypes) => {
      coords.push(pub.coordinates)
    })
    return coords.join(';')
  }, [location, currentLocation])

  const getDirections = useMemo(() => {
    const flattenDirections = routes?.trips[0]?.legs
    let steps: string[] = []
    flattenDirections.forEach((leg: { steps: any }) => {
      steps = [...steps, ...leg?.steps]
    })
    setDirections(steps)
  }, [routes])

  useEffect(() => {
    // gets users Current Location
    const showPosition = (position: { coords: { longitude: any; latitude: any } }) => {
      const userPosition = [position.coords.longitude, position.coords.latitude]
      setCurrentLocation(userPosition)
    }
    // Checks if geolocation is available
    console.log('here')
    console.log(navigator)
    if (navigator.geolocation) {
      console.log(navigator)
      navigator.geolocation.watchPosition(showPosition)
    }
  }, [])

  useEffect(() => {
    // Takes in Chosen Breweries and Formats them for API
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/cycling/${getCoordinates()}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoicXVpbmFpdG9uIiwiYSI6ImNrbjR1NHY4MzF1cmQycmxlY21vOHN4MXIifQ.d7O-EySX4gVmlHRQ0sCb6g`
    axios
      .get(url)
      .then(res => {
        setRoutes(res.data)
        if (routes) getDirections()
        setLoading(false)
      })

      .catch(err => {
        console.log('Error in Route Fetching', err)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  } else {
    // Data for Route Display
    const routesData = [
      {
        name: 'Brewery Route',
        color: [82, 61, 158],
        path: [...routes.trips[0].geometry.coordinates],
      },
    ]
    // Data for Marker Display
    const markerData: { name: string; coordinates: string }[] = []
    const beerMarkers = routes.waypoints.slice(1)
    beerMarkers.map((pub: BreweryTypes) => {
      markerData.push({
        name: pub.name,
        coordinates: pub.location,
      })
      return markerData
    })

    // Data for Location display
    const startingLocation = [
      {
        name: 'current Location',
        coordinates: routes.waypoints[0].location,
      },
    ]

    const ICON_MAPPING = {
      marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
    }

    // adds layers to overlay on map
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
    ]

    // Creates initial state for Deck GL Layer
    const initialState = {
      width: '100vw',
      height: '100vh',
      latitude: routes.waypoints[0].location[1],
      longitude: routes.waypoints[0].location[0],
      zoom: 20,
      bearing: 0,
      pitch: 60,
    }

    return (
      <DeckGL ContextProvider={MapContext.Provider} initialViewState={initialState} controller={true} layers={layers}>
        <StaticMap
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          reuseMaps
          ref={mapRef}
          width={window.innerWidth}
          height={window.innerHeight}
          preventStyleDiffing={true}
        />
        <SmallNav />
        <MapContext.Consumer>
          {outerContext => {
            return (
              <MapContext.Provider
                value={{
                  map: mapRef.current ? mapRef.current.getMap() : null,
                  ...outerContext,
                }}
              >
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={true}
                  style={geolocateControlStyle}
                />
              </MapContext.Provider>
            )
          }}
        </MapContext.Consumer>
        <TripStats />
        <FaDirections />
        <Directions directions={directions} />
      </DeckGL>
    )
  }
}
export default Navigation

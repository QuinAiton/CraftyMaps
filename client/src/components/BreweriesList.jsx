import React, { useState } from 'react'
import useStore from '../hooks/store'
import CardItem from './CardItem'
import Styles from '../Styles/Breweries.module.scss'
import { GiCellarBarrels } from 'react-icons/gi'
import { FaRoute } from 'react-icons/fa'
import { useHistory } from 'react-router'
import { IoArrowDownCircle } from 'react-icons/io5'
const BreweriesList = ({ onSelectBrewery }) => {
  const [open, setOpen] = useState(false)

  const { breweries, selectedRoute, setSelectedRoute } = useStore()

  //Adds Breweries to Optimized Route Filters out Duplicates
  const addRouteHandler = id => {
    const selectedBrewery = breweries.find(pub => pub.id === id)
    if (!selectedRoute.find(pub => pub.id === id)) {
      setSelectedRoute([...selectedRoute, selectedBrewery])
    }
    selectedBrewery.isRouted = true
  }

  const removeRouteHandler = id => {
    const filteredRoute = selectedRoute.filter(route => route.id !== id)
    setSelectedRoute([...filteredRoute])
    const selectedBrewery = breweries.find(pub => pub.id === id)
    selectedBrewery.isRouted = false
  }

  // Sends Chosen Routes Through link Tag
  let history = useHistory()
  const handleRouteSubmit = () => {
    history.push({
      pathname: '/navigation',
      state: {
        selectedRoute,
      },
    })
  }

  // Create BreweryCards
  const breweryCards = breweries.map(pub => {
    return (
      <CardItem
        key={pub.id}
        id={pub.id}
        name={pub.name}
        location={pub.location.join(', ')}
        category={pub.category}
        coordinates={pub.coordinates}
        isRouted={pub.isRouted}
        addRouteHandler={addRouteHandler}
        removeRouteHandler={removeRouteHandler}
        onSelectBrewery={onSelectBrewery}
      />
    )
  })

  return (
    <div className={Styles.container}>
      <div className={Styles.buttonContainer}>
        <button className={Styles.route} onClick={handleRouteSubmit}>
          <FaRoute className={Styles.routeIcon} />
        </button>
        <div>
          {!open ? (
            <GiCellarBarrels className={Styles.open} onClick={() => setOpen(!open)} />
          ) : (
            <div>
              <IoArrowDownCircle className={Styles.close} onClick={() => setOpen(!open)} />
              <ul className={Styles.breweries}>{breweryCards}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default BreweriesList

import React from 'react'
import Styles from '../Styles/CardItem.module.scss'
import { BsCheckCircle } from 'react-icons/bs'
import { FaUndo } from 'react-icons/fa'
import breweryTypes from '../types/breweryTypes'

const CardItem = ({
  name,
  location,
  category,
  id,
  isRouted,
  coordinates,
  addRouteHandler,
  removeRouteHandler,
  onSelectBrewery,
}: breweryTypes) => {
  return (
    <div className={Styles.container} onClick={() => onSelectBrewery(...coordinates)}>
      <h4>{name}</h4>
      <p>{category}</p>
      <p>{location}</p>
      {isRouted ? (
        <div className={Styles.addUndo}>
          <BsCheckCircle style={{ color: 'green', fontSize: '25px' }} />
          <FaUndo style={{ color: 'red', fontSize: '18px' }} onClick={() => removeRouteHandler(id)} />
        </div>
      ) : (
        <button onClick={() => addRouteHandler(id)}>Add to Route</button>
      )}
    </div>
  )
}

export default CardItem

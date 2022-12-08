import React from 'react'
import Styles from '../../Styles/CardItem.module.scss'
import { BsCheckCircle } from 'react-icons/bs'
import { FaUndo } from 'react-icons/fa'
import breweryTypes from '../../types/breweryTypes'

type propTypes = {
  key: string
  id: string
  name: string
  location: string
  category: string
  coordinates: [number, number]
  isRouted: boolean
  addRouteHandler: (id: string) => void
  removeRouteHandler: (id: string) => void
  onSelectBrewery: (lng: number, lat: number) => void
}
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
}: propTypes) => {
  return (
		<div className={Styles.container} onClick={() => onSelectBrewery(...coordinates)}>
			<h4>{name}</h4>
			<p className="p">{category}</p>
			<p className="p">{location}</p>
			{isRouted ? (
				<div className={Styles.addUndo}>
					<BsCheckCircle style={{ color: 'green', fontSize: '25px' }} />
					<FaUndo style={{ color: 'red', fontSize: '18px' }} onClick={() => removeRouteHandler(id)} />
				</div>
			) : (
				<button className="button" onClick={() => addRouteHandler(id)}>
					Add to Route
				</button>
			)}
		</div>
	);
}

export default CardItem

import React, { useState } from 'react'
import useStore from '../hooks/store';
import CardItem from './CardItem'
import Styles from '../../Styles/Breweries.module.scss'
import { Button } from 'antd';
import { GiCellarBarrels } from 'react-icons/gi';
import { FaRoute } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { IoArrowDownCircle } from 'react-icons/io5';
import breweryTypes from '../../types/breweryTypes';
type PropTypes = {
	onSelectBrewery: any;
};

// TODO: figure out solution so proptype is not any

const BreweriesList = ({ onSelectBrewery }: PropTypes) => {
	const [open, setOpen] = useState(false);

	const { breweries, selectedRoute, setSelectedRoute } = useStore();

	//Adds Breweries to Optimized Route Filters out Duplicates
	const addRouteHandler = (id: string) => {
		const selectedBrewery: any = breweries.find((pub: { id: string }) => pub.id === id);
		if (!selectedRoute.find((pub: { id: string }) => pub.id === id)) {
			setSelectedRoute([...selectedRoute, selectedBrewery]);
		}
		if (selectedBrewery) {
			selectedBrewery.isRouted = true;
		}
	};

	const removeRouteHandler = (id: string) => {
		const filteredRoute = selectedRoute.filter((route: { id: string }) => route.id !== id);
		setSelectedRoute([...filteredRoute]);
		const selectedBrewery: any = breweries.find((pub: { id: string }) => pub.id === id);
		if (selectedBrewery) {
			selectedBrewery.isRouted = true;
		}
	};

	// Sends Chosen Routes Through link Tag
	let history = useHistory();
	const handleRouteSubmit = () => {
		history.push({
			pathname: '/navigation',
			state: {
				selectedRoute,
			},
		});
	};

	// Create BreweryCards
	const breweryCards = breweries.map((pub: breweryTypes) => {
		return (
			<CardItem
				key={pub.id}
				id={pub.id}
				name={pub.name}
				location={pub.location}
				category={pub.category}
				coordinates={pub.coordinates}
				isRouted={pub.isRouted}
				addRouteHandler={addRouteHandler}
				removeRouteHandler={removeRouteHandler}
				onSelectBrewery={onSelectBrewery}
			/>
		);
	});

	return (
		<div className={Styles.container}>
			<div className={Styles.buttonContainer}>
				<FaRoute className={Styles.roundIcon} onClick={handleRouteSubmit} />
				<div>
					{!open ? (
						<Button
							shape={'circle'}
							type="primary"
							size="large"
							// icon={<GiCellarBarrels className={Styles.roundIcon} />}
							onClick={() => setOpen(!open)}
						/>
					) : (
						// <GiCellarBarrels className={Styles.roundIcon} onClick={() => setOpen(!open)} />
						<div>
							<IoArrowDownCircle className={Styles.close} onClick={() => setOpen(!open)} />
							<ul className={Styles.breweries}>{breweryCards}</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};;;
export default BreweriesList

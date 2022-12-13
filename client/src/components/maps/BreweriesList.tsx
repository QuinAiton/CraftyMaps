import React, { useState } from 'react'
import useStore from '../hooks/store';
import CardItem from './CardItem'
import Styles from '../../Styles/Breweries.module.scss';
import CustomRoundButton from '../shared/CustomRoundButton';
import { Button } from '@nextui-org/react';
import { GiCellarBarrels } from 'react-icons/gi';
import { FaRoute, FaTimes } from 'react-icons/fa';
import { useHistory } from 'react-router';
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
		<div className=" w-full h-full flex flex-col">
			<div className=" relative top-2/3 left-2 space-y-2 z-10 w-14">
				{selectedRoute.length > 0 && (
					<CustomRoundButton onClick={handleRouteSubmit} icon={<FaRoute className="text-customWhite text-3xl" />} />
				)}
				{!open && (
					<CustomRoundButton
						onClick={() => setOpen(!open)}
						icon={<GiCellarBarrels className="text-customWhite text-3xl" />}
					/>
				)}
			</div>
			<div>
				<div className={`${open && 'absolute top-1/3'} ${!open && 'fixed top-[1000px]'} transition-all`}>
					<div className="absolute right-1 -top-3">
						<CustomRoundButton
							icon={<FaTimes className="text-customWhite text-3xl" />}
							onClick={() => setOpen(!open)}
						/>
					</div>
					<ul className="m-2">{breweryCards}</ul>
				</div>
			</div>
		</div>
	);
};
export default BreweriesList;
0;
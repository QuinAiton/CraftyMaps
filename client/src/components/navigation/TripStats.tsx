import React from 'react';
import useStore from '../../hooks/store';
// import Styles from '../Styles/TripStats.module.scss';
const TripStats = () => {
	const tripInfo = useStore((state: any) => state.routes.trips[0]);
	const distance = (tripInfo.distance / 1000).toFixed(1);
	const time = (tripInfo.duration / 60 ** 2).toFixed(1);

	return (
		<div className="w-1/2 p-5 text-sm bg-customWhite bg-opacity-50 font-bitter space-y-3">
			<div>
				<h4 className="text-customPurple">Total Distance</h4>
				<span>{distance}KM</span>
			</div>
			<div>
				<h4 className="text-customPurple">Estimated Time</h4>
				<span>{time}Hrs</span>
			</div>
		</div>
	);
};

export default TripStats;

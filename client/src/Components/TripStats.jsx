import React from 'react';
import useStore from '../store';
const TripStats = () => {
  const tripInfo = useStore((state) => state.routes.trips[0]);
  const distance = (tripInfo.distance / 1000).toFixed(1);
  const time = (tripInfo.duration / 60 ** 2).toFixed(1);

  return (
    <div>
      <h4>Total Distance</h4>
      <span>{distance}KM</span>
      <h4>Estimated Time</h4>
      <span>{time}Hrs</span>
    </div>
  );
};

export default TripStats;

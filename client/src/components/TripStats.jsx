import React from "react";
import useStore from '../hooks/store'
import Styles from "../Styles/TripStats.module.scss";
const TripStats = () => {
  const tripInfo = useStore(state => state.routes.trips[0]);
  const distance = (tripInfo.distance / 1000).toFixed(1);
  const time = (tripInfo.duration / 60 ** 2).toFixed(1);

  return (
    <div className={Styles.container}>
      <div>
        <h4>Total Distance</h4>
        <span>{distance}KM</span>
      </div>
      <div>
        <h4>Estimated Time</h4>
        <span>{time}Hrs</span>
      </div>
    </div>
  );
};

export default TripStats;

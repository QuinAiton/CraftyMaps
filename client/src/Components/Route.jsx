import React from 'react';
import useStore from '../store';
import Styles from '../Styles/Route.module.scss';
import { BsPlusCircleFill } from 'react-icons/bs';
import Directions from './Directions';
const Route = () => {
  const routes = useStore((state) => state.routes.trips[0].legs);

  const getSteps = routes.forEach((location) => {
    console.log(location);
    location.steps.forEach((step) => {
      return <Directions steps={step} />;
    });
  });

  console.log(getSteps);
  return (
    <div className={Styles.container}>
      <div className={Styles.Toggle}>
        <BsPlusCircleFill className={Styles.open} />
        <input type='checkbox' />
        <ul className={Styles.directions}>{getSteps}</ul>
      </div>
    </div>
  );
};

export default Route;

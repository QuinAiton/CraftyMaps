import React, { useState } from 'react';
import useStore from '../store';
import CardItem from './CardItem';
import Styles from '../Styles/Breweries.module.scss';
import { BsPlusCircleFill } from 'react-icons/bs';
import { HiMinusCircle } from 'react-icons/hi';
import { FaRoute } from 'react-icons/fa';
import Link from 'react-router-dom/Link';

const Breweries = () => {
  const [open, setOpen] = useState(false);

  const { breweries, selectedRoute, setSelectedRoute } = useStore();

  //Adds Breweries to Optimized Route Filters out Duplicates
  const addRouteHandler = (id) => {
    const selectedBrewery = breweries.find((pub) => pub.id === id);
    if (!selectedRoute.find((pub) => pub.id === id)) {
      setSelectedRoute([...selectedRoute, selectedBrewery]);
    }
  };

  const breweryCards = breweries.map((pub) => {
    return (
      <CardItem
        key={pub.id}
        id={pub.id}
        name={pub.name}
        location={pub.location.join(', ')}
        category={pub.category}
        addRouteHandler={addRouteHandler}
      />
    );
  });
  return (
    <div className={Styles.container}>
      <Link to='/navigation'>
        <button className={Styles.route}>
          <FaRoute className={Styles.routeIcon} />
        </button>
      </Link>
      <div className={Styles.breweryToggle} onClick={() => setOpen(!open)}>
        {open ? (
          <HiMinusCircle className={Styles.close} />
        ) : (
          <BsPlusCircleFill className={Styles.open} />
        )}
        <input type='checkbox' />
        <ul className={Styles.breweries}>{breweryCards}</ul>
      </div>
    </div>
  );
};
export default Breweries;

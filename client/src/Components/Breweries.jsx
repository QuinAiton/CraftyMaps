import React, { useState } from 'react';
import useStore from '../store';
import CardItem from './CardItem';
import Styles from '../Styles/Breweries.module.scss';
import beerIcon from './beer.svg';
import { HiMinusCircle } from 'react-icons/hi';
import { FaRoute } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { GiCellarBarrels } from 'react-icons/gi';
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
      <button className={Styles.route} onClick={handleRouteSubmit}>
        <FaRoute className={Styles.routeIcon} />
      </button>

      <div className={Styles.breweryToggle}>
        {open ? (
          <HiMinusCircle className={Styles.close} />
        ) : (
          <GiCellarBarrels className={Styles.open} />
        )}
        <input type='checkbox' onClick={() => setOpen(!open)} />
        <ul className={Styles.breweries}>{breweryCards}</ul>
      </div>
    </div>
  );
};
export default Breweries;

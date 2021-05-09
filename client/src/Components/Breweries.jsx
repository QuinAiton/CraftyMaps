import React from 'react';
import useStore from '../store';
import CardItem from './CardItem';
import Styles from '../Styles/Cards.module.scss';
import { BsPlusCircleFill } from 'react-icons/bs';

const Cards = () => {
  const breweries = useStore((state) => state.breweries);

  const breweryCards = breweries.map((pub) => {
    return (
      <CardItem
        key={pub.id}
        name={pub.name}
        location={(pub.location.address, pub.location.crossStreet)}
      />
    );
  });
  return (
    <div className={Styles.container}>
      <div className={Styles.breweryToggle}>
        <BsPlusCircleFill className={Styles.open} />
        <input type='checkbox' />
        <ul className={Styles.breweries}>{breweryCards}</ul>
      </div>
    </div>
  );
};
export default Cards;

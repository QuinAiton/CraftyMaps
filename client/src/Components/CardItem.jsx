import React from 'react';
import Styles from '../Styles/CardItem.module.scss';
const CardItem = ({ name, location }) => {
  return (
    <div className={Styles.container}>
      <h1>{name}</h1>
      <p>{location}</p>
    </div>
  );
};

export default CardItem;

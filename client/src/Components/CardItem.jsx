import React from 'react';
import Styles from '../Styles/CardItem.module.scss';
const CardItem = ({ name, location, category, id, addRouteHandler }) => {
  return (
    <div className={Styles.container}>
      <h4>{name}</h4>
      <p>{category}</p>
      <p>{location}</p>
      <button onClick={() => addRouteHandler(id)}>Add to Route</button>
    </div>
  );
};

export default CardItem;

import React from 'react';
import useStore from '../store';
import Styles from '../Styles/CardItem.module.scss';
import {BsCheckCircle} from 'react-icons/bs'
const CardItem = ({ name, location, category, id, isRouted, addRouteHandler }) => {
  const {selectedRoute}= useStore();
  return (
    <div className={Styles.container}>
      <h4>{name}</h4>
      <p>{category}</p>
      <p>{location}</p>

      {
      isRouted?
      <BsCheckCircle style={{color:'green',fontSize:'25px', justifyContent:"center"}}/>
      :
      <button onClick={() => addRouteHandler(id)}>Add to Route</button> 
      }
    </div>
  );
};

export default CardItem;

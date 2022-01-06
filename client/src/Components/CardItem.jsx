import React from 'react';
import useStore from '../store';
import Styles from '../Styles/CardItem.module.scss';
import {BsCheckCircle} from 'react-icons/bs';
import {FaUndo} from 'react-icons/fa'
const CardItem = ({ name, location, category, id, isRouted, coordinates, addRouteHandler, removeRouteHandler, onSelectBrewery}) => {
  const {selectedRoute}= useStore();
  return (
    <div className={Styles.container} onClick={()=> onSelectBrewery(...coordinates)} > 
      <h4>{name}</h4>
      <p>{category}</p>
      <p>{location}</p>
      {
      isRouted? 
      <div className={Styles.addUndo}>
      <BsCheckCircle style={{color:'green',fontSize:'25px', justifyContent:"center"}}/>
      <button onClick={()=> removeRouteHandler(id)}><FaUndo/></button>
      </div>
      :
      <button onClick={() => addRouteHandler(id)}>Add to Route</button> 
      }
    </div> 
  );
};

export default CardItem;

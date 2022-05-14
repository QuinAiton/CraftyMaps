import Styles from '../Styles/Header.module.scss';
import React from 'react';

const Header = () => {
  return (
    <div className={Styles.container}>
      <h1>Crafty Maps</h1>
      <p> Your thirst Ends here</p>
    </div>
  );
};

export default Header;

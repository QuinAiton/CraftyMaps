import React from 'react'
import Styles from '../Styles/SmallNav.module.scss'
const SmallNav = () => {
  return (
    <nav className={Styles.container} role="navigation">
      <div className={Styles.menuToggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul className={Styles.menu}>
          <li>
            <a href="#brewery">Breweries</a>
          </li>
          <li>
            <a href="#savedRoutes">Saved Routes</a>
          </li>
          <li>
            <a href="#savedRoutes">Login/Register</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default SmallNav

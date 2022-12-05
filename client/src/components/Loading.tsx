import Styles from '../Styles/Loading.module.scss'
import React from 'react'
import { SiOpenstreetmap } from 'react-icons/si'

const Loading = () => {
  return (
    <div className={Styles.Loading}>
      <div className={Styles.noFreezeSpinner}>
        <div id={Styles.noFreezeSpinner}>
          <div>
            <i>
              <SiOpenstreetmap />
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading

import Styles from '../Styles/Route.module.scss'
import React from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import useStore from '../../hooks/store'
import Directions from './Directions'

const Route = () => {
  const routes = useStore((state: any) => state.routes.trips[0].legs)
  const getSteps = routes.forEach((location: { steps: any[] }) => {
    location.steps.forEach((step: any) => {
      return <Directions steps={step} />
    })
  })

  console.log(getSteps)
  return (
    <div className={Styles.container}>
      <div className={Styles.Toggle}>
        <BsPlusCircleFill className={Styles.open} />
        <input type="checkbox" />
        <ul className={Styles.directions}>{getSteps}</ul>
      </div>
    </div>
  )
}

export default Route

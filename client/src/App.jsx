import { useEffect, useState } from 'react';
import SmallNav from './Components/SmallNav';
import Map from './Components/Map';
import './Styles/App.scss';
import useStore from '../src/store';
import axios from 'axios';

function App() {
  // const setBreweries = useStore((state) => state.setBreweries);
  // const breweries = useStore((state) => state.breweries);

  const { setBreweries, breweries } = useStore();
  const url = `http://beermapping.com/webservice/locquery/${process.env.REACT_APP_BEERMAP_KEY}/victoria&s=json`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.data)
      .then((breweries) => setBreweries(breweries));
  }, []);

  console.log(breweries, 'brew');
  return (
    <div className='App-Container'>
      <SmallNav />
      <h1>Crafty Maps</h1>
      <Map />
    </div>
  );
}

export default App;

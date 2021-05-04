import { useEffect } from 'react';
import SmallNav from './Components/SmallNav';
import Map from './Components/Map';
import './Styles/App.scss';
import useStore from './store';
import axios from 'axios';

function App() {
  const { setBreweries, breweries } = useStore();
  const url = `https://api.foursquare.com/v2/venues/search?client_id=${process.env.REACT_APP_PLACES_ID}&client_secret=${process.env.REACT_APP_PLACES_SECRET}&v=20210501&ll=48.4271,-123.3681&categoryId=50327c8591d4c4b30a586d5d`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.data.response)
      .then((breweries) => setBreweries(breweries.venues));
  }, [setBreweries, url]);

  return (
    <div className='App-Container'>
      <SmallNav />
      <h1>Crafty Maps</h1>
      <Map />
    </div>
  );
}

export default App;
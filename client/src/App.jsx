import './Styles/App.scss';
import { useEffect } from 'react';
import useStore from './store';
import axios from 'axios';
import Navigation from './Components/Navigation';
import Map from './Components/Map';

function App() {
  const setBreweries = useStore((state) => state.setBreweries);
  const url = `https://api.foursquare.com/v2/venues/search?client_id=${process.env.REACT_APP_PLACES_ID}&client_secret=${process.env.REACT_APP_PLACES_SECRET}&v=20210501&ll=48.4271,-123.3681&categoryId=50327c8591d4c4b30a586d5d`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.data.response)
      .then((breweries) => setBreweries(breweries.venues));
  }, [setBreweries, url]);

  return (
    <div className='App-Container'>
      {/* <Navigation /> */}
      <Map />
    </div>
  );
}

export default App;

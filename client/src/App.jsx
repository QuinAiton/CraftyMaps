import './Styles/App.scss';
import { useEffect } from 'react';
import useStore from './store';
import axios from 'axios';
import Navigation from './Components/Navigation';
import Map from './Components/Map';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
  const setBreweries = useStore((state) => state.setBreweries);
  const url = `https://api.foursquare.com/v2/venues/search?client_id=${process.env.REACT_APP_PLACES_ID}&client_secret=${process.env.REACT_APP_PLACES_SECRET}&v=20210501&ll=48.4271,-123.3681&categoryId=50327c8591d4c4b30a586d5d`;

  // Fetches Brewery Data, Cleans it, Sets State
  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.data.response)
      .then((breweries) => {
        const CleanBreweries = [];
        breweries.venues.map((pub) => {
          CleanBreweries.push({
            id: pub.id,
            name: pub.name,
            category: pub.categories[0].name,
            icon:
              pub.categories[0].icon.prefix +
              32 +
              pub.categories[0].icon.suffix,
            location: pub.location.formattedAddress,
            coordinates: [pub.location.lng, pub.location.lat],
          });
        });
        setBreweries(CleanBreweries);
      });
  }, [setBreweries, url]);

  return (
    <Router>
      <div className='App-Container'>
        <Switch>
          <Route path='/' exact>
            <Map />
          </Route>
          <Route path='/navigation'>
            <Navigation />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

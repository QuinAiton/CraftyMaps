import './Styles/App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import useStore from './hooks/store'
import Navigation from './components/Navigation'
import Map from './components/Map'
import breweries from './components/breweries'
import BreweryTypes from './types/breweryTypes'
function App() {
  const setBreweries = useStore((state: { setBreweries: any }) => state.setBreweries)
  // const url = `https://api.foursquare.com/v2/venues/search?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20210501&ll=48.4271,-123.3681&categoryId=50327c8591d4c4b30a586d5d`;

  // Fetches Brewery Data, Cleans it, Sets State
  // useEffect(() => {
  //   axios
  //     .get(url)
  // .then((res) => res.data.response)
  // .then((breweries) => {
  //   const CleanBreweries = [];
  //   breweries.venues.forEach((pub) => {
  //     CleanBreweries.push({
  //       id: pub.id,
  //       name: pub.name,
  //       category: pub.categories[0].name,
  //       icon:
  //         pub.categories[0].icon.prefix +
  //         32 +
  //         pub.categories[0].icon.suffix,
  //       location: pub.location.formattedAddress,
  //       coordinates: [pub.location.lng, pub.location.lat],
  //       isRouted:false
  //     });
  //   });
  //   setBreweries(CleanBreweries);
  //     });
  // }, [setBreweries, url]);

  const cleanBreweries: BreweryTypes[] = []
  breweries.forEach(pub => {
    cleanBreweries.push({
      id: pub.id,
      name: pub.name,
      category: pub.type,
      icon: pub.icon,
      location: pub.address.join(', '),
      coordinates: [pub.lng, pub.lat],
      isRouted: false,
    })
  })
  setBreweries(cleanBreweries)

  return (
    <Router>
      <div className="App-Container">
        <Switch>
          <Route path="/" exact>
            <Map />
          </Route>
          <Route path="/navigation">
            <Navigation />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

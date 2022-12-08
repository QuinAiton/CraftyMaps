import './Styles/App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import Map from './components/maps/Map'
import useSetBreweries from './hooks/useSetBreweries'

function App() {
  useSetBreweries()
  return (
    <Router>
      <div className="App-Container">
        <Switch>
          <Route path="/" exact>
            {/* <Home /> */}
          </Route>
          <Route path="/map" exact>
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

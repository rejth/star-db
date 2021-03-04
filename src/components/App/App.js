import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../Pages';
import ErrorBoundry from '../ErrorBoundry';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import './App.css';

const App = () => {
  const swapiService = new SwapiService();
  return (
    <ErrorBoundry>
      <SwapiServiceProvider value={swapiService}>
        <Router>
          <div className="stardb-app">
            <Header />
            <RandomPlanet />
            <Route
              path="/"
              exact={true}
              render={() => <h2>Welcome to StarDB</h2>}
            />
            <Route path="/people" component={PeoplePage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route path="/starships" component={StarshipsPage} />
          </div>
        </Router>
      </SwapiServiceProvider>
    </ErrorBoundry>
  );
};

export default App;

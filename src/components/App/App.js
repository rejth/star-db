import React from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import { PeoplePage } from '../Pages';
import ErrorBoundry from '../ErrorBoundry';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import './App.css';

const App = () => {
  const swapiService = new SwapiService();
  return (
    <ErrorBoundry>
      <SwapiServiceProvider value={swapiService}>
        <div className="stardb-app">
          <Header />
          <RandomPlanet />
          <PeoplePage />
        </div>
      </SwapiServiceProvider>
    </ErrorBoundry>
  );
};

export default App;

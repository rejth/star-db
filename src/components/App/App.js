import React, { Component } from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator';
import ErrorButton from '../ErrorButton';
import ErrorBoundry from '../ErrorBoundry';
import PeoplePage from '../PeoplePage';

import './App.css';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState(state => ({
      showRandomPlanet: !state.showRandomPlanet,
    }));
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) return <ErrorIndicator />;

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const buttons = (
      <div className="row mb2 button-row">
        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}
        >
          Toggle Random Planet
        </button>
        <ErrorButton />
      </div>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          {planet}
          {buttons}
          <PeoplePage />
        </div>
      </ErrorBoundry>
    );
  }
}

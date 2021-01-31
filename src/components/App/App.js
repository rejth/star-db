import React, { Component } from 'react';
import Header from '../Header';
import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';
import RandomPlanet from '../RandomPlanet';
import './App.css';

export default class App extends Component {
  state = {
    selectedPerson: null, // id персонажа
  };

  onPersonSelected = id => {
    this.setState({ selectedPerson: id });
  };

  render() {
    return (
      <div>
        <Header />
        <RandomPlanet />
        <div className="row">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}

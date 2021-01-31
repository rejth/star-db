import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';
import './RandomPlanet.css';

// В этом компоненте используется паттерн "Разделение обязанностей"
// Компонент RandomPlanet отвечает за логику, содержит состояние и принимает данные по API,
// передавая их компоненту PlanetView для рендеринга.
// компонент PlanetView отвечает только за контент, рендеринг содержимого и отделен
// от основной логики, не знает откуда приходят данные

export default class RandomPlanet extends Component {
  // состояние
  state = {
    planet: {},
    loading: true,
    error: false,
  };

  // API
  swapiService = new SwapiService();

  // обновление контента и состояния компонента по API
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 2;

    this.swapiService
      .getPlanet(id)
      .then(planet => this.setState({ planet, loading: false }))
      .catch(() => this.setState({ error: true, loading: false }));
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  render() {
    const { planet, loading, error } = this.state;
    const hasData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

// Компонент с информацией о планете
const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  // React.Fragment позволяет группировать JSX-компоненты, не создавая дополнительного DOM-объекта
  // Иначе пришлось бы создавать обертку div, потому что компонент может рендерить только корневой DOM-объект
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

PlanetView.propTypes = {
  planet: PropTypes.object.isRequired,
};

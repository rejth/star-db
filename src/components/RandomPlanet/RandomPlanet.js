import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import ErrorBoundry from '../ErrorBoundry';
import { SwapiServiceWrapper } from '../HocHelpers';
import './RandomPlanet.css';

// В этом компоненте используется паттерн "Разделение обязанностей"
// Компонент RandomPlanet отвечает за логику, содержит состояние и принимает данные по API,
// передавая их компоненту PlanetView для рендеринга.
// компонент PlanetView отвечает только за контент, рендеринг содержимого и отделен
// от основной логики, не знает откуда приходят данные

// Карточка со случайной планетой
class RandomPlanet extends Component {
  // состояние компонента
  state = {
    planet: {}, // характеристики планеты
    loading: true, // индикатор загрузки
  };

  // обновление состояния компонента по API
  updatePlanet = () => {
    const { getData } = this.props;
    const id = Math.floor(Math.random() * 25) + 3; // случайный id планеты
    // запрос к серверу
    getData(id)
      .then(planet => this.setState({ planet, loading: false }))
      .catch(() => this.setState({ loading: false }));
  };

  // 1. В конструкторе не должно быть запросов к серверу по API - это плохая практика!
  // 2. На этапе constructor() компоннет еще не встроен в DOM-дерево (Unmounting), поэтому вызывать setState нельзя!
  // поэтому вместо constructor() используем componentDidMount()
  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
  }

  // удаляем таймер после удаления компонента
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { planet, loading } = this.state;
    const hasData = !loading;

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <ErrorBoundry>
        <div className="random-planet jumbotron rounded">
          {spinner}
          {content}
        </div>
      </ErrorBoundry>
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

const mapMethodsToProps = swapiService => ({
  getData: swapiService.getPlanet,
});

RandomPlanet.propTypes = {
  getData: PropTypes.func.isRequired,
};

PlanetView.propTypes = {
  planet: PropTypes.object.isRequired,
};

export default SwapiServiceWrapper(RandomPlanet, mapMethodsToProps);

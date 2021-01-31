import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';
import './ItemList.css';

// Список жителей планеты
export default class ItemList extends Component {
  // состояние компонента
  state = {
    peopleList: null, // список всех персонажей
  };

  // API
  swapiService = new SwapiService();

  // componentDidMount() - best practice для получения данных от сервера по API
  componentDidMount() {
    this.swapiService.getAllPeople().then(peopleList => {
      this.setState({
        peopleList,
      });
    });
  }

  // Функция для создания элемента списка
  renderListItem(arr) {
    return arr.map(({ id, name }) => (
      <li
        className="list-group-item"
        key={id}
        onClick={() => this.props.onItemSelected(id)}
      >
        {name}
      </li>
    ));
  }

  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }

    const items = this.renderListItem(peopleList);

    return (
      <div className="item-list">
        <ul className="list-group">{items}</ul>
      </div>
    );
  }
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

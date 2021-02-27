import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

import './ItemList.css';

// Список сущностей (людей, планет, кораблей)
export default class ItemList extends Component {
  // состояние компонента
  state = {
    itemList: null, // список всех сущностей
  };

  // componentDidMount() - best practice для получения данных от сервера по API
  componentDidMount() {
    const { getData } = this.props;
    getData().then(itemList => {
      this.setState({
        itemList,
      });
    });
  }

  // Функция для создания элемента списка
  renderListItem(arr) {
    return arr.map(item => {
      const { id } = item;
      const label = this.props.children(item); // паттерн children (см. файл patterns)
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) return <Spinner />;

    const items = this.renderListItem(itemList);

    return (
      <div className="item-list">
        <ul className="list-group">{items}</ul>
      </div>
    );
  }
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

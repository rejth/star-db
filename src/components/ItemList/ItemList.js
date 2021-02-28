import React from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import ComponentWrapper from '../HocHelpers';

import './ItemList.css';

// API
const { getAllPeople } = new SwapiService();

// список сущностей (людей, планет, кораблей)
const ItemList = props => {
  const { data, onItemSelected, children: renderLabel } = props;

  // функция для создания элемента списка
  const items = data.map(item => {
    const { id } = item;
    const label = renderLabel(item); // паттерн children (см. файл patterns)
    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {label}
      </li>
    );
  });

  return (
    <div className="item-list">
      <ul className="list-group">{items}</ul>
    </div>
  );
};

ItemList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default ComponentWrapper(ItemList, getAllPeople);

import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundry from '../ErrorBoundry';
import './ItemList.css';

// список всех сущностей (людей, планет или кораблей)
const ItemList = props => {
  const { data, onItemSelected, children: renderLabel } = props;

  // функция для создания элемента списка
  const items = data.map(item => {
    const { id } = item;
    const label = renderLabel(item); // паттерн children

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
    <ErrorBoundry>
      <div className="item-list">
        <ul className="list-group">{items}</ul>
      </div>
    </ErrorBoundry>
  );
};

ItemList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default ItemList;

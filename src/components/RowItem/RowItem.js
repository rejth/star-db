import React from 'react';
import PropTypes from 'prop-types';

const RowItem = ({ item, field, label }) => (
  <li className="list-group-item">
    <span className="term">{label}</span>
    <span>{item[field]}</span>
  </li>
);

RowItem.propTypes = {
  item: PropTypes.object,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default RowItem;

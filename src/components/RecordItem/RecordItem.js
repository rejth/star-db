import React from 'react';
import PropTypes from 'prop-types';

const RecordItem = ({ item, field, label }) => (
  <li className="list-group-item">
    <span className="term">{label}</span>
    <span>{item[field]}</span>
  </li>
);

RecordItem.propTypes = {
  item: PropTypes.object,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default RecordItem;

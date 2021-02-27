import React from 'react';
import PropTypes from 'prop-types';

const RowEntity = ({ left, right }) => (
  <div className="row mb2">
    <div className="col-md-6">{left}</div>
    <div className="col-md-6">{right}</div>
  </div>
);

RowEntity.propTypes = {
  left: PropTypes.object.isRequired,
  right: PropTypes.object.isRequired,
};

export default RowEntity;

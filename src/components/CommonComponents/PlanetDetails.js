import React from 'react';
import PropTypes from 'prop-types';
import ItemDetails from '../ItemDetails';
import RecordItem from '../RecordItem';
import { SwapiServiceWrapper } from '../HocHelpers';

const PlanetDetails = props => (
  <ItemDetails {...props}>
    <RecordItem field="population" label="Population" />
    <RecordItem field="rotationPeriod" label="Rotation period" />
    <RecordItem field="diameter" label="Diameter" />
    <RecordItem field="terrain" label="Terrain" />
  </ItemDetails>
);

const mapMethodsToProps = swapiService => ({
  getData: swapiService.getPlanet,
  getImageUrl: swapiService.getPlanetImageUrl,
});

PlanetDetails.propTypes = {
  id: PropTypes.string.isRequired,
  swapiService: PropTypes.object.isRequired,
};

export default SwapiServiceWrapper(PlanetDetails, mapMethodsToProps);

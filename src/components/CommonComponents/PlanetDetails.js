import React from 'react';
import PropTypes from 'prop-types';
import ItemDetails from '../ItemDetails';
import RecordItem from '../RecordItem';
import { SwapiServiceWrapper } from '../HocHelpers';

const PlanetDetails = ({ id, swapiService }) => {
  const { getPlanet, getPlanetImageUrl } = swapiService;
  return (
    <ItemDetails
      itemId={id}
      getData={getPlanet}
      getImageUrl={getPlanetImageUrl}
    >
      <RecordItem field="population" label="Population" />
      <RecordItem field="rotationPeriod" label="Rotation period" />
      <RecordItem field="diameter" label="Diameter" />
      <RecordItem field="terrain" label="Terrain" />
    </ItemDetails>
  );
};

PlanetDetails.propTypes = {
  id: PropTypes.string.isRequired,
  swapiService: PropTypes.object.isRequired,
};

export default SwapiServiceWrapper(PlanetDetails);

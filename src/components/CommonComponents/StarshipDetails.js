import React from 'react';
import PropTypes from 'prop-types';
import ItemDetails from '../ItemDetails';
import RecordItem from '../RecordItem';
import { SwapiServiceWrapper } from '../HocHelpers';

const StarshipDetails = ({ id, swapiService }) => {
  const { getStarship, getStarshipImageUrl } = swapiService;
  return (
    <ItemDetails
      itemId={id}
      getData={getStarship}
      getImageUrl={getStarshipImageUrl}
    >
      <RecordItem field="model" label="Model" />
      <RecordItem field="starshipClass" label="Starship class" />
      <RecordItem field="manufacturer" label="Manufacturer" />
      <RecordItem field="costInCredits" label="Cost in credits" />
      <RecordItem field="length" label="Length" />
      <RecordItem field="crew" label="Crew" />
      <RecordItem field="passengers" label="Passengers" />
    </ItemDetails>
  );
};

StarshipDetails.propTypes = {
  id: PropTypes.string.isRequired,
  swapiService: PropTypes.object.isRequired,
};

export default SwapiServiceWrapper(StarshipDetails);

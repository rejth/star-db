import React from 'react';
import PropTypes from 'prop-types';
import ItemDetails from '../ItemDetails';
import RecordItem from '../RecordItem';
import { SwapiServiceWrapper } from '../HocHelpers';

const PersonDetails = ({ id, swapiService }) => {
  const { getPerson, getPersonImageUrl } = swapiService;
  return (
    <ItemDetails
      itemId={id}
      getData={getPerson}
      getImageUrl={getPersonImageUrl}
    >
      <RecordItem field="gender" label="Gender" />
      <RecordItem field="birthYear" label="Birth Year" />
      <RecordItem field="eyeColor" label="Eye color" />
      <RecordItem field="hairColor" label="Hair Color" />
      <RecordItem field="skinColor" label="Skin Color" />
      <RecordItem field="height" label="Height" />
      <RecordItem field="mass" label="Mass" />
    </ItemDetails>
  );
};

PersonDetails.propTypes = {
  id: PropTypes.string.isRequired,
  swapiService: PropTypes.object.isRequired,
};

export default SwapiServiceWrapper(PersonDetails);

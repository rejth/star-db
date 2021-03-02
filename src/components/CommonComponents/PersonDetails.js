import React from 'react';
import ItemDetails from '../ItemDetails';
import RecordItem from '../RecordItem';
import { SwapiServiceWrapper } from '../HocHelpers';

const PersonDetails = props => (
  <ItemDetails {...props}>
    <RecordItem field="gender" label="Gender" />
    <RecordItem field="birthYear" label="Birth Year" />
    <RecordItem field="eyeColor" label="Eye color" />
    <RecordItem field="hairColor" label="Hair Color" />
    <RecordItem field="skinColor" label="Skin Color" />
    <RecordItem field="height" label="Height" />
    <RecordItem field="mass" label="Mass" />
  </ItemDetails>
);

const mapMethodsToProps = swapiService => ({
  getData: swapiService.getPerson,
  getImageUrl: swapiService.getPersonImageUrl,
});

export default SwapiServiceWrapper(mapMethodsToProps)(PersonDetails);

import React from 'react';
import ItemDetails from '../ItemDetails';
import RecordItem from '../RecordItem';
import { SwapiServiceWrapper } from '../HocHelpers';

const StarshipDetails = props => (
  <ItemDetails {...props}>
    <RecordItem field="model" label="Model" />
    <RecordItem field="starshipClass" label="Starship class" />
    <RecordItem field="manufacturer" label="Manufacturer" />
    <RecordItem field="costInCredits" label="Cost in credits" />
    <RecordItem field="length" label="Length" />
    <RecordItem field="crew" label="Crew" />
    <RecordItem field="passengers" label="Passengers" />
  </ItemDetails>
);

const mapMethodsToProps = swapiService => ({
  getData: swapiService.getStarship,
  getImageUrl: swapiService.getStarshipImageUrl,
});

export default SwapiServiceWrapper(mapMethodsToProps)(StarshipDetails);

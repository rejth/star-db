import React from 'react';
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

export default SwapiServiceWrapper(mapMethodsToProps)(PlanetDetails);

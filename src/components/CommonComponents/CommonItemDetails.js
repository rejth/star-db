import React from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import ItemDetails from '../ItemDetails';
import RecordItem from '../RecordItem';

const swapiService = new SwapiService();

const {
  getPerson,
  getStarship,
  getPlanet,
  getPersonImageUrl,
  getStarshipImageUrl,
  getPlanetImageUrl,
} = swapiService;

const PersonDetails = ({ id }) => (
  <ItemDetails itemId={id} getData={getPerson} getImageUrl={getPersonImageUrl}>
    <RecordItem field="gender" label="Gender" />
    <RecordItem field="birthYear" label="Birth Year" />
    <RecordItem field="eyeColor" label="Eye color" />
    <RecordItem field="hairColor" label="Hair Color" />
    <RecordItem field="skinColor" label="Skin Color" />
    <RecordItem field="height" label="Height" />
    <RecordItem field="mass" label="Mass" />
  </ItemDetails>
);

const StarshipDetails = ({ id }) => (
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

const PlanetDetails = ({ id }) => (
  <ItemDetails itemId={id} getData={getPlanet} getImageUrl={getPlanetImageUrl}>
    <RecordItem field="population" label="Population" />
    <RecordItem field="rotationPeriod" label="Rotation period" />
    <RecordItem field="diameter" label="Diameter" />
    <RecordItem field="terrain" label="Terrain" />
  </ItemDetails>
);

PersonDetails.propTypes = {
  id: PropTypes.string,
};

StarshipDetails.propTypes = {
  id: PropTypes.string,
};

PlanetDetails.propTypes = {
  id: PropTypes.string,
};

export { PersonDetails, StarshipDetails, PlanetDetails };

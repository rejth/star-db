import ItemList from '../ItemList';
import { ItemListWrapper, SwapiServiceWrapper, compose } from '../HocHelpers';

const mapPeopleMethodsToProps = swapiService => ({
  getData: swapiService.getAllPeople,
});

const mapStarshipsMethodsToProps = swapiService => ({
  getData: swapiService.getAllStarships,
});

const mapPlanetsMethodsToProps = swapiService => ({
  getData: swapiService.getAllPlanets,
});

const PeopleList = compose(
  SwapiServiceWrapper(mapPeopleMethodsToProps),
  ItemListWrapper
)(ItemList);

const StarshipsList = compose(
  SwapiServiceWrapper(mapStarshipsMethodsToProps),
  ItemListWrapper
)(ItemList);

const PlanetsList = compose(
  SwapiServiceWrapper(mapPlanetsMethodsToProps),
  ItemListWrapper
)(ItemList);

export { PeopleList, StarshipsList, PlanetsList };

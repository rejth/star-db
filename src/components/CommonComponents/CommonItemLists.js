import ItemList from '../ItemList';
import { ItemListWrapper, SwapiServiceWrapper } from '../HocHelpers';

const mapPeopleMethodsToProps = swapiService => ({
  getData: swapiService.getAllPeople,
});

const mapStarshipsMethodsToProps = swapiService => ({
  getData: swapiService.getAllSrarships,
});

const mapPlanetsMethodsToProps = swapiService => ({
  getData: swapiService.getAllPlanets,
});

const PeopleList = SwapiServiceWrapper(
  ItemListWrapper(ItemList),
  mapPeopleMethodsToProps
);

const StarshipsList = SwapiServiceWrapper(
  ItemListWrapper(ItemList),
  mapStarshipsMethodsToProps
);

const PlanetsList = SwapiServiceWrapper(
  ItemListWrapper(ItemList),
  mapPlanetsMethodsToProps
);

export { PeopleList, StarshipsList, PlanetsList };

import ItemList from '../ItemList';
import { ItemListWrapper } from '../HocHelpers';
import SwapiService from '../../services/swapi-service';

const { getAllPeople, getAllStarships, getAllPlanets } = new SwapiService();

const PeopleList = ItemListWrapper(ItemList, getAllPeople);

const StarshipsList = ItemListWrapper(ItemList, getAllStarships);

const PlanetsList = ItemListWrapper(ItemList, getAllPlanets);

export { PeopleList, StarshipsList, PlanetsList };

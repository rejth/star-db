import SwapiService from '../../services/swapi-service';
import ItemList from '../ItemList';
import ComponentWrapper from '../HocHelpers';

const swapiService = new SwapiService();

const { getAllPeople, getAllStarships, getAllPlanets } = swapiService;

const PeopleList = ComponentWrapper(ItemList, getAllPeople);
const StarshipsList = ComponentWrapper(ItemList, getAllStarships);
const PlanetsList = ComponentWrapper(ItemList, getAllPlanets);

export { PeopleList, StarshipsList, PlanetsList };

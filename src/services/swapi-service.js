// Код, который работает с сетью лучше изолировать в отдельный класс-сервис
// Компоненты не должны знать откуда именно приходят данные
// Такая инкапсуляция упростит тестирование и поддержку кода, который работает с API

export default class SwapiService {
  // _varibale - это code convention JS
  // это приватная часть класса, таким образом мы говорим другим разработчикам,
  // что это переменная, которую не нужно изменять снаружи класса
  _baseUrl = 'https://swapi.dev/api';
  _baseImageUrl = 'https://starwars-visualguide.com/assets/img';

  // получение данных по API
  getResource = async url => {
    const response = await fetch(`${this._baseUrl}${url}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw new Error(
        `Could not fetch ${url}. Recieved status code ${response.status}`
      );
    }

    return body;
  };

  // получение картинки
  getPersonImageUrl = personId =>
    `${this._baseImageUrl}/characters/${personId}.jpg`;

  getStarshipImageUrl = starshipId =>
    `${this._baseImageUrl}/starships/${starshipId}.jpg`;

  getPlanetImageUrl = planetId =>
    `${this._baseImageUrl}/planets/${planetId}.jpg`;

  // получение всех персонажей
  getAllPeople = async () => {
    const response = await this.getResource('/people/');
    return response.results.map(this._transformPerson);
  };

  // получение конкретного персонажа
  getPerson = async personId => {
    const person = await this.getResource(`/people/${personId}`);
    return this._transformPerson(person);
  };

  // получение всех планет
  getAllPlanets = async () => {
    const response = await this.getResource('/planets/');
    return response.results.map(this._transformPlanet);
  };

  // получение конкретной планеты
  getPlanet = async planetId => {
    const planet = await this.getResource(`/planets/${planetId}`);
    return this._transformPlanet(planet);
  };

  // получение всех космических кораблей
  getAllStarships = async () => {
    const response = await this.getResource('/starships/');
    return response.results;
  };

  // получение конкретного корабля
  getStarship = async starshipId => {
    const starship = await this.getResource(`/starships/${starshipId}`);
    return this._transformStarship(starship);
  };

  _getExtractId = item => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = planet => ({
    id: this._getExtractId(planet),
    name: planet.name,
    population: planet.population,
    rotationPeriod: planet.rotation_period,
    diameter: planet.diameter,
  });

  _transformStarship = starship => ({
    id: this._getExtractId(starship),
    name: starship.name,
    model: starship.model,
    manufacturer: starship.manufacturer,
    costInCredits: starship.costInCredits,
    length: starship.length,
    crew: starship.crew,
    passengers: starship.passengers,
    cargoCapacity: starship.cargoCapacity,
  });

  _transformPerson = person => ({
    id: this._getExtractId(person),
    name: person.name,
    gender: person.gender,
    birthYear: person.birthYear,
    eyeColor: person.eyeColor,
  });
}

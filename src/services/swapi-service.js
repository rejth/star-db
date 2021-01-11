// Код, который работает с сетью лучше изолировать в отдельный класс-сервис
// Компоненты не должны знать откуда именно приходят данные
// Такая инкапсуляция упростит тестирование и поддержку кода, который работает с API

export default class SwapiService {
  // _varibale - это code convention JS
  // это приватная часть класса, таким образом мы говорим другим разработчикам,
  // что это переменная, которую не нужно изменять снаружи класса
  _baseUrl = 'https://swapi.dev/api';

  // получение данных по API
  async getResource(url) {
    const response = await fetch(`${this._baseUrl}${url}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw new Error(`Could not fetch ${url}. Recieved status code ${response.status}`);
    }

    return body;
  }

  // получение всех персонажей
  async getAllPeople() {
    const response = await this.getResource('/people/');
    return response.results;
  }

  // получение всех планет
  async getAllPlanets() {
    const response = await this.getResource('/planets/');
    return response.results;
  }

  // получение всех космических кораблей
  async getAllStarships() {
    const response = await this.getResource('/starships/');
    return response.results;
  }

  // получение конкретного персонажа
  getPerson = personId => this.getResource(`/people/${personId}`);

  // получение конкретной планеты
  getPlanet = planetId => this.getResource(`/planets/${planetId}`);

  // получение конкретного корабля
  getStarship = starshipId => this.getResource(`/starships/${starshipId}`);
}

const swapi = new SwapiService();

swapi.getAllPeople()
  .then(body => console.log(body))
  .catch(error => console.error(error));

swapi.getPerson('1')
  .then(body => console.log(body))
  .catch(error => console.error(error));

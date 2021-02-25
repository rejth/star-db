import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';
import ErrorButton from '../ErrorButton';

import './PersonDetails.css';

export default class PersonDetails extends Component {
  // состояние компонента
  state = {
    person: null, // характеристики персонажа
  };

  // API
  swapiService = new SwapiService();

  // обновление карточки персонажа
  updatePersonDetails() {
    const { personId } = this.props;

    if (!personId) return;

    this.swapiService.getPerson(personId).then(person => {
      this.setState({ person });
    });
  }

  // показываем карточку персонажа в момент подключения компонента в DOM-дерево
  componentDidMount() {
    this.updatePersonDetails();
  }

  // обновляем компонент, когда придет новый props
  componentDidUpdate(prevProps) {
    // условие нужно, чтобы не было бесконечного цикла в результате обновления state и
    // последующего вызова componentDidUpdate(), что в свою очередь снова вызовет обновление state и т.д.
    if (this.props.personId !== prevProps.personId) {
      this.updatePersonDetails();
    }
  }

  render() {
    // при первой инцициализации компонента id = null
    // чтобы избежать ошибки, делаем проверку
    if (!this.state.person) {
      return (
        <React.Fragment>
          <span>Select a person from list!</span>
          <Spinner />
        </React.Fragment>
      );
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.person;

    return (
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        ></img>
        <div className="card-body">
          <h3>{name}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

PersonDetails.propTypes = {
  personId: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  birthYear: PropTypes.string,
  eyeColor: PropTypes.string,
};

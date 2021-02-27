import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import ErrorButton from '../ErrorButton';

import './ItemDetails.css';

export default class ItemDetails extends Component {
  // состояние компонента
  state = {
    item: null, // характеристики сущности {}
    image: '', // картинка сущности
  };

  // обновление карточки сущности
  updateItemDetails() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) return;

    getData(itemId).then(item => {
      this.setState({ item, image: getImageUrl(itemId) });
    });
  }

  // показываем карточку сущности в момент подключения компонента в DOM-дерево
  componentDidMount() {
    this.updateItemDetails();
  }

  // обновляем компонент, когда придет новый props
  componentDidUpdate(prevProps) {
    // условие нужно, чтобы не было бесконечного цикла в результате обновления state и
    // последующего вызова componentDidUpdate(), что в свою очередь снова вызовет обновление state и т.д.
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItemDetails();
    }
  }

  render() {
    // при первой инцициализации компонента id = null
    // чтобы избежать ошибки, делаем проверку
    if (!this.state.item) {
      return (
        <React.Fragment>
          <span>Select an item from list!</span>
          <Spinner />
        </React.Fragment>
      );
    }

    const { name, gender, birthYear, eyeColor } = this.state.item;

    const image = this.state.image;

    return (
      <div className="item-details card">
        <img className="item-image" src={image}></img>
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

ItemDetails.propTypes = {
  itemId: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  birthYear: PropTypes.string,
  eyeColor: PropTypes.string,
  getData: PropTypes.func.isRequired,
  getImageUrl: PropTypes.func.isRequired,
};

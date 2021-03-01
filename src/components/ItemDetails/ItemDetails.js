import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import ErrorButton from '../ErrorButton';

import './ItemDetails.css';

export default class ItemDetails extends Component {
  // состояние компонента
  state = {
    item: null, // характеристики сущности {}
    image: null, // картинка сущности
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

    const { item, image } = this.state;

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image" src={image}></img>
        <div className="card-body">
          <h3>{name}</h3>
          <ul className="list-group list-group-flush">
            {Children.map(this.props.children, child =>
              React.cloneElement(child, { item })
            )}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  itemId: PropTypes.string.isRequired,
  name: PropTypes.string,
  getData: PropTypes.func.isRequired,
  getImageUrl: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import ErrorBoundry from '../ErrorBoundry';
import './ItemDetails.css';

export default class ItemDetails extends Component {
  state = {
    item: null, // характеристики сущности {}
    image: null, // картинка сущности
  };

  // обновление карточки сущности
  updateItemDetails() {
    const { id, getData, getImageUrl } = this.props;

    if (!id) return;

    getData(id).then(item => {
      this.setState({ item, image: getImageUrl(id) });
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
    if (this.props.id !== prevProps.id) {
      this.updateItemDetails();
    }
  }

  render() {
    const { item, image } = this.state;

    // при первой инцициализации компонента id = null
    // чтобы избежать ошибки, делаем проверку
    if (!item) {
      return (
        <React.Fragment>
          <span>Select an item from list!</span>
          <Spinner />
        </React.Fragment>
      );
    }

    const { name } = item;

    return (
      <ErrorBoundry>
        <div className="item-details card">
          <img className="item-image" src={image}></img>
          <div className="card-body">
            <h3>{name}</h3>
            <ul className="list-group list-group-flush">
              {Children.map(this.props.children, child =>
                React.cloneElement(child, { item })
              )}
            </ul>
          </div>
        </div>
      </ErrorBoundry>
    );
  }
}

ItemDetails.propTypes = {
  id: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  getImageUrl: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};

import React, { Component } from 'react';
import RowEntity from '../RowEntity';
import { StarshipsList, StarshipDetails } from '../CommonComponents';
import ErrorBoundry from '../ErrorBoundry';

// этот компонент нужен для реализации паттерна Error Boundary, чтобы функция componentDidCatch() в App,
// не останавливала ВСЕ приложение в случае ошибки в одном из компонентов приложения
// т.о. мы при возникновении ошибки в компоненте PeoplePage, другие компоненты будут работать,
// потому что React пойдет по дереву DOM вверх, найдет ближайший componentDidCatch(), не дойдя до App
// и выкинет предупреждени об именно в этом компоненте
export default class StarshipsPage extends Component {
  state = {
    selectedItem: '3',
  };

  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;

    const itemList = (
      <StarshipsList onItemSelected={this.onItemSelected}>
        {item => `${item.name} (${item.gender})`}
      </StarshipsList>
    );

    const itemDetails = <StarshipDetails id={selectedItem} />;

    // паттерн свойства-компоненты
    return (
      <ErrorBoundry>
        <RowEntity left={itemList} right={itemDetails} />
      </ErrorBoundry>
    );
  }
}

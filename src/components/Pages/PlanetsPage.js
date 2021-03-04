import React, { Component } from 'react';
import RowEntity from '../RowEntity';
import { PlanetsList, PlanetDetails } from '../CommonComponents';
import ErrorBoundry from '../ErrorBoundry';

// этот компонент нужен для реализации паттерна Error Boundary, чтобы функция componentDidCatch() в App,
// не останавливала ВСЕ приложение в случае ошибки в одном из компонентов приложения
// т.о. мы при возникновении ошибки в компоненте PeoplePage, другие компоненты будут работать,
// потому что React пойдет по дереву DOM вверх, найдет ближайший componentDidCatch(), не дойдя до App
// и выкинет предупреждени об именно в этом компоненте
export default class PlanetsPage extends Component {
  state = {
    selectedItem: '5',
  };

  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;

    const itemList = (
      <PlanetsList onItemSelected={this.onItemSelected}>
        {item => `${item.name} (${item.terrain})`}
      </PlanetsList>
    );

    const itemDetails = <PlanetDetails id={selectedItem} />;

    // паттерн свойства-компоненты
    return (
      <ErrorBoundry>
        <RowEntity left={itemList} right={itemDetails} />
      </ErrorBoundry>
    );
  }
}

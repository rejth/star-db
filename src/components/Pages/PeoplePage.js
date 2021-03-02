import React, { Component } from 'react';
import RowEntity from '../RowEntity';
import { PeopleList, PersonDetails } from '../CommonComponents';
import ErrorBoundry from '../ErrorBoundry';

// этот компонент нужен для реализации паттерна Error Boundary, чтобы функция componentDidCatch() в App,
// не останавливала ВСЕ приложение в случае ошибки в одном из компонентов приложения
// т.о. мы при возникновении ошибки в компоненте PeoplePage, другие компоненты будут работать,
// потому что React пойдет по дереву DOM вверх, найдет ближайший componentDidCatch(), не дойдя до App
// и выкинет предупреждени об именно в этом компоненте
export default class PeoplePage extends Component {
  state = {
    selectedItem: '3',
  };

  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;

    const itemList = (
      <PeopleList onItemSelected={this.onItemSelected}>
        {item => `${item.name} (${item.gender})`}
      </PeopleList>
    );

    const itemDetails = <PersonDetails id={selectedItem} />;

    // паттерн свойства-компоненты
    return (
      <ErrorBoundry>
        <RowEntity left={itemList} right={itemDetails} />
      </ErrorBoundry>
    );
  }
}

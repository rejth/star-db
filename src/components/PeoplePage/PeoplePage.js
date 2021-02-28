import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ItemList from '../ItemList';
import ItemDetails from '../ItemDetails';
import RowEntity from '../RowEntity';
import RowItem from '../RowItem';
import ErrorIndicator from '../ErrorIndicator';
import ErrorBoundry from '../ErrorBoundry';

// этот компонент нужен для реализации паттерна Error Boundary, чтобы функция componentDidCatch() в App,
// не останавливала ВСЕ приложение в случае ошибки в одном из компонентов приложения
// т.о. мы при возникновении ошибки в компоненте PeoplePage, другие компоненты будут работать,
// потому что React пойдет по дереву DOM вверх, найдет ближайший componentDidCatch(), не дойдя до App
// и выкинет предупреждени об именно в этом компоненте
export default class PeoplePage extends Component {
  state = {
    selectedPerson: '3',
  };

  // API
  swapiService = new SwapiService();

  onPersonSelected = selectedPerson => {
    this.setState({ selectedPerson });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ErrorBoundry>
        <ItemList
          onItemSelected={this.onPersonSelected}
          getData={this.swapiService.getAllPeople}
        >
          {item => `${item.name} (${item.gender})`}
        </ItemList>
      </ErrorBoundry>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedPerson}
          getData={this.swapiService.getPerson}
          getImageUrl={this.swapiService.getPersonImageUrl}
        >
          <RowItem field="gender" label="Gender" />
          <RowItem field="birthYear" label="Birth Year" />
          <RowItem field="eyeColor" label="Eye color" />
        </ItemDetails>
      </ErrorBoundry>
    );

    // паттерн свойства-компоненты
    return (
      <ErrorBoundry>
        <RowEntity left={itemList} right={personDetails} />
      </ErrorBoundry>
    );
  }
}

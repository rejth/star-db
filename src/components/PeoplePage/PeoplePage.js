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

  onPersonSelected = selectedPerson => {
    this.setState({ selectedPerson });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const { selectedPerson } = this.state;

    const { getPerson, getPersonImageUrl } = new SwapiService();

    const itemList = (
      <ErrorBoundry>
        <ItemList onItemSelected={this.onPersonSelected}>
          {item => `${item.name} (${item.gender})`}
        </ItemList>
      </ErrorBoundry>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={selectedPerson}
          getData={getPerson}
          getImageUrl={getPersonImageUrl}
        >
          <RowItem field="gender" label="Gender" />
          <RowItem field="birthYear" label="Birth Year" />
          <RowItem field="eyeColor" label="Eye color" />
          <RowItem field="hairColor" label="Hair Color" />
          <RowItem field="skinColor" label="Skin Color" />
          <RowItem field="height" label="Height" />
          <RowItem field="mass" label="Mass" />
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
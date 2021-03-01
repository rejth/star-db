import React, { Component } from 'react';
import RowEntity from '../RowEntity';
import { PeopleList, PersonDetails } from '../CommonComponents';
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
    const { selectedPerson, hasError } = this.state;

    if (hasError) return <ErrorIndicator />;

    const peopleList = (
      <ErrorBoundry>
        <PeopleList onItemSelected={this.onPersonSelected}>
          {item => `${item.name} (${item.gender})`}
        </PeopleList>
      </ErrorBoundry>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails id={selectedPerson} />
      </ErrorBoundry>
    );

    // паттерн свойства-компоненты
    return (
      <ErrorBoundry>
        <RowEntity left={peopleList} right={personDetails} />
      </ErrorBoundry>
    );
  }
}

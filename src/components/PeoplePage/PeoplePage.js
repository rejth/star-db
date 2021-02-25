import React, { Component } from 'react';
import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';
import ErrorIndicator from '../ErrorIndicator';

// этот компонент нужен для реализации паттерна Error Boundary, чтобы функция componentDidCatch() в App,
// не останавливала ВСЕ приложение в случае ошибки в одном из компонентов приложения
// т.о. мы при возникновении ошибки в компоненте PeoplePage, другие компоненты будут работать,
// потому что React пойдет по дереву DOM вверх, найдет ближайший componentDidCatch(), не дойдя до App
// и выкинет предупреждени об именно в этом компоненте
export default class PeoplePage extends Component {
  state = {
    selectedPerson: '3',
    hasError: false,
  };

  /*eslint-disable no-unused-vars*/
  // аргументы error и info дают много полезной инфы в браузере при возникновении ошибки
  // включаем debugger, далее см. Scope -> Local в браузере
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  onPersonSelected = selectedPerson => {
    this.setState({ selectedPerson });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}

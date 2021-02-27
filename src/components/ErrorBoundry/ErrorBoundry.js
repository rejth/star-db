import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorIndicator from '../ErrorIndicator';

export default class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };

  // аргументы error и info дают много полезной инфы в браузере при возникновении ошибки
  // включаем debugger, далее см. Scope -> Local в браузере
  /*eslint-disable no-unused-vars*/
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) return <ErrorIndicator />;
    return this.props.children;
  }
}

ErrorBoundry.propTypes = {
  children: PropTypes.object.isRequired,
};

import React, { Component } from 'react';
import Spinner from '../Spinner';

const ComponentWrapper = (View, getData) =>
  class Wrapper extends Component {
    state = {
      data: null,
    };

    // componentDidMount() - best practice для получения данных от сервера по API
    componentDidMount() {
      getData().then(data => {
        this.setState({
          data,
        });
      });
    }

    render() {
      const { data } = this.state;

      if (!data) return <Spinner />;

      return <View {...this.props} data={data} />;
    }
  };

export default ComponentWrapper;

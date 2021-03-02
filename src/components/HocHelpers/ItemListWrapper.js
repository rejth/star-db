import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const ItemListWrapper = View =>
  class Wrapper extends Component {
    state = {
      data: null, // список сущностей (людей, планет, кораблей)
    };

    // componentDidMount() - best practice для получения данных от сервера по API
    componentDidMount() {
      /* eslint react/prop-types: 0 */
      const { getData } = this.props;
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

ItemListWrapper.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default ItemListWrapper;

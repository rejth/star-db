import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';

const ItemListWrapper = View =>
  class Wrapper extends Component {
    state = {
      data: null, // список сущностей (людей, планет или кораблей)
      loading: true,
      error: false,
    };

    componentDidMount() {
      /* eslint react/prop-types: 0 */
      const { getData } = this.props;

      this.setState({ loading: true, error: false });

      getData()
        .then(data => {
          this.setState({ data, loading: false });
        })
        .catch(() => this.setState({ error: true, loading: false }));
    }

    render() {
      const { data, loading, error } = this.state;

      if (loading) return <Spinner />;

      if (error) return <ErrorIndicator />;

      return <View {...this.props} data={data} />;
    }
  };

ItemListWrapper.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default ItemListWrapper;

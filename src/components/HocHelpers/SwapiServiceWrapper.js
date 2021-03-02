import React from 'react';
import { SwapiServiceConsumer } from '../SwapiServiceContext';

const SwapiServiceWrapper = (View, mapMethodsToProps) =>
  function wrapper(props) {
    return (
      <SwapiServiceConsumer>
        {swapiService => {
          const serviceProps = mapMethodsToProps(swapiService);
          return <View {...props} {...serviceProps} />;
        }}
      </SwapiServiceConsumer>
    );
  };

export default SwapiServiceWrapper;

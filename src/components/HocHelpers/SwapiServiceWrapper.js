import React from 'react';
import { SwapiServiceConsumer } from '../SwapiServiceContext';

const SwapiServiceWrapper = View =>
  function wrapper(props) {
    return (
      <SwapiServiceConsumer>
        {swapiService => <View {...props} swapiService={swapiService} />}
      </SwapiServiceConsumer>
    );
  };

export default SwapiServiceWrapper;

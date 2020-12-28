import React from 'react';
import StackNavigation from './navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/stores/index';

const App = () => (
  <Provider store={store}>
    <StackNavigation />
  </Provider>
);

export default App;

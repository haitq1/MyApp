import React from 'react';
import StackNavigation from './navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/stores/index';
import Home from './screens/Home';

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;

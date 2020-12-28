import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootSaga from '../sagas/rootSaga';
import rootReducer from '../reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === 'object' &&
  process.env.NODE_ENV === 'development' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, sagaMiddleware));
export const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

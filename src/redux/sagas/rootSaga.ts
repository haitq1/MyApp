import {all} from 'redux-saga/effects';
import signInSaga from './signin';

export default function* rootSaga() {
  yield all([signInSaga()]);
}

import {combineReducers} from 'redux';
import {SignIn} from './signin';

export default combineReducers({
  signin: SignIn,
});

import * as types from '../constants/signup';
import produce from 'immer';

const initalState = {
  loading: false,
  username: null,
  password: null,
};
export const SignIn = (state = initalState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SIGNUP_REQUESTED:
        draft.username = action.data.username;
        draft.password = action.data.password;
        break;
      case types.SIGNUP_SUCCESSED:
        break;
      default:
        return state;
    }
  });

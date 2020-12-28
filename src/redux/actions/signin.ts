import * as types from '../constants/signin';
export const LoginRequested = (username: string, password: string) => {
  return {
    type: types.LOGIN_REQUESTED,
    data: {
      username,
      password,
    },
  };
};
export const LoginSuccessed = (data: any) => {
  return {
    type: types.LOGIN_SUCCESSED,
    data,
  };
};
export const LoginFailed = (data: any) => {
  return {
    type: types.LOGIN_FAILED,
    data,
  };
};

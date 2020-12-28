import * as types from '../constants/signup';
export const LoginRequested = (
  username: string,
  password: string,
  fullname: string,
  email: string,
  gender: string,
) => {
  return {
    type: types.SIGNUP_REQUESTED,
    data: {
      username,
      fullname,
      email,
      gender,
      password,
    },
  };
};
export const LoginSuccessed = (data: any) => {
  return {
    type: types.SIGNUP_SUCCESSED,
    data,
  };
};

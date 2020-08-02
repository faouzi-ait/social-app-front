import { AUTH } from "../types";

export const authenticateAction = (payload) => {
  return { type: AUTH.AUTHENTICATE, payload };
};

export const logoutAction = () => {
  return { type: AUTH.SET_LOG_OUT };
};

export const setAuthenticateErrorAction = (payload) => {
  return { type: AUTH.SET_AUTHENTICATION_ERROR, payload };
};

export const setIsAuthenticatingAction = (payload) => {
  return { type: AUTH.SET_IS_AUTHENTICATING, payload };
};

export const fetchUserInfoAction = () => {
  return { type: AUTH.FETCH_USER_INFO };
};

export const setIsUserAuthenticated = (payload) => {
  return { type: AUTH.IS_AUTHENTICATED, payload };
};

export const updateUserInfoAction = (payload) => {
  return {
    type: AUTH.UPDATE_USER_INFO,
    payload,
  };
};

import { AUTH } from "../types";

const defaultState = {
  user: { isLoaded: false },
  errors: null,
  isAuthenticating: false,
  isAuthenticated: false,
};

export const login = (state = defaultState, action = {}) => {
  switch (action.type) {
    case AUTH.UPDATE_USER_INFO:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case AUTH.FETCH_USER_INFO:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    case AUTH.SET_AUTHENTICATION_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case AUTH.SET_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.payload,
      };
    case AUTH.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case AUTH.SET_LOG_OUT:
      return {
        ...state,
        user: { isLoaded: false },
        errors: null,
        isAuthenticating: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

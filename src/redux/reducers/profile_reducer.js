import { PROFILE } from "../types";

const initialState = {
  profile: {},
  error: {},
};

export const user_profile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE.LOAD_SUCCESS:
      return { ...state, ...action.profile };
    case PROFILE.LOAD_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case PROFILE.RESET_PROFLE:
      return {
        profile: {},
      };
    default:
      return state;
  }
};

export const loading_profile = (state = false, action) => {
  switch (action.type) {
    case PROFILE.LOAD:
      return true;
    case PROFILE.LOAD_SUCCESS:
      return false;
    case PROFILE.LOAD_FAIL:
      return false;
    default:
      return state;
  }
};

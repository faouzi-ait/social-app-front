import { SCREEMS, SCREEM } from "../types";

const initialState = {
  error: {},
};

const screemInitialState = {
  screem: {},
  error: {},
};

export const screems_list = (state = initialState, action) => {
  switch (action.type) {
    case SCREEMS.LOAD_SUCCESS:
      return { ...state, ...action.screems };
    case SCREEMS.LOAD_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SCREEMS.CREATE_SCREEM:
    case SCREEMS.DELETE_SCREEM:
    default:
      return state;
  }
};

export const screems_details = (state = screemInitialState, action) => {
  switch (action.type) {
    case SCREEM.GET_SCREEM_DETAILS_SUCCESS:
      return { ...state, screem: action.screem };
    case SCREEM.GET_SCREEM_DETAILS_FAIL:
      return { ...state, error: action.error };
    case SCREEM.RESET_SCREEM_DETAILS:
      return { ...state, screem: {} };
    default:
      return state;
  }
};

export const screems_loading = (state = false, action) => {
  switch (action.type) {
    case SCREEMS.LOAD:
      return true;
    case SCREEMS.LOAD_SUCCESS:
      return false;
    case SCREEMS.LOAD_FAIL:
      return false;
    default:
      return state;
  }
};

export const screems_details_loading = (state = false, action) => {
  switch (action.type) {
    case SCREEM.GET_SCREEM_DETAILS:
      return true;
    case SCREEM.GET_SCREEM_DETAILS_SUCCESS:
      return false;
    case SCREEM.GET_SCREEM_DETAILS_FAIL:
      return false;
    case SCREEM.POST_COMMENT:
    default:
      return state;
  }
};

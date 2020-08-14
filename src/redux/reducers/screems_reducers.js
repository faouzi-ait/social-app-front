import { SCREEMS } from "../types";

const initialState = {
  error: {},
};

export const screems_list = (state = {}, action) => {
  switch (action.type) {
    case SCREEMS.LOAD_SUCCESS:
      return { ...state, ...action.screems };
    default:
      return state;
  }
};

export const create_screems = (state = "", action) => {
  switch (action.type) {
    case SCREEMS.CREATE_SCREEM:
    default:
      return state;
  }
};

export const delete_screem = (state = "", action) => {
  switch (action.type) {
    case SCREEMS.DELETE_SCREEM:
    default:
      return state;
  }
};

export const screems_fail = (state = initialState, action) => {
  switch (action.type) {
    case SCREEMS.LOAD_FAIL:
      return {
        ...state,
        error: action.payload,
      };
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

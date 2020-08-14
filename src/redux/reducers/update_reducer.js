import { UPDATE } from "../types";

const initialState = {
  isProfileUploading: false,
  success: "",
  errors: {},
};

export const profile_update = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE.IS_DETAILS_UPDATING:
      return {
        ...state,
        isProfileUploading: action.payload,
      };
    case UPDATE.UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case UPDATE.UPDATE_DETAILS_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

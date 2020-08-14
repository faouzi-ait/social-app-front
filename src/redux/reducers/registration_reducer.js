import { USER } from "../types";

const defaultState = {
  isCreatingUser: false,
  registerConfirma: "",
  isCreationError: "",
};

export const register = (state = defaultState, action) => {
  switch (action.type) {
    case USER.SET_IS_CREATING_USER:
      return { ...state, isCreatingUser: action.payload };
    case USER.SET_IS_ERROR:
      return { ...state, isCreationError: action.payload };
    case USER.REGISTER_CONFIRM:
      return { ...state, registerConfirma: action.payload };
    default:
      return state;
  }
};

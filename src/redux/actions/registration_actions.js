import { USER } from "../types";

export function createUserAction(payload) {
  return { type: USER.REGISTER, payload };
}

export function setIsCreatingUserAction(bool) {
  return { type: USER.SET_IS_CREATING_USER, payload: bool };
}

export function setIsCreationActionError(err) {
  return { type: USER.SET_IS_ERROR, payload: err };
}

export function setCreationConfirmation(msg) {
  return { type: USER.REGISTER_CONFIRM, payload: msg };
}

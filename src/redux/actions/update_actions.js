import { UPDATE } from "../types";

export const updateProfile = (payload) => {
  return { type: UPDATE.UPDATE_DETAILS, payload };
};

export const isProfileUpdating = (payload) => {
  return { type: UPDATE.IS_DETAILS_UPDATING, payload };
};

export const updateProfileError = (payload) => {
  return { type: UPDATE.UPDATE_DETAILS_FAILURE, payload };
};

export const updateProfileSuccess = (payload) => {
  return { type: UPDATE.UPDATE_DETAILS_SUCCESS, payload };
};

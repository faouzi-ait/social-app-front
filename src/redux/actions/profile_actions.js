import { PROFILE } from "../types";

export const getProfileAction = () => {
  return { type: PROFILE.LOAD };
};

export const setProfile = (profile) => ({
  type: PROFILE.LOAD_SUCCESS,
  profile,
});

export const setProfileError = (error) => ({
  type: PROFILE.LOAD_FAIL,
  error,
});

export const resetProfile = () => ({
  type: PROFILE.RESET_PROFLE,
});

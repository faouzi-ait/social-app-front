import { SCREEMS } from "../types";

export const loadScreems = () => ({
  type: SCREEMS.LOAD,
});

export const createScreem = (payload) => ({
  type: SCREEMS.CREATE_SCREEM,
  payload,
});

export const deleteScreem = (id) => ({
  type: SCREEMS.DELETE_SCREEM,
  id,
});

export const setScreems = (screems) => ({
  type: SCREEMS.LOAD_SUCCESS,
  screems,
});

export const setError = (error) => ({
  type: SCREEMS.LOAD_FAIL,
  error,
});

import { SCREEMS, SCREEM } from "../types";

/* CREATE A NEW SCREEM */
export const createScreem = (payload) => ({
  type: SCREEMS.CREATE_SCREEM,
  payload,
});

/* LOAD A SPECIFIC SCREEM DETAILS */
export const getScreemDetails = (id) => ({
  type: SCREEM.GET_SCREEM_DETAILS,
  id,
});

export const setScreemDetails = (screem) => ({
  type: SCREEM.GET_SCREEM_DETAILS_SUCCESS,
  screem,
});

export const setScreemDetailsReset = () => ({
  type: SCREEM.RESET_SCREEM_DETAILS,
});

export const setScreemDetailsError = (error) => ({
  type: SCREEM.GET_SCREEM_DETAILS_FAIL,
  error,
});

/* LOAD THE LIST OF ALL SCREEMS */
export const loadScreems = () => ({
  type: SCREEMS.LOAD,
});

export const setScreems = (screems) => ({
  type: SCREEMS.LOAD_SUCCESS,
  screems,
});

export const setError = (error) => ({
  type: SCREEMS.LOAD_FAIL,
  error,
});

/* POST A COMMENT */
export const postComment = (id, comment) => ({
  type: SCREEM.POST_COMMENT,
  id,
  comment,
});

/* DELETE A SCREEMS */
export const deleteScreem = (id) => ({
  type: SCREEMS.DELETE_SCREEM,
  id,
});

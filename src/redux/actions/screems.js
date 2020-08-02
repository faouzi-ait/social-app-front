import { SCREEMS } from "../types";

const loadScreems = () => ({
  type: SCREEMS.LOAD,
});

const setScreems = (screems) => ({
  type: SCREEMS.LOAD_SUCCESS,
  screems,
});

const setError = (error) => ({
  type: SCREEMS.LOAD_FAIL,
  error,
});

export { loadScreems, setScreems, setError };

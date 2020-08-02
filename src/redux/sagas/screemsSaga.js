import { takeEvery, call, put } from "redux-saga/effects";
import { setScreems, setError } from "../actions/screems";
import { fetchScreems } from "../../api/apiCalls";
import { SCREEMS } from "../types";

export function* screemsLoadingSaga() {
  yield takeEvery(SCREEMS.LOAD, handleScreemsLoad);
}

function* handleScreemsLoad() {
  try {
    const screems = yield call(fetchScreems);
    yield put(setScreems(screems));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

import { takeEvery, call, put, delay } from "redux-saga/effects";
import { setScreems, setError } from "../actions/screems";
import {
  fetchScreems,
  submitScreem,
  deleteScreemCall,
} from "../../api/apiCalls";
import { SCREEMS } from "../types";

function* screemsListLoadSaga() {
  try {
    const screems = yield call(fetchScreems);
    yield put(setScreems(screems));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

function* screemCreationSaga({ payload }) {
  try {
    yield call(submitScreem, payload);
    yield delay(750);
    window.location.href = "/";
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

function* deleteScreemSaga(id) {
  try {
    yield call(deleteScreemCall, id);
    yield delay(750);
    window.location.href = "/";
  } catch (error) {
    return error;
  }
}

export function* screemsLoadingSaga() {
  yield takeEvery(SCREEMS.LOAD, screemsListLoadSaga);
  yield takeEvery(SCREEMS.CREATE_SCREEM, screemCreationSaga);
  yield takeEvery(SCREEMS.DELETE_SCREEM, deleteScreemSaga);
}

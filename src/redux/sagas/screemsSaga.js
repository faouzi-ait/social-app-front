import { takeEvery, call, put, delay } from "redux-saga/effects";
import {
  setScreems,
  setError,
  setScreemDetails,
  setScreemDetailsError,
} from "../actions/screems_actions";
import {
  fetchScreems,
  getScreemDetails,
  submitScreem,
  postCommentCall,
  deleteScreemCall,
} from "../../api/apiCalls";
import { SCREEMS, SCREEM } from "../types";

function* screemsListLoadSaga() {
  try {
    const screems = yield call(fetchScreems);
    yield put(setScreems(screems));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

function* loadScreemDetailSaga(id) {
  try {
    const fullScreem = yield call(getScreemDetails, id);
    yield put(setScreemDetails(fullScreem));
  } catch (error) {
    yield put(setScreemDetailsError(error.toString()));
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

function* postCommentSaga({ id, comment }) {
  console.log(comment);
  try {
    yield call(postCommentCall, id, comment);
    yield delay(250);
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
  yield takeEvery(SCREEM.POST_COMMENT, postCommentSaga);
  yield takeEvery(SCREEM.GET_SCREEM_DETAILS, loadScreemDetailSaga);
  yield takeEvery(SCREEMS.LOAD, screemsListLoadSaga);
  yield takeEvery(SCREEMS.CREATE_SCREEM, screemCreationSaga);
  yield takeEvery(SCREEMS.DELETE_SCREEM, deleteScreemSaga);
}

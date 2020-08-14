import { takeEvery, call, put, delay } from "redux-saga/effects";
import { LIKE } from "../types";
import { likeActionFeedback } from "../actions/like_actions";
import { likeScreemCall, unlikeScreemCall } from "../../api/apiCalls";

export function* likeScreemFunction({ id }) {
  try {
    yield call(likeScreemCall, id);
    yield delay(750);
    window.location.href = "/";
  } catch (error) {
    yield put(
      likeActionFeedback("There was a problem while liking your screem")
    );
    yield delay(2500);
    likeActionFeedback("");
  }
}

export function* unlikeScreemFunction({ id }) {
  try {
    yield call(unlikeScreemCall, id);
    window.location.href = "/";
  } catch (error) {
    yield put(
      likeActionFeedback("There was a problem while unliking your screem")
    );
    yield delay(2500);
    likeActionFeedback("");
  }
}

export function* likeScreemSaga() {
  yield takeEvery(LIKE.LIKE_SCREEM, likeScreemFunction);
  yield takeEvery(LIKE.UNLIKE_SCREEM, unlikeScreemFunction);
}

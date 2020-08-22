import { takeEvery, call, put, delay } from "redux-saga/effects";
import { UPDATE } from "../types";
import {
  isProfileUpdating,
  updateProfileSuccess,
  updateProfileError,
} from "../actions/update_actions";

import { profileUpdate } from "../../api/apiCalls";

export function* userProfileUpdate({ payload }) {
  try {
    yield put(isProfileUpdating(true));
    yield call(profileUpdate, payload);
    yield put(updateProfileSuccess("Data successfully updated, thank you"));
    yield put(isProfileUpdating(false));
    yield delay(800);
    window.location.href = "/";
  } catch (error) {
    yield put(updateProfileError(error));
    yield put(isProfileUpdating(false));
  }
}

export function* profileUploadSaga() {
  yield takeEvery(UPDATE.UPDATE_DETAILS, userProfileUpdate);
}

import { takeEvery, call, put } from "redux-saga/effects";
import { setProfile, setProfileError } from "../actions/profile_actions";
import { fetch_user_profile } from "../../api/apiCalls";
import { PROFILE } from "../types";

export function* profileSaga() {
  yield takeEvery(PROFILE.LOAD, handleProfileLoad);
}

function* handleProfileLoad() {
  try {
    const profile = yield call(fetch_user_profile);
    yield put(setProfile(profile));
  } catch (error) {
    yield put(setProfileError(error.toString()));
  }
}

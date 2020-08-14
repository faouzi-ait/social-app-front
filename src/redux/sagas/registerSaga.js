import { call, takeEvery, put, delay } from "redux-saga/effects";
import { USER } from "../types";
import { register } from "../../api/apiCalls";
import {
  setIsCreatingUserAction,
  setIsCreationActionError,
  setCreationConfirmation,
} from "../actions/registration_actions";

export function* registerUser({ payload }) {
  yield put(setIsCreatingUserAction(true));

  yield put(setCreationConfirmation(""));
  yield put(setIsCreationActionError(""));

  const result = yield call(register, payload);

  if (result.status === 201) {
    yield put(setCreationConfirmation("Your account was successfully created"));
    yield delay(2000);
    yield put(setCreationConfirmation(""));
    window.location.href = "/login";
  } else {
    console.log(result);
    if (result.error.response.data.email) {
      yield put(setIsCreationActionError(result.error.response.data.email));
      yield delay(2000);
      yield put(setIsCreationActionError(""));
    } else {
      yield put(
        setIsCreationActionError(
          "There was an error while registering your account, please try again"
        )
      );
      yield delay(2000);
      yield put(setIsCreationActionError(""));
    }
    yield put(setIsCreatingUserAction(false));
  }
  yield put(setIsCreatingUserAction(false));
}

export function* registerSaga() {
  yield takeEvery(USER.REGISTER, registerUser);
}

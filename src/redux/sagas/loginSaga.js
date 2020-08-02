import { call, takeEvery, put } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import { authenticate, logout } from "../../api/apiCalls";
import {
  setIsAuthenticatingAction,
  setAuthenticateErrorAction,
  updateUserInfoAction,
  setIsUserAuthenticated,
} from "../actions/login_actions";
import { AUTH } from "../types";
export const TOKEN = "AIS_ADMIN_TOKEN";
export const CURRENT_USER = "CURRENT_USER";

export function* authentication({ payload }) {
  yield put(setIsAuthenticatingAction(true));
  yield put(setAuthenticateErrorAction(""));
  const result = yield call(authenticate, payload);

  if (result.error) {
    console.log(result);
    yield put(setAuthenticateErrorAction(result.error.response.status));
  } else {
    localStorage.setItem(TOKEN, JSON.stringify(result.data.token));
    yield put(setIsUserAuthenticated(true));
    yield call(fetchUserInfo);
  }
  yield put(setIsAuthenticatingAction(false));
}

export function* fetchUserInfo() {
  const user = localStorage.getItem(TOKEN);

  if (user) {
    const token = JSON.parse(user);
    const decodedToken = jwt_decode(token);
    localStorage.setItem(
      CURRENT_USER,
      JSON.stringify({
        user: decodedToken.email,
        userId: decodedToken.user_id,
        issuedAt: decodedToken.iat,
        expiresAt: decodedToken.exp,
      })
    );

    yield put(
      updateUserInfoAction({
        userInfo: {
          user: decodedToken.email,
          userId: decodedToken.user_id,
          issuedAt: decodedToken.iat,
          expiresAt: decodedToken.exp,
        },
        fullUserInfo: decodedToken,
        isLoaded: true,
      })
    );
  } else {
    yield put(
      updateUserInfoAction({
        isLoaded: true, // trigger redirecting to /login
      })
    );
  }
}

export function* reset() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(CURRENT_USER);
  yield put(
    updateUserInfoAction({
      userInfo: {},
    })
  );
}

export function* logoutUser() {
  yield call(logout);
  yield call(reset); // trigger redirecting to /login
}

export function* authenticateSaga() {
  yield takeEvery(AUTH.AUTHENTICATE, authentication);
  yield takeEvery(AUTH.SET_LOG_OUT, logoutUser);
  yield takeEvery(AUTH.FETCH_USER_INFO, fetchUserInfo);
}

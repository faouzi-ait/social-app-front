import { call, takeEvery, put, delay } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import { authenticate, logout } from "../../api/apiCalls";
import {
  setIsAuthenticatingAction,
  setAuthenticateErrorAction,
  updateUserInfoAction,
  setIsUserAuthenticated,
} from "../actions/login_actions";
import { resetProfile } from "../actions/profile_actions";
import { setToken } from "../actions/token_action";
import { AUTH } from "../types";

const TOKEN = "AIS_ADMIN_TOKEN";

export function* authentication({ payload }) {
  yield call(logoutUser);
  yield put(setIsAuthenticatingAction(true));
  yield put(setAuthenticateErrorAction(""));
  const result = yield call(authenticate, payload);

  if (result.error) {
    yield put(setAuthenticateErrorAction(result.error.response.status));
  } else {
    yield put(setToken(result.data.token));
    localStorage.setItem(TOKEN, JSON.stringify(result.data.token));
    yield put(setIsUserAuthenticated(true));
    yield call(fetchUserInfo);
    yield delay(500);
    window.location.href = "/";
  }
  yield put(setIsAuthenticatingAction(false));
}

export function* fetchUserInfo() {
  const user = localStorage.getItem(TOKEN);

  if (user) {
    const token = JSON.parse(user);
    const decodedToken = jwt_decode(token);
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
        isLoaded: true,
      })
    );
  }
}

export function* reset() {
  localStorage.removeItem(TOKEN);
  yield put(setToken(""));
  yield put(resetProfile());
  yield put(
    updateUserInfoAction({
      userInfo: {},
    })
  );
}

export function* logoutUser() {
  yield call(logout);
  yield call(reset);
}

export function* authenticateSaga() {
  yield takeEvery(AUTH.AUTHENTICATE, authentication);
  yield takeEvery(AUTH.SET_LOG_OUT, logoutUser);
  yield takeEvery(AUTH.FETCH_USER_INFO, fetchUserInfo);
}

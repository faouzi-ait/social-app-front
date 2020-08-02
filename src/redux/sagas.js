import { all } from "redux-saga/effects";
import { screemsLoadingSaga } from "./sagas/screemsSaga";
import { authenticateSaga } from "./sagas/loginSaga";
import { registerSaga } from "./sagas/registerSaga";

export function* rootSaga() {
  yield all([screemsLoadingSaga(), authenticateSaga(), registerSaga()]);
}

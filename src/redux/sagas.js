import { all } from "redux-saga/effects";
import { screemsLoadingSaga } from "./sagas/screemsSaga";
import { authenticateSaga } from "./sagas/loginSaga";
import { registerSaga } from "./sagas/registerSaga";
import { profileSaga } from "./sagas/profileSaga";
import { profilePictureUploadSaga } from "./sagas/pictureUploadSaga";
import { profileUploadSaga } from "./sagas/updateSaga";
import { likeScreemSaga } from "./sagas/likeSaga";

export function* rootSaga() {
  yield all([
    screemsLoadingSaga(),
    authenticateSaga(),
    registerSaga(),
    profileSaga(),
    profilePictureUploadSaga(),
    profileUploadSaga(),
    likeScreemSaga(),
  ]);
}

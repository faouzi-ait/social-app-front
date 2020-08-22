import { takeEvery, call, put, delay } from "redux-saga/effects";
import {
  isUploadProfilePictureUploading,
  uploadProfilePictureError,
  uploadProfilePictureSuccess,
} from "../actions/upload_action";
import { uploadPicture } from "../../api/apiCalls";
import { fetchUserInfo } from "./loginSaga";
import { UPLOAD } from "../types";

export function* profilePictureUpload({ payload }) {
  try {
    yield put(isUploadProfilePictureUploading(true));
    const upload = yield call(uploadPicture, payload);
    yield put(uploadProfilePictureSuccess(upload));
    yield put(isUploadProfilePictureUploading(false));
    yield call(fetchUserInfo);
    yield delay(800);
    window.location.href = "/";
  } catch (error) {
    yield put(uploadProfilePictureError(error));
    yield put(isUploadProfilePictureUploading(false));
  }
}

export function* profilePictureUploadSaga() {
  yield takeEvery(UPLOAD.UPLOAD_PICTURE, profilePictureUpload);
}

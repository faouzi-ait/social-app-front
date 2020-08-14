import { UPLOAD } from "../types";

export const uploadProfilePicture = (payload) => {
  return { type: UPLOAD.UPLOAD_PICTURE, payload };
};

export const isUploadProfilePictureUploading = (payload) => {
  return { type: UPLOAD.IS_PICTURE_UPLOADING, payload };
};

export const uploadProfilePictureError = (payload) => {
  return { type: UPLOAD.UPLOAD_PICTURE_ERROR, payload };
};

export const uploadProfilePictureSuccess = (payload) => {
  return { type: UPLOAD.UPLOAD_PICTURE_SUCCESS, payload };
};

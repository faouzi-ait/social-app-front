import { UPLOAD } from "../types";

const initialState = {
  isPictureUploading: false,
  success: {},
  errors: {},
};

export const uploading_picture = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD.IS_PICTURE_UPLOADING:
      return {
        ...state,
        isPictureUploading: action.payload,
      };
    case UPLOAD.UPLOAD_PICTURE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case UPLOAD.UPLOAD_PICTURE_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

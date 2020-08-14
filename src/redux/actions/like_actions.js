import { LIKE } from "../types";

export const likeScreem = (id) => {
  return { type: LIKE.LIKE_SCREEM, id };
};

export const unlikeScreem = (id) => {
  return { type: LIKE.UNLIKE_SCREEM, id };
};

export const likeActionFeedback = (payload) => {
  return { type: LIKE.LIKE_FEEDBACK, payload };
};

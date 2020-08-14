import jwt_decide from "jwt-decode";
import { LIKE } from "../types";
import { TOKEN } from "../../js/jsUtils";

const initialState = {
  likes: [],
  msg: "",
};

export const like_screems = (state = initialState, action) => {
  switch (action.type) {
    case LIKE.LIKE_SCREEM:
      const userLiking = jwt_decide(TOKEN);

      return {
        likes: [
          ...state.likes,
          {
            user: userLiking.user_id,
            screemId: action.id,
          },
        ],
      };
    case LIKE.UNLIKE_SCREEM:
      const userUnliking = jwt_decide(TOKEN);
      const currentList = [...state.likes];

      const updatedListIndex = currentList.filter(
        (item) =>
          item.user === userUnliking.user_id && item.screemId !== action.id
      );

      return {
        likes: updatedListIndex,
      };
    case LIKE.LIKE_FEEDBACK:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};

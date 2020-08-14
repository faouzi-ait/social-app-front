import { TOKEN } from "../types";

export const token_reducer = (state = null, action) => {
  switch (action.type) {
    case TOKEN.SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};

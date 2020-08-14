import { TOKEN } from "../types";

export const setToken = (token) => ({
  type: TOKEN.SET_TOKEN,
  token,
});

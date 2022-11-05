import { AUTH_KEY, TOKEN_KEY } from "../constants/token";

export const getSelf = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const auth = localStorage.getItem(AUTH_KEY);

  return { token, auth: !auth ? null : (parseInt(auth) as 0 | 1) };
};

export const removeSelf = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(AUTH_KEY);
  window.location.replace("/auth");
};

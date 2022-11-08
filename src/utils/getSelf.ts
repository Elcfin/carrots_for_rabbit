import { AUTH_KEY, TOKEN_KEY, USERNAME_KEY } from "../constants/token";

export const getSelf = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const auth = localStorage.getItem(AUTH_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  return { token, auth: !auth ? null : (parseInt(auth) as 0 | 1), username };
};

export const removeSelf = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USERNAME_KEY);
  window.location.replace("/auth");
};

export const getIsLogin = () => {
  const { token, username, auth } = getSelf();
  return token && username && (auth === 0 || auth === 1);
};

export const getIsManager = () => {
  const { token, username, auth } = getSelf();
  return token && username && auth === 1;
};

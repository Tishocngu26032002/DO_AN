const AUTH_KEY = "token";

export const authLocal = {
  setToken: (token) => {
    localStorage.setItem(AUTH_KEY, token);
  },
  getToken: () => {
    return localStorage.getItem(AUTH_KEY);
  },
  removeToken: () => {
    localStorage.removeItem(AUTH_KEY);
  },
};

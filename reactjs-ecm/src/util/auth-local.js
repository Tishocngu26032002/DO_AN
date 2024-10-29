const AUTH_KEY = "ecommerce-auth";

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

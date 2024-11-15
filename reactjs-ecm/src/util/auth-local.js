const AUTH_KEY = "token";

const USER_ID_KEY = "userId";


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
export const getToken = () => {
  let token = authLocal.getToken();
  return token ? token.replace(/"/g, '') : null; 
};
export const getUserId = () => {
  let userId = userIdLocal.getUserId();
  return userId ? userId.replace(/"/g, "") : null;
};


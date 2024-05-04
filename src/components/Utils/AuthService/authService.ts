import { authKey } from "./authContants";
import {
  getFromLocalStorage,
  removedFromLocalStorage,
  setToLocalStorage,
} from "./localStorage";
import { jwtDecode } from "jwt-decode";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decoded: any = jwtDecode(authToken);
    return {
      ...decoded,
      role: decoded?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removedFromLocalStorage(authKey);
};

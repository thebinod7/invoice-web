import { getCookie } from "cookies-next/client";

export const LOCAL_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
};

export const getLocalUser = () => {
  try {
    const currentUser = localStorage.getItem(LOCAL_KEYS.USER);
    if (!currentUser) return null;
    return JSON.parse(currentUser);
  } catch (error) {}
};

export const setLocalUser = (user: any) => {
  try {
    localStorage.setItem(LOCAL_KEYS.USER, JSON.stringify(user));
  } catch (error) {}
};

export const setAccessToken = (accessToken: string) => {
  try {
    localStorage.setItem(LOCAL_KEYS.ACCESS_TOKEN, accessToken);
  } catch (error) {}
};

export const getAccessToken = (): string => {
  let accessToken = "";
  try {
    accessToken = localStorage.getItem(LOCAL_KEYS.ACCESS_TOKEN) || "";
  } catch (error) {}
  return accessToken;
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {}
};

export const generateHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
};

export const generateCookieHeaders = () => {
  const accessToken = getAccessTokenFromCookie();
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getAccessTokenFromCookie = () => {
  const token = getCookie(LOCAL_KEYS.ACCESS_TOKEN);
  return token;
};

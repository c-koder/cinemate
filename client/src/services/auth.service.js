import axios from "axios";

import { API_URL } from "../constants/api.const";

export const login = async (username, password) => {
  const response = await axios.post(API_URL + "auth/signin", {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = (username, email, password) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

import http from "../constants/http-common";

export const login = async (username, password) => {
  const response = await http.post("/auth/signin", {
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

export const signup = (username, email, password) => {
  return http.post("/auth/signup", {
    username,
    email,
    password,
  });
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

import http from "../constants/http-common";
import authHeader from "./auth-header";

export const getMovies = (params) => {
  return http.get("/movies", { params });
};

// export const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// export const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// export const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

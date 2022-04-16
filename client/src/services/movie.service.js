import http from "../constants/http-common";
import authHeader from "./auth-header";

export const getMovies = (params) => {
  return http.get("/movies", { params });
};

export const addMovie = (params) => {
  return http.post("/movies", { params });
};

export const updateMovie = (params) => {
  return http.put(`/movies/${params.id}`, { params });
};

export const deleteMovie = (params) => {
  return http.delete(`/movies/${params.id}`, { params });
};

export const getGenres = () => {
  return http.get("/genres");
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

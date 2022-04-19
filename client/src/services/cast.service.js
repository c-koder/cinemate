import http from "../common/http-common";
import authHeader from "./auth-header";

export const getMovieCasts = () => {
  return http.get("/moviecast");
};

export const addCast = (params) => {
  return http.post("/cast", { params });
};

export const updateCast = (params) => {
  return http.put(`/cast/${params.id}`, { params }, { headers: authHeader() });
};

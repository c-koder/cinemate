import http from "../common/http-common";
import authHeader from "./auth-header";

export const getRecommendation = (userId) => {
  return http.get(`/recommendations/${userId}`, { headers: authHeader() });
};

export const addRecommendation = (params) => {
  return http.post("/recommendations", { params }, { headers: authHeader() });
};

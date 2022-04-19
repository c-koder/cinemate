import http from "../common/http-common";
import authHeader from "./auth-header";

export const getReviews = (params) => {
  return http.get("/reviews", { params });
};

export const addReview = (params) => {
  return http.post("/reviews", { params }, { headers: authHeader() });
};
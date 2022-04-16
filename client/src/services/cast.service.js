import http from "../constants/http-common";
import authHeader from "./auth-header";

export const addCast = (params) => {
  return http.post("/cast", { params });
};

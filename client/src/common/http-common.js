import axios from "axios";

export default axios.create({
  baseURL: "https://cinemate-v1.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});

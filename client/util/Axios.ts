import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://api.app.localhost:3000",
  },
});

export default api;

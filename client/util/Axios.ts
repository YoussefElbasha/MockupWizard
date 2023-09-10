import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": process.env.FRONTEND_APP_URL,
  },
});

export default api;

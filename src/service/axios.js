import axios from "axios";

const api = axios.create({
  baseURL: "https://medify-backend-api.onrender.com/api/company",
});

export default api;

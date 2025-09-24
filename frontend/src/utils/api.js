import axios from "axios";

const API = axios.create({
  baseURL: "https://shopease-ecommerce-backend.onrender.com/api",
  withCredentials: true, // send cookies by default to the backend
});

export default API;

// src/api/axios.js
import axios from "axios";

const envApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  STORAGEKEY: import.meta.env.STORAGEKEY,
});

export default envApi;

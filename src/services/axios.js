// services/axios.js
import axios from "axios";
import { secureStorage } from "../utils/secureStorage";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor to add token automatically if available
instance.interceptors.request.use(
  (config) => {
    // Get token from encrypted storage
    const token = secureStorage.getItem("userToken") || secureStorage.getItem("adminToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    config.withCredentials = true;
    
    // إضافة credentials للسماح بإرسال cookies (HttpOnly cookies)
    config.withCredentials = true;
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

import axios from "axios";

// Prefer env var if provided; fallback to the provided Vercel backend URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://bookstore-backend-ashy.vercel.app";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default apiClient;



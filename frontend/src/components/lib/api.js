import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const API = import.meta.env.VITE_API_URL;

// Create axios instance ONCE
const api = axios.create({
  baseURL: API,
});

// Custom hook that attaches token CLEANLY
export function useApi() {
  const { getToken } = useAuth();

  // Attach token on each request, without stacking
  async function authRequest(config) {
    const token = await getToken({ template: "default" });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  // Remove any previous interceptor to avoid duplicates
  api.interceptors.request.handlers = [];

  // Register a fresh interceptor
  api.interceptors.request.use(authRequest);

  return api;
}

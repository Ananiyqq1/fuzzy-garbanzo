import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8090",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function; config: any }> =
  [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const auth = useAuthStore();
      try {
        await api.post("/auth/refresh");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        router.push("/auth");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;

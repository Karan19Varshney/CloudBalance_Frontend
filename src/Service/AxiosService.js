import axios from "axios";
import { clearUserData } from "../Redux/action";
import { store } from "../Redux/store";
import { toast } from 'react-toastify';


const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    // Check if 401 and NOT login request
    if (status === 401 && !url.includes("/auth/login")) {
      localStorage.removeItem("token");
      store.dispatch(clearUserData());
      () => toast.error("Session expired. Please login again.");
    }

    const customError = {
      status: status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };

    return Promise.reject(customError);
  }
);

const apiClient = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
};

export default apiClient;
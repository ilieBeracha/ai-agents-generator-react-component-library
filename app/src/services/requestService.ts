import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { authStore } from "../store/authStore";

const VITE_BASE_URL: string | undefined = import.meta.env.VITE_BASE_URL;
const VITE_API_PORT: number = parseInt(import.meta.env.VITE_API_PORT || "0");

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${VITE_BASE_URL}${VITE_API_PORT}/api`,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config as unknown as InternalAxiosRequestConfig<any>;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      authStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

import axios from "axios";
import { VITE_BACKEND_API_URL } from '../config/env'
import { store } from "../store";
import { clearUser, setUser } from "../store/authSlice";

export const api = axios.create({
  baseURL: `${VITE_BACKEND_API_URL}`, // Cambia según tu backend
  headers: { "Content-Type": "application/json" }
});

api.defaults.withCredentials = true

// 🔑 Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si da 401 → intentar refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${VITE_BACKEND_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newUser = refreshRes.data.user;
        store.dispatch(setUser(newUser));

        // Reintentar la petición original con las cookies actualizadas
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearUser());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
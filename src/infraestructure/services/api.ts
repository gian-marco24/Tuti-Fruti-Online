import axios from "axios";
import { VITE_BACKEND_API_URL } from '../config/env'

export const api = axios.create({
    baseURL: `${VITE_BACKEND_API_URL}`, // Cambia según tu backend
    headers: { "Content-Type": "application/json" }
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
    (response) => response, // Retorna la respuesta normal
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized, logging out...");
        }
        return Promise.reject(error);
    }
);

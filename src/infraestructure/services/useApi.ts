import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse, type Method, type AxiosHeaders } from "axios";
import { api } from "./api";
import type { userData } from "../schemas/userSchema";

interface Body {
  [key: string]: unknown;
}

export interface UseApiOptions {
  autoFetch?: boolean;
  params: ApiCallOptions;
}

export interface ApiCallOptions {
  method: Method;
  url: string;
  query?: Record<string, unknown>;
  pathParam?: string;
  body?: Body;
  headers?: AxiosHeaders;
}

interface UseApiCall<T> {
  call: Promise<AxiosResponse<T>>;
  controller: AbortController;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  user?: userData;
  error?: { message: string };
}

// Cambia el tipo de ApiResult y el estado data para aceptar ambos tipos
export interface ApiResult<T> {
  data: T | userData | null;
  error: string | null;
  fieldErrors?: Record<string, string>;
}

interface FieldError {
  field: string;
  message: string;
}

interface ValidationError {
  errors: FieldError[];
}


// 📌 Custom Hook principal
export const useApi = <T>(optionsRef: RefObject<UseApiOptions>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | userData | null>(null)
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cancelar request en curso
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
  }, []);

  // Ejecutar request
  const fetch = useCallback(
    async (param: ApiCallOptions): Promise<ApiResult<T>> => {
      cancel();
      setLoading(true);
      setError(null);

      const { call, controller } = apiCall<ApiResponse<T>>(param);
      abortControllerRef.current = controller;

      try {
        const response = await call;
        if (!controller.signal.aborted) {
          const resultData = response.data.data ?? response.data.user ?? null;
          setData(resultData);
          return { data: resultData, error: null };
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          // Detectamos error de validación de Zod (422)
          if (err.response?.status === 422) {
            const validationErrors = (err.response.data as ValidationError)?.errors ?? [];
            const fieldErrors: Record<string, string> = {};
            validationErrors.forEach(e => {
              fieldErrors[e.field] = e.message; // toma el último mensaje si hay repetidos
            });
            return { data: null, error: "Errores de validación", fieldErrors };
          }

          // Otros errores de backend
          const backendMessage =
            (err.response?.data as { error?: string })?.error ??
            err.message ??
            "Ocurrió un error inesperado.";
          setError(backendMessage);
          return { data: null, error: backendMessage };
        } else if (err instanceof Error) {
          setError(err.message);
          return { data: null, error: err.message };
        } else {
          setError("Error desconocido");
          return { data: null, error: "Error desconocido" };
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }

      return { data: null, error: "Abortado" };
    },
    [cancel]
  );


  // Manejar llamadas (permite overridear params en runtime)
  const handleCall = useCallback(
    async (overrideParams?: Partial<ApiCallOptions>): Promise<ApiResult<T>> => {
      const baseParams = optionsRef.current.params;
      const finalParams = { ...baseParams, ...overrideParams };
      return await fetch(finalParams);
    },
    [fetch, optionsRef]
  );

  // Auto-fetch al montar si se configura
  useEffect(() => {
    if (optionsRef.current?.autoFetch) {
      fetch(optionsRef.current.params);
    }
    return () => cancel();
  }, [cancel, fetch, optionsRef]);

  return { loading, data, error, cancel, handleCall };
};

// 📌 Función auxiliar que construye el request
const apiCall = <T>({
  method,
  url,
  pathParam,
  query,
  body,
  headers,
}: ApiCallOptions): UseApiCall<T> => {
  const controller = new AbortController();
  const fullUrl = pathParam ? `${url.replace(/\/$/, "")}/${pathParam}` : url;

  const config: AxiosRequestConfig = {
    method,
    url: fullUrl,
    params: query,
    data: body,
    signal: controller.signal,
    headers,
  };

  const call = api.request<T>(config);
  return { call, controller };
};

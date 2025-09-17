import { useState, useRef } from 'react'
import { type RegisterSchema } from "../schemas/registerSchema";
import { useNavigate } from 'react-router-dom';
import { useApi, type UseApiOptions } from '../../../infraestructure/services/useApi';
import { type UseFormSetError } from "react-hook-form";

export const useAuth = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | string[] | null>(null)
  const [success, setSuccess] = useState(false)

  const optionsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: "POST",
      url: "",
    },
  });

  const { handleCall } = useApi(optionsRef)

  const submitRegister = async (data: RegisterSchema, setFormErrors: UseFormSetError<RegisterSchema>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await handleCall({
      method: "POST",
      url: "/auth/register",
      body: data,
    });

    // Si hay errores de validación de campos
    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setFormErrors(field as keyof RegisterSchema, { type: "server", message });
      });
      setLoading(false);
      return;
    }

    // Si hay error global
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Éxito
    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate("/"), 1000);
  };

  return {
    submitRegister,
    loading,
    error,
    success,
  };
};
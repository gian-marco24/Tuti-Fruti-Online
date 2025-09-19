import { useState, useRef } from 'react'
import { type RegisterSchema } from "../schemas/registerSchema";
import { type LoginSchema } from '../schemas/loginSchema';
import { useNavigate } from 'react-router-dom';
import { useApi, type UseApiOptions } from '../../../infraestructure/services/useApi';
import { type UseFormSetError } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../infraestructure/store/authSlice";
import type { userData } from '../../../infraestructure/schemas/userSchema';
import { AxiosHeaders } from 'axios';

export const useAuth = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | string[] | null>(null)
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()

  const optionsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: "POST",
      url: "",
      headers: new AxiosHeaders({ "Content-Type": "application/json" })
      
    },
  });

  const { handleCall } = useApi(optionsRef)

  const submitRegister = async (data: RegisterSchema, setFormErrors: UseFormSetError<RegisterSchema>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const registerData = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    const result = await handleCall({
      method: "POST",
      url: "/auth/register",
      body: registerData,
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

    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate("/"), 1000);
  };

  const submitLogin = async (data: LoginSchema, setFormErrors: UseFormSetError<LoginSchema>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await handleCall({
      method: "POST",
      url: "/auth/login",
      body: data,
    });

    // Si hay errores de validación de campos
    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setFormErrors(field as keyof LoginSchema, { type: "server", message });
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
    dispatch(setUser(result.data as userData))

    // Éxito
    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate("/profile"), 1000);
  };

  return {
    submitRegister,
    submitLogin,
    loading,
    error,
    success,
  };
};
import { useState, useRef } from "react"
import { useApi, type UseApiOptions } from '../../../infraestructure/services/useApi';
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../../infraestructure/store/authSlice";
import { useNavigate } from "react-router-dom";
import type { userData } from '../../../infraestructure/schemas/userSchema';
import { AxiosHeaders } from "axios";

export const useProfile = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const optionsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: "POST",
      url: "",
      headers: new AxiosHeaders({ "Content-Type": "application/json" })
    },
  });

  const { handleCall } = useApi(optionsRef)

  const logOut = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const result = await handleCall({
      method: 'POST',
      url: '/auth/logout'
    })

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    dispatch(clearUser())

    setSuccess(true)
    setLoading(false)
    navigate("/login")
  }

  const changeUsername = async (username: string) => {
    setLoading(true)
    setError(null)
    const result = await handleCall({
      method: 'PUT',
      url: '/user/username',
      body: {username},
    })

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    dispatch(setUser(result.data as userData))
    setLoading(false)
  }

  return {
    error,
    loading,
    success,
    logOut,
    changeUsername
  }
}
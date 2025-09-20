import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"
import { type RootState } from '../infraestructure/store';

const PublicRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return user ? <Navigate to="/profile"/> : <Outlet /> 
}

export default PublicRoutes
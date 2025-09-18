import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { type RootState } from '../infraestructure/store';


const ProtectedRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  console.log(user)
  return user ? <Outlet/> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
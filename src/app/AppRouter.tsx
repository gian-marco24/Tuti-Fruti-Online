import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../features/home/pages/HomeScreen'
import LoginScreen from '../features/auth/pages/LoginScreen'
import RegisterScreen from '../features/auth/pages/RegisterScreen'
import ProfileScreen from '../features/profile/pages/ProfileScreen'
import ProtectedRoutes from './ProtectedRoutes'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
    </Routes>
  )
}

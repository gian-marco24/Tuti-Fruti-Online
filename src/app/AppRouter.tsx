import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../features/home/pages/HomeScreen'
import { LoginScreen } from '../features/auth/pages/LoginScreen'
import RegisterScreen from '../features/auth/pages/RegisterScreen'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Routes>
  )
}

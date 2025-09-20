import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../features/home/pages/HomeScreen'
import LoginScreen from '../features/auth/pages/LoginScreen'
import RegisterScreen from '../features/auth/pages/RegisterScreen'
import ProfileScreen from '../features/profile/pages/ProfileScreen'
import LobbiesScreen from '../features/lobbies/pages/LobbiesScreen'
import ProtectedRoutes from './ProtectedRoutes'
import PublicRoutes from './PublicRoutes'
import CreateRoomPage from '../features/lobbies/pages/CreateLobbyScreen'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route element={<PublicRoutes />}>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='/lobbies' element={<LobbiesScreen />} />
      <Route path='/create-room' element={<CreateRoomPage />} />
    </Routes>
  )
}

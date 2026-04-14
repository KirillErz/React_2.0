import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage } from './LoginPage'
import { ProfilePage } from './ProfilePage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicPage } from './PublicPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<PublicPage />} />
      <Route path='/login' element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='profile' element={<ProfilePage />} />
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

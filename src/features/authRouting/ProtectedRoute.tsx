import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from './useAuth'

export function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <p>Проверяем авторизацию...</p>
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return <Outlet />
}

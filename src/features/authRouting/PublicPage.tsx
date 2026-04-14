import { Link } from 'react-router-dom'

import { useAuth } from './useAuth'

export function PublicPage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: 16 }}>
      <h1>Public Page</h1>
      <p>Это публичный маршрут. Отсюда можно перейти к логину или в профиль.</p>

      <ul>
        <li>
          <Link to='/login'>/login</Link>
        </li>
        <li>
          <Link to='/profile'>/profile</Link>
        </li>
      </ul>

      <p>
        Текущий статус: {isAuthenticated ? `авторизован (${user?.email ?? 'пользователь'})` : 'не авторизован'}
      </p>
    </main>
  )
}

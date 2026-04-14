import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from './useAuth'

export function ProfilePage() {
  const { user, token, refreshUser, logout, isLoading } = useAuth()
  const navigate = useNavigate()

  const formattedRoles = useMemo(() => {
    if (!user?.roles?.length) {
      return 'USER'
    }

    return user.roles.join(', ')
  }, [user?.roles])

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const handleRefresh = async () => {
    try {
      await refreshUser()
    } catch {
      navigate('/login', { replace: true })
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: 16 }}>
      <h1>Profile</h1>
      <p>Это приватный маршрут. Без токена сюда нельзя попасть.</p>

      <section style={{ marginTop: 16 }}>
        <h2>Пользователь</h2>
        {user ? (
          <ul>
            <li>ID: {user.id}</li>
            <li>Email: {user.email}</li>
            <li>Name: {user.name}</li>
            <li>Roles: {formattedRoles}</li>
            {user.about ? <li>About: {user.about}</li> : null}
          </ul>
        ) : (
          <p>Данные пользователя загружаются...</p>
        )}
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Токен</h2>
        <code style={{ wordBreak: 'break-all' }}>{token ?? 'Токен отсутствует'}</code>
      </section>

      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <button type='button' onClick={handleRefresh} disabled={isLoading}>
          Обновить профиль
        </button>
        <button type='button' onClick={handleLogout}>
          Выйти
        </button>
      </div>

      <p style={{ marginTop: 16 }}>
        На публичную страницу: <Link to='/'>/</Link>
      </p>
    </main>
  )
}

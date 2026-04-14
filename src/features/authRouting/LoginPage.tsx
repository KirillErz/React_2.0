import { useMemo } from 'react'
import { useFormik } from 'formik'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from './useAuth'

type LocationState = {
  from?: {
    pathname?: string
  }
}

export function LoginPage() {
  const { login, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const nextPath = useMemo(() => {
    const state = location.state as LocationState | null
    return state?.from?.pathname ?? '/profile'
  }, [location.state])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: {
        email?: string
        password?: string
      } = {}

      if (!values.email.trim()) {
        errors.email = 'Email обязателен.'
      }

      if (!values.password.trim()) {
        errors.password = 'Пароль обязателен.'
      }

      return errors
    },
    onSubmit: async (values, helpers) => {
      helpers.setStatus(undefined)

      try {
        await login({ email: values.email, password: values.password })
        navigate(nextPath, { replace: true })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ошибка авторизации'
        helpers.setStatus(message)
      }
    },
  })

  if (isAuthenticated) {
    return <Navigate to='/profile' replace />
  }

  return (
    <main style={{ maxWidth: 480, margin: '40px auto', padding: 16 }}>
      <h1>Login</h1>
      <p>Войдите, чтобы открыть приватный маршрут профиля.</p>

      <form onSubmit={formik.handleSubmit} style={{ display: 'grid', gap: 12 }} noValidate>
        <label style={{ display: 'grid', gap: 4 }}>
          <span>Email</span>
          <input
            name='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete='email'
            aria-invalid={Boolean((formik.touched.email || formik.submitCount > 0) && formik.errors.email)}
            required
          />
          {(formik.touched.email || formik.submitCount > 0) && formik.errors.email ? (
            <span style={{ color: 'crimson' }}>{formik.errors.email}</span>
          ) : null}
        </label>

        <label style={{ display: 'grid', gap: 4 }}>
          <span>Password</span>
          <input
            name='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete='current-password'
            aria-invalid={Boolean(
              (formik.touched.password || formik.submitCount > 0) && formik.errors.password,
            )}
            required
          />
          {(formik.touched.password || formik.submitCount > 0) && formik.errors.password ? (
            <span style={{ color: 'crimson' }}>{formik.errors.password}</span>
          ) : null}
        </label>

        {formik.status ? <p style={{ color: 'crimson' }}>{formik.status as string}</p> : null}

        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Входим...' : 'Войти'}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Публичная страница: <Link to='/'>/</Link>
      </p>
    </main>
  )
}

import { type SerializedError } from '@reduxjs/toolkit'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'

import type { AppDispatch } from 'app/store'

import { authApi, type AuthUser, type LoginPayload } from './authApi'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const AUTH_TOKEN_KEY = 'auth_access_token'

type ApiError = {
  message?: string[] | string
}

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getErrorMessage(errorData: ApiError | null): string {
  if (!errorData?.message) {
    return 'Не удалось выполнить запрос. Попробуйте ещё раз.'
  }

  if (Array.isArray(errorData.message)) {
    return errorData.message.join(', ')
  }

  return errorData.message
}

function normalizeAccessToken(token: string): string {
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`
}

function getRtkErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Не удалось выполнить запрос. Попробуйте ещё раз.'
  }

  const queryError = error as FetchBaseQueryError
  if ('data' in queryError) {
    if (typeof queryError.data === 'string') {
      return queryError.data
    }

    return getErrorMessage((queryError.data ?? null) as ApiError | null)
  }

  const serializedError = error as SerializedError
  if (serializedError.message) {
    return serializedError.message
  }

  return 'Не удалось выполнить запрос. Попробуйте ещё раз.'
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY))
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(localStorage.getItem(AUTH_TOKEN_KEY)))

  const clearAuth = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    if (!token) {
      return
    }

    setIsLoading(true)

    try {
      const currentUser = await dispatch(
        authApi.endpoints.refreshUser.initiate(token, {
          subscribe: false,
        }),
      ).unwrap()
      setUser(currentUser)
    } catch (error) {
      clearAuth()
      throw new Error(getRtkErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [clearAuth, dispatch, token])

  const login = useCallback(
    async ({ email, password }: LoginPayload) => {
      setIsLoading(true)

      try {
        const data = await dispatch(
          authApi.endpoints.login.initiate(
            { email, password },
            {
              track: false,
            },
          ),
        ).unwrap()
        const nextToken = normalizeAccessToken(data.accessToken)

        localStorage.setItem(AUTH_TOKEN_KEY, nextToken)
        setToken(nextToken)
        setUser(data.user)
      } catch (error) {
        throw new Error(getRtkErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch],
  )

  const logout = useCallback(async () => {
    try {
      await dispatch(
        authApi.endpoints.logout.initiate(undefined, {
          track: false,
        }),
      ).unwrap()
    } catch {
      // noop: даже если logout API упал, локально пользователь должен выйти.
    } finally {
      clearAuth()
    }
  }, [clearAuth, dispatch])

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    void refreshUser().catch(() => undefined)
  }, [refreshUser, token])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      logout,
      refreshUser,
    }),
    [isLoading, login, logout, refreshUser, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

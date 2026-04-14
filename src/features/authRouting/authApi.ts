import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const API_BASE_URL = 'https://api.v2.react-learning.ru/api'
const API_FALLBACK_BASE_URL = 'https://api.v2.react-learning.ru'

const primaryBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
})

const fallbackBaseQuery = fetchBaseQuery({
  baseUrl: API_FALLBACK_BASE_URL,
})

const baseQueryWithFallback: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const primaryResult = await primaryBaseQuery(args, api, extraOptions)

  if (primaryResult.error?.status !== 404) {
    return primaryResult
  }

  return fallbackBaseQuery(args, api, extraOptions)
}

export type LoginPayload = {
  email: string
  password: string
}

export type AuthUser = {
  id: string
  email: string
  name?: string
  avatarPath?: string
  about?: string
  phone?: string
  roles?: string[]
}

export type AuthResponse = {
  user: AuthUser
  accessToken: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithFallback,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    refreshUser: builder.query<AuthUser, string>({
      query: (token) => ({
        url: '/users/me',
        method: 'GET',
        headers: {
          Authorization: token,
        },
      }),
    }),
    logout: builder.mutation<string, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
        credentials: 'include',
        responseHandler: 'text',
      }),
    }),
  }),
})

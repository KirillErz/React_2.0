import { configureStore } from '@reduxjs/toolkit'

import { tasksApi } from 'entities/task'
import { authApi } from 'features/authRouting/authApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

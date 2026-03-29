import type { ReactElement } from 'react'

import { HomePage } from 'pages/home/ui/HomePage'
import { RegisterPage } from 'pages/register/ui/RegisterPage'
import { TaskPage } from 'pages/tasks/ui/TaskPage'

type AppRoute = {
  path: string
  element: ReactElement
}

const routes: AppRoute[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tasks',
    element: <TaskPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]

export function AppRouter() {
  const currentPath = window.location.pathname
  const matchedRoute = routes.find((route) => route.path === currentPath)

  return matchedRoute?.element ?? <HomePage />
}

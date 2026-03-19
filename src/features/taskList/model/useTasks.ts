import { useCallback, useEffect, useMemo, useState } from 'react'

import type { Task } from 'entities/task/model/types'
import { useGetTasksQuery } from 'features/taskList/api/tasksApi'

export type Filter = 'all' | 'completed' | 'incomplete'

export function useTasks(initial?: Task[]): {
  tasks: Task[]
  filter: Filter
  setFilter: (f: Filter) => void
  removeTask: (id: string) => void
  isLoading: boolean
  isError: boolean
} {
  const [allTasks, setAllTasks] = useState<Task[]>(() => initial ?? [])
  const [filter, setFilter] = useState<Filter>('all')
  const { data: loadedTasks = [], isLoading, isError } = useGetTasksQuery()

  useEffect(() => {
    if (initial?.length) {
      setAllTasks(initial)
      return
    }

    setAllTasks(loadedTasks)
  }, [initial, loadedTasks])

  const tasks = useMemo(() => {
    if (filter === 'completed') {
      return allTasks.filter((task) => task.completed)
    }

    if (filter === 'incomplete') {
      return allTasks.filter((task) => !task.completed)
    }

    return allTasks
  }, [allTasks, filter])

  const removeTask = useCallback((id: string) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }, [])

  return {
    tasks,
    filter,
    setFilter,
    removeTask,
    isLoading,
    isError,
  }
}

import { useMemo, useState } from 'react'

import type { Task } from 'entities/task/model/types'

export type Filter = 'all' | 'completed' | 'incomplete'

const defaultTasks: Task[] = [
  { id: '1', title: 'Write weekly report', completed: false },
  { id: '2', title: 'Review PR #42', completed: true },
  { id: '3', title: 'Plan next sprint', completed: false },
]

export function useTasks(initial: Task[] = defaultTasks): {
  tasks: Task[]
  filter: Filter
  setFilter: (f: Filter) => void
  removeTask: (id: string) => void
} {
  const [allTasks, setAllTasks] = useState<Task[]>(initial)
  const [filter, setFilter] = useState<Filter>('all')

  const tasks = useMemo(() => {
    if (filter === 'completed') {
      return allTasks.filter((task) => task.completed)
    }

    if (filter === 'incomplete') {
      return allTasks.filter((task) => !task.completed)
    }

    return allTasks
  }, [allTasks, filter])

  const removeTask = (id: string) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return {
    tasks,
    filter,
    setFilter,
    removeTask,
  }
}

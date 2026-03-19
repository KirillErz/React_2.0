import { TaskCard, type Task } from 'entities/task'
import { type Filter, useTasks } from 'features/taskList/model/useTasks'

import styles from './TaskList.module.css'

type TaskListProps = {
  initialTasks?: Task[]
}

const filterLabels: Record<Filter, string> = {
  all: 'All',
  completed: 'Completed',
  incomplete: 'Incomplete',
}

export function TaskList({ initialTasks }: TaskListProps) {
  const { tasks, filter, setFilter, removeTask, isLoading, isError } = useTasks(initialTasks)

  if (isLoading && tasks.length === 0) {
    return <p className={styles.empty}>Loading tasks...</p>
  }

  if (isError) {
    return <p className={styles.empty}>Failed to load tasks.</p>
  }

  return (
    <section>
      <div className={styles.controls}>
        {(Object.keys(filterLabels) as Filter[]).map((filterKey) => (
          <button
            key={filterKey}
            type='button'
            className={`${styles.filterButton} ${filter === filterKey ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter(filterKey)}
          >
            {filterLabels[filterKey]}
          </button>
        ))}
      </div>

      {tasks.length ? (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <TaskCard task={task} onRemove={removeTask} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No tasks for selected filter.</p>
      )}
    </section>
  )
}

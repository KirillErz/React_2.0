import { memo } from 'react'

import type { Task } from 'entities/task/model/types'

import styles from './TaskCard.module.css'

type TaskCardProps = {
  task: Task
  onRemove: (id: string) => void
}

function TaskCardComponent({ task, onRemove }: TaskCardProps) {
  const statusText = task.completed ? 'Выполнен' : 'Не выполнен'

  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{task.title}</h2>
      <div className={styles.actions}>
        <span
          className={`${styles.status} ${task.completed ? styles.completed : styles.pending}`}
          aria-label={statusText}
          title={statusText}
        >
          {statusText}
        </span>
        <button
          type='button'
          className={styles.removeButton}
          onClick={() => onRemove(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export const TaskCard = memo(TaskCardComponent)

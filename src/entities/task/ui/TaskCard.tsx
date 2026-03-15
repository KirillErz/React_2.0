import type { Task } from 'entities/task/model/types'

import styles from './TaskCard.module.css'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{task.title}</h2>
      <span
        className={`${styles.status} ${task.completed ? styles.completed : styles.pending}`}
        aria-label={task.completed ? 'Completed' : 'Not completed'}
        title={task.completed ? 'Completed' : 'Not completed'}
      >
        {task.completed ? '✓' : '•'}
      </span>
    </article>
  )
}

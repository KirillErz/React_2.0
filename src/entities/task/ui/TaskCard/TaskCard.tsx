import type { Task } from 'entities/task/model/types/task'

import styles from './TaskCard.module.css'

type TaskCardProps = {
  task: Task
}

const statusLabels: Record<Task['status'], string> = {
  todo: 'To do',
  inProgress: 'In progress',
  done: 'Done',
}

const statusClasses: Record<Task['status'], string> = {
  todo: styles.badgeTodo,
  inProgress: styles.badgeInProgress,
  done: styles.badgeDone,
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{task.title}</h2>
        <span className={`${styles.badge} ${statusClasses[task.status]}`}>
          {statusLabels[task.status]}
        </span>
      </header>

      {task.description ? (
        <p className={styles.description}>{task.description}</p>
      ) : null}

      {task.dueDate ? <p className={styles.meta}>Due: {task.dueDate}</p> : null}
    </article>
  )
}

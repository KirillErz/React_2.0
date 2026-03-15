import { TaskList } from 'features/taskList'

import styles from './TaskWidget.module.css'

export function TaskWidget() {
  return (
    <div className={styles.wrapper}> 
      <TaskList />
    </div>
  )
}

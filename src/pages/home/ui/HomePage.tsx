import { TaskCard, type Task } from 'entities/task'

const demoTask: Task = {
  id: 'task-1',
  title: 'Prepare sprint demo',
  completed: false,
}

export function HomePage() {
  return (
    <main>
      <h1>FSD App</h1>
      <p>Project structure is ready.</p>
      <TaskCard task={demoTask} />
    </main>
  )
}

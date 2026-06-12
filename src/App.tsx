import { useState } from 'react'
import { TaskForm } from './Components/TaskForm'
import { TaskList } from './Components/TaskList'
import type { Task } from './types/Task'
import './App.css'

export default function App() {
  // TODO: gestionar el estado de las tareas (useState o useReducer)
  const [tasks] = useState<Task[]>([])
  const [editingTaskId] = useState<string | null>(null)

  // TODO: crear una nueva tarea
  const handleCreateTask = (_title: string) => {}

  // TODO: alternar completada / pendiente
  const handleToggleTask = (_id: string) => {}

  // TODO: activar modo edición de una tarea
  const handleStartEdit = (_id: string) => {}

  // TODO: guardar cambios de una tarea editada
  const handleSaveEdit = (_id: string, _title: string) => {}

  // TODO: cancelar edición
  const handleCancelEdit = () => {}

  // TODO: eliminar una tarea
  const handleDeleteTask = (_id: string) => {}

  const pendingCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <h1 className="app__title">Task Manager</h1>
          <p className="app__subtitle">
            Organiza tus tareas del día a día
          </p>
        </header>

        <main className="app__main">
          <TaskForm onSubmit={handleCreateTask} />

          <div className="app__stats">
            <span>Total: {tasks.length}</span>
            <span>
              Pendientes:{' '}
              <span className="app__stats-count">{pendingCount}</span>
            </span>
          </div>

          <TaskList
            tasks={tasks}
            editingTaskId={editingTaskId}
            onToggle={handleToggleTask}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDeleteTask}
          />
        </main>
      </div>
    </div>
  )
}

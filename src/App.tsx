import { useState } from 'react'
import { TaskForm } from './Components/TaskForm'
import { TaskList } from './Components/TaskList'
import type { Task } from './types/Task'
import './App.css'

export default function App() {
  // TODO: gestionar el estado de las tareas (useState o useReducer)
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTaskId,setEditingTaskId] = useState<string | null>(null)

  // TODO: crear una nueva tarea
  const handleCreateTask = (_title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: _title,
      completed: false
    }

    setTasks((prevTasks) => [...prevTasks,newTask])
  }

  // TODO: alternar completada / pendiente
  const handleToggleTask = (_id: string) => {
    setTasks((prevTasks) => prevTasks.map((task) =>{
      if(task.id === _id) {
        return {...task, completed: !task.completed}
      }
      return task
    }))
  }

  // TODO: activar modo edición de una tarea
  const handleStartEdit = (_id: string) => {
    setEditingTaskId(_id);
  }

  // TODO: guardar cambios de una tarea editada
  const handleSaveEdit = (_id: string, _title: string) => {
    setTasks((prevTasks) => prevTasks.map((task) =>{
      if(task.id === _id) {
        return {...task, title: _title}
      }
      return task
    }))
    setEditingTaskId(null);
  }

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

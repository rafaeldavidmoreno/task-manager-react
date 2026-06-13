import { useEffect, useState } from 'react'
import { TaskForm } from './Components/TaskForm'
import { TaskList } from './Components/TaskList'
import type { Task } from './types/Task'
import { loadTasks, saveTasks } from './utils/taskStorage'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // create a new task
  const handleCreateTask = (_title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: _title,
      completed: false
    }

    setTasks((prevTasks) => [...prevTasks,newTask])
  }

  // toggle completed / pending
  const handleToggleTask = (_id: string) => {
    setTasks((prevTasks) => prevTasks.map((task) =>{
      if(task.id === _id) {
        return {...task, completed: !task.completed}
      }
      return task
    }))
  }

  // enable task edit mode
  const handleStartEdit = (_id: string) => {
    setEditingTaskId(_id);
  }

  // save edited task changes
  const handleSaveEdit = (_id: string, _title: string) => {
    setTasks((prevTasks) => prevTasks.map((task) =>{
      if(task.id === _id) {
        return {...task, title: _title}
      }
      return task
    }))
    setEditingTaskId(null);
  }

  // cancel editing
  const handleCancelEdit = () => {
    setEditingTaskId(null);
  }

  // delete a task
  const handleDeleteTask = (_id: string) => {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== _id))
  }

  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <h1 className="app__title">Task Manager</h1>
          <p className="app__subtitle">
            Organize your daily tasks
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

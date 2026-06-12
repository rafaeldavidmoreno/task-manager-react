import type { Task } from '../types/Task'
import { TaskItem } from './TaskItem'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  editingTaskId: string | null
  onToggle: (id: string) => void
  onStartEdit: (id: string) => void
  onSaveEdit: (id: string, title: string) => void
  onCancelEdit: () => void
  onDelete: (id: string) => void
}

export const TaskList = ({
  tasks,
  editingTaskId,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskListProps) => {
  const pendingCount = tasks.filter((task) => !task.completed).length

  return (
    <section className="task-list" aria-label="Lista de tareas">
      <header className="task-list__header">
        <h2 className="task-list__title">Mis tareas</h2>
        <span className="task-list__count">
          {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}
        </span>
      </header>

      {tasks.length === 0 ? (
        <div className="task-list__empty">
          <span className="task-list__empty-icon" aria-hidden="true">
            📋
          </span>
          <p className="task-list__empty-text">No hay tareas todavía</p>
          <p className="task-list__empty-hint">
            Usa el formulario de arriba para crear tu primera tarea
          </p>
        </div>
      ) : (
        <ul className="task-list__items">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskItem
                task={task}
                isEditing={editingTaskId === task.id}
                onToggle={onToggle}
                onStartEdit={onStartEdit}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

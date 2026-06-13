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
    <section className="task-list" aria-label="Task list">
      <header className="task-list__header">
        <h2 className="task-list__title">My tasks</h2>
        <span className="task-list__count">
          {pendingCount} pending
        </span>
      </header>

      {tasks.length === 0 ? (
        <div className="task-list__empty">
          <span className="task-list__empty-icon" aria-hidden="true">
            📋
          </span>
          <p className="task-list__empty-text">No tasks yet</p>
          <p className="task-list__empty-hint">
            Use the form above to create your first task
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

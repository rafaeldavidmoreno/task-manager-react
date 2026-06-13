import type { FormEvent } from 'react'
import type { Task } from '../types/Task'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
  isEditing: boolean
  onToggle: (id: string) => void
  onStartEdit: (id: string) => void
  onSaveEdit: (id: string, title: string) => void
  onCancelEdit: () => void
  onDelete: (id: string) => void
}

export const TaskItem = ({
  task,
  isEditing,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskItemProps) => {
  const handleSaveEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = (formData.get('title') as string).trim()

    if (!title) return

    onSaveEdit(task.id, title)
  }

  return (
    <article
      className={`task-item${task.completed ? ' task-item--completed' : ''}`}
    >
      <input
        className="task-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as completed`}
      />

      {isEditing ? (
        <form className="task-item__edit-form" onSubmit={handleSaveEdit}>
          <input
            className="task-item__edit-input"
            type="text"
            name="title"
            defaultValue={task.title}
            autoFocus
            aria-label="Edit task title"
          />
          <div className="task-item__actions">
            <button
              className="task-item__button task-item__button--save"
              type="submit"
            >
              Save
            </button>
            <button
              className="task-item__button"
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-item__content">
            <p className="task-item__title">{task.title}</p>
          </div>

          <div className="task-item__actions">
            <button
              className="task-item__button task-item__button--edit"
              type="button"
              onClick={() => onStartEdit(task.id)}
            >
              Edit
            </button>
            <button
              className="task-item__button task-item__button--delete"
              type="button"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  )
}

import type { FormEvent } from 'react'
import './TaskForm.css'

interface TaskFormProps {
  onSubmit: (title: string) => void
}

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = (formData.get('title') as string).trim()

    if (!title) return

    onSubmit(title)
    event.currentTarget.reset()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="task-form__label" htmlFor="task-title">
        New task
      </label>

      <div className="task-form__row">
        <input
          id="task-title"
          className="task-form__input"
          type="text"
          name="title"
          placeholder="Write a task..."
          autoComplete="off"
        />
        <button className="task-form__button" type="submit">
          Add
        </button>
      </div>
    </form>
  )
}

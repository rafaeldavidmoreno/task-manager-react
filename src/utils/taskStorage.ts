import type { Task } from '../types/Task'

const STORAGE_KEY = 'task-manager-tasks'

function isValidTask(value: unknown): value is Task {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'completed' in value &&
    typeof (value as Task).id === 'string' &&
    typeof (value as Task).title === 'string' &&
    typeof (value as Task).completed === 'boolean'
  )
}

export function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(isValidTask)
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

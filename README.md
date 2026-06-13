# Task Manager React

A simple and responsive task manager built with React and TypeScript. Create, read, update, and delete tasks with a clean UI, and keep your data after refreshing the page thanks to `localStorage` persistence.

## Features

- **Create tasks** — Add new tasks from a form with validation
- **Mark as completed** — Toggle task status with a checkbox
- **Edit tasks** — Inline editing with save and cancel actions
- **Delete tasks** — Remove tasks from the list
- **Persistent storage** — Tasks are saved in `localStorage` and restored on reload
- **Responsive layout** — Works on desktop and mobile screens

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- CSS with custom properties (no UI framework)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/rafaeldavidmoreno/task-manager-react.git
cd task-manager-react
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── Components/
│   ├── TaskForm.tsx      # Form to create new tasks
│   ├── TaskList.tsx      # Task list and empty state
│   └── TaskItem.tsx      # Single task with edit/delete actions
├── types/
│   └── Task.ts           # Task interface
├── utils/
│   └── taskStorage.ts    # localStorage load/save helpers
├── App.tsx               # App state and CRUD handlers
├── App.css
├── index.css             # Global styles and CSS variables
└── main.tsx
```

## How It Works

State is managed in `App.tsx` using React `useState`. Child components receive data and callbacks via props:

- `TaskForm` calls `onSubmit(title)` when a new task is created
- `TaskList` renders the list and passes actions to each `TaskItem`
- `TaskItem` handles display, completion toggle, inline edit, and delete

Whenever the `tasks` array changes, a `useEffect` hook saves it to `localStorage` under the key `task-manager-tasks`. On app load, tasks are read from storage and validated before being restored.

## Task Model

```ts
interface Task {
  id: string
  title: string
  completed: boolean
}
```

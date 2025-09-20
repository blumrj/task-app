# Task Manager / Kanban Board

## Core Features

- **Add a new task** (title, optional description)
- **Edit task details**
- **Delete a task**
- **Move tasks between columns:** To Do → In Progress → Done
- **Persist data in localStorage** so it survives refresh

## Stretch Features (Advanced)

- Drag-and-drop tasks between columns
- Add tags or priority levels (Low/Medium/High)
- Search or filter tasks
- Due dates & reminders


## Tech Choices

- **React + TypeScript** — for UI + strong typing
- **Redux Toolkit (RTK)** — global state management
- **localStorage** first — later replace with a backend (Express, Nest.js, or Firebase)
- **UI library:** MUI
- **Drag-and-drop:** dnd kit

---

## Project Setup & Logic

### 1. Project Setup
- Create your React + TypeScript app (`npx create-react-app ... --template typescript`).
- Install dependencies:
  - UI: `@mui/material @emotion/react @emotion/styled`
  - State: `@reduxjs/toolkit react-redux`
  - Drag & drop (optional for MVP): `@dnd-kit/core`
- Set up your folder structure as you planned.

### 2. Define Types
- In `types/task.ts`, define your `Task` type/interface (id, title, description, status, etc.).

### 3. State Management
- Set up Redux Toolkit:
  - Create `tasksSlice.ts` for tasks state (array of tasks).
  - Add actions: add, edit, delete, move.
  - Use `localStorage` in slice or via middleware to persist tasks.

### 4. Build UI Components
- **Board**: Renders all columns.
- **Column**: Renders tasks for a specific status.
- **TaskCard**: Displays a single task.
- **TaskForm**: Modal/form for adding/editing tasks.

### 5. Implement Core Features
- Add/Edit/Delete tasks (via form and Redux actions).
- Move tasks between columns (change status).
- Persist tasks to `localStorage` (load on app start, save on change).

### 6. (Optional) Add Stretch Features
- Drag-and-drop (dnd-kit).
- Tags, priorities, search/filter, due dates, etc.

### Overall Logic
1. **App loads:**
	- Load tasks from `localStorage` into Redux state.
2. **User interacts:**
	- Add/edit/delete/move tasks via UI.
	- Dispatch Redux actions to update state.
	- Save updated state to `localStorage`.
3. **UI updates:**
	- Board/columns re-render based on state.

---

**Tip:** Start simple—get the core features working before adding advanced ones.
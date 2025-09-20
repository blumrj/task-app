# 🟦 Kanban Board: Drag-and-Drop Setup Guide

This guide covers the steps to implement drag-and-drop (DND) functionality for moving task cards between columns using `@dnd-kit/core` in your React + TypeScript Kanban project.

---

## 1. Install dnd-kit

```bash
npm install @dnd-kit/core
```

---

## 2. Wrap Your Board in DndContext

- Import and wrap your columns inside `<DndContext>` in `Board.tsx`.
- Pass an `onDragEnd` handler to update your state when a drag ends.

```tsx
import { DndContext, DragEndEvent } from '@dnd-kit/core';

<DndContext onDragEnd={handleDragEnd}>
  {/* Columns go here */}
</DndContext>
```

---

## 3. Make Columns Droppable

- Use `useDroppable` in your `Column.tsx`.
- Each column should have a unique `id` (e.g., its status).

```tsx
import { useDroppable } from '@dnd-kit/core';

const { setNodeRef, isOver } = useDroppable({ id: columnType });

return <div ref={setNodeRef}>{/* Task cards */}</div>;
```

---

## 4. Make Task Cards Draggable

- Use `useDraggable` in your `TaskCard.tsx`.
- Each card should have a unique `id` (e.g., its task id).

```tsx
import { useDraggable } from '@dnd-kit/core';

const { setNodeRef, listeners, attributes, transform, isDragging } = useDraggable({ id: item.id });

return (
  <div ref={setNodeRef} {...listeners} {...attributes} style={{ opacity: isDragging ? 0.5 : 1 }}>
    {/* Card content */}
  </div>
);
```

---

## 5. State Management

- Store your tasks in a state variable in `Board.tsx`.
- Pass only the tasks for each column to the respective `Column`.

```tsx
const [tasks, setTasks] = useState<Task[]>(...);

<Column label="to do" items={items} ... />
```

---

## 6. Drag End Logic

- In `handleDragEnd`, update the dragged task's status to the target column's id.

```tsx
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (active && over && active.id && over.id && active.id !== over.id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === active.id ? { ...task, status: over.id } : task
      )
    );
  }
}
```

---

## 7. Tips & Best Practices

- Ensure all draggable and droppable ids are unique.
- Use TypeScript types for safety and clarity.
- Style dragged items for better UX (e.g., change opacity).
- Test by dragging cards between columns and verifying state updates.

---

## 8. Resources

- [dnd-kit Documentation](https://docs.dndkit.com/)
- [dnd-kit Examples](https://docs.dndkit.com/presets/sortable)

---

**You’re ready to implement drag-and-drop in your Kanban board!**

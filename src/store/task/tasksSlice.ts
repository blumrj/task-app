import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types/task";
import { getFromLocalStorage, setLocalStorage } from "../../utils/storage";

//initial state
const initialState: { tasks: Task[] } = { tasks: getFromLocalStorage("tasks") };

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //reducer to add a task
    addTask: (state, action) => {
      const { payload } = action;

      state.tasks = [...state.tasks, payload];

      setLocalStorage("tasks", state.tasks);
    },
    //reducer to edit a task
    editTask: (state, action) => {
      const { payload } = action;

      //find the index in the array of the updated task
      const index = state.tasks.findIndex((task) => task.id === payload.id);

      //if findIndex() doesn't find anything, it returns -1, so we check if the index exists, and if so, we update the matching task
      if (index !== -1) {
        state.tasks[index] = payload;
      }

      setLocalStorage("tasks", state.tasks);
    },
    //reducer to delete a task
    deleteTask: (state, action) => {
      const { payload } = action;

      //returning all of the tasks except for the one that is supposed to be removed
      state.tasks = state.tasks.filter((task) => task.id !== payload);

      setLocalStorage("tasks", state.tasks);
    },
    //reducer to move a task between columns
    moveTask: (state, action) => {
      //movedItemId -> the id of the task that is being moved
      //movedToId -> the id of the column to which the task has been moved to
      const { movedItemId, movedToId } = action.payload;

      //finding the task that is supposed to be moved and changing the status column to the target column
      state.tasks = state.tasks.map((task: Task) => {
        return task.id === movedItemId ? { ...task, status: movedToId } : task;
      });

      setLocalStorage("tasks", state.tasks);
    },
  },
});

export const { addTask, editTask, deleteTask, moveTask } = tasksSlice.actions;

export default tasksSlice.reducer;

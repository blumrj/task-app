import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isOpen: boolean;
  type: "add-form" | "edit-form" | "delete-form";
  taskId?: string; // store task reference for edit/delete
};

const initialState: initialStateType = {
  isOpen: false,
  type: "add-form",
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      if (action.payload.taskId) {
        state.taskId = action.payload.taskId;
      }
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../store/dialog/dialogSlice";
import type { RootState } from "../store/store";
import TaskForm from "./TaskForm";
import TaskEditForm from "./TaskEditForm";
import { deleteTask } from "../store/task/tasksSlice";

const TaskDialog = () => {
  const isDialogOpen = useSelector(
    (store: RootState) => store.dialogSlice.isOpen
  );
  const dialogType = useSelector((store: RootState) => store.dialogSlice.type);
  const taskId = useSelector((store: RootState) => store.dialogSlice.taskId);
  const dispatch = useDispatch();

  const handleDeleteTask = (id: string) => {
    //dispatch the deleteTask reducer here
    dispatch(deleteTask(id));
    dispatch(closeDialog());
  };

  return (
    <>
      <Dialog open={isDialogOpen} onClose={() => dispatch(closeDialog())}>
        <DialogTitle className="capitalize">
          {dialogType === "add-form" && 'Create Task'}
          {dialogType === "edit-form" && 'Edit Task'}
          {dialogType === "delete-form" && (
            'Delete Task'
          )}
        </DialogTitle>
        <DialogContent>
          {dialogType === "add-form" && <TaskForm />}
          {dialogType === "edit-form" && <TaskEditForm id={taskId!} />}
          {dialogType === "delete-form" && (
            <p className="text-lg">
              Are you sure you want to delete this task?
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(closeDialog())}>Cancel</Button>
          {dialogType === "add-form" && (
            <Button type="submit" form="subscription-form">
              Save
            </Button>
          )}
          {dialogType === "edit-form" && (
            <Button type="submit" form="task-edit-form">
              Update
            </Button>
          )}
          {dialogType === "delete-form" && (
            <Button color="error" onClick={() => handleDeleteTask(taskId!)}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskDialog;

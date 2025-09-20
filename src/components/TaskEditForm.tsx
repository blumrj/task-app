import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  type SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Task } from "../types/task";
import { useState, type FormEvent } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { editTask } from "../store/task/tasksSlice";
import { closeDialog } from "../store/dialog/dialogSlice";

const TaskEditForm = ({ id }: { id: string }) => {
  //finding the task that is supposed to be edited
  const task: Task = useSelector(
    (store: RootState) =>
      store.tasksSlice.tasks.filter((task) => task.id === id)[0]
  );

  const [errorField, setErrorField] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  //adding local state to make the input fields controlled
  const [fields, setFields] = useState<Task>({
    id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    dueDate: task.dueDate,
    priority: task.priority,
  });

  const dispatch = useDispatch();

  const handleFieldChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name!]: value,
    }));
    setErrorField(name!);
    handleErrorMessage(name!, value as string);
  };

  const handleErrorMessage = (fieldName: string, fieldValue: string) => {
    if (!fieldValue.trim()) {
      setErrorMessage(`${fieldName} can't be empty.`);
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fields.title.trim()) {
      setErrorField("title");
      setErrorMessage("Title can't be empty.");
      return;
    }
    if (!fields.priority.trim()) {
      setErrorField("priority");
      setErrorMessage("Priority can't be empty.");
      return;
    }

    setFields((prev) => ({ ...prev, updatedAt: new Date() }));

    dispatch(editTask(fields));
    dispatch(closeDialog());
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="task-edit-form">
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={fields.title}
          onChange={handleFieldChange}
          helperText={errorField === "title" && errorMessage}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={fields.description}
          onChange={handleFieldChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            name="priority"
            value={fields.priority}
            label="Priority"
            onChange={handleFieldChange}
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>
          {errorField === "priority" && (
            <FormHelperText>{errorMessage}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={fields.status}
            label="Status"
            onChange={handleFieldChange}
          >
            <MenuItem value={"to do"}>To Do</MenuItem>
            <MenuItem value={"in progress"}>In Progress</MenuItem>
            <MenuItem value={"done"}>Done</MenuItem>
          </Select>
          {errorField === "priority" && (
            <FormHelperText>{errorMessage}</FormHelperText>
          )}
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            name="date"
            value={fields.dueDate && new Date(fields.dueDate)}
            onChange={(date) =>
              setFields((prev) => ({ ...prev, dueDate: date }))
            }
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />
        </LocalizationProvider>
      </form>
      <div>
        <p>Date Created: {new Date(fields.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(fields.updatedAt).toLocaleString()}</p>
      </div>
    </>
  );
};

export default TaskEditForm;

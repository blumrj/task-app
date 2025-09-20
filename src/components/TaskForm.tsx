import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { Task } from "../types/task";
import { nanoid } from 'nanoid'
import { useDispatch } from "react-redux";
import { addTask } from "../store/task/tasksSlice";
import { closeDialog } from "../store/dialog/dialogSlice";

const TaskForm = () => {
  // Single error state: which field and what message
  const [errorField, setErrorField] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fields, setFields] = useState<{
    title: string;
    description: string | null;
    priority: "low" | "medium" | "high";
    dueDate: Date | null;
  }>({
    title: "",
    description: null,
    priority: "low",
    dueDate: null,
  });
  const dispatch = useDispatch()

  const handleErrorMessage = (fieldName: string, fieldValue: string) => {
    if (!fieldValue.trim()) {
      setErrorMessage(`${fieldName} can't be empty.`);
    } else {
      setErrorMessage("");
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name!]: value,
    }));
    setErrorField(name!);
    handleErrorMessage(name!, value as string);
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

    const newTask: Task = {
        id: nanoid(),
        title: fields.title,
        description: fields.description,
        status: 'to do',
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: fields.dueDate,
        priority: fields.priority
    }

    dispatch(addTask(newTask))
    dispatch(closeDialog())

  };

  return (
    <>
      <form onSubmit={handleSubmit} id="subscription-form">
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            name="date"
            value={fields.dueDate}
            onChange={(date) =>
              setFields((prev) => ({ ...prev, dueDate: date }))
            }
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />
        </LocalizationProvider>
      </form>
    </>
  );
};

export default TaskForm;
